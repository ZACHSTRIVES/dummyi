import React from "react";
import {FormatRequest, FormatterConfigComponentInterface} from "@/types/formatter";
import {OptionsInput, OptionsNumberInput, OptionsSelect, SelectOption} from "@/components/Utils";
import {FormattedMessage, useIntl} from "@/locale";
import {isNullOrWhiteSpace} from "@/utils/stringUtils";
import {OptionsSwitch} from "@/components/Utils/src/OptionsSwitch";
import {Divider} from "@douyinfe/semi-ui";
import {DataField} from "@/types/generator";
import {ValueType} from "@/constants/enums";


// -------------------------------------------------------------------------------------------------------------
// types

export enum SqlType {
    MYSQL = "MYSQL",
    POSTGRES = "POSTGRES",
    ORACLE = "ORACLE",
    MICROSOFT = "MICROSOFT",
    SQLITE = "SQLITE",
    IBMDB2 = "IBMDB2",
    SAPHANA = "SAPHANA"
}

export type SqlFormatterConfig = {
    type: SqlType,
    tableName: string,
    batchSize: number,
    dropTable: boolean,
    createTable: boolean,
    primaryKey: boolean,
    primaryKeyColumnName: string,
}

// -------------------------------------------------------------------------------------------------------------
// default options

export const defaultSqlFormatterConfig: SqlFormatterConfig = {
    type: SqlType.MYSQL,
    tableName: "DataTable",
    batchSize: 20,
    dropTable: false,
    createTable: false,
    primaryKey: true,
    primaryKeyColumnName: "id"
}

// -------------------------------------------------------------------------------------------------------------
// format method

export const format = (request: FormatRequest): string => {
    const {fields, values, config, sortedFieldIds} = request;
    const {type, tableName, batchSize, dropTable, createTable, primaryKey, primaryKeyColumnName} = config;
    console.log(values)

    let sql = '';

    if (values.length === 0) {
        return sql;
    }

    // Drop table if required
    if (dropTable) {
        sql += `DROP TABLE IF EXISTS ${tableName};\n\n`;
    }

    // Create table if required
    if (createTable) {
        sql += `CREATE TABLE ${tableName} (\n`;
        if (primaryKey) {
            sql += `  ${primaryKeyColumnName} INT AUTO_INCREMENT PRIMARY KEY,\n`;
        }
        sortedFieldIds.forEach((id, index) => {
            sql += addCreateTableColumn(fields[id])
            sql += index < sortedFieldIds.length - 1 ? ',\n' : '\n';
        });
        sql += `);\n\n`;
    }

    // Insert data
    if (values.length > 0) {
        for (let i = 0; i < values.length; i += batchSize) {
            const batchValues = values.slice(i, i + batchSize);
            sql += `INSERT INTO ${tableName} (`;
            sql += sortedFieldIds.map(id => fields[id].fieldName).join(', ');
            sql += `) VALUES \n`;

            batchValues.forEach((item, index) => {
                const valueString = sortedFieldIds.map(id => {
                    const value = item[id].stringValue; // Assuming stringValue is the appropriate property for SQL value
                    return typeof value === 'string' ? `'${value.replace(/'/g, "''")}'` : value; // Handle string values and escape single quotes
                }).join(', ');
                sql += `  (${valueString})`;
                sql += index < batchValues.length - 1 ? ',\n' : ';\n\n'; // End the line with a comma or a semicolon depending on the batch
            });
        }
    }

    return sql;
}

const addCreateTableColumn = (field: DataField) => {
    let sql = `  ${field.fieldName} `;
    switch (field.valueType) {
        case ValueType.STRING:
            sql += "VARCHAR(255) DEFAULT NULL"
            return sql;
        case ValueType.INT:
            sql += "INT DEFAULT NULL"
            return sql;
        case ValueType.DOUBLE:
            sql += "DOUBLE DEFAULT NULL"
            return sql;
        case ValueType.STRING_LIST:
            sql += "VARCHAR(255) DEFAULT NULL"
        default:
            return sql;
    }
}

// -------------------------------------------------------------------------------------------------------------
// config component

export const SqlConfigComponent: React.FC<FormatterConfigComponentInterface> = ({...props}) => {
    const {config, onConfigChange} = props;
    const intl = useIntl();

    // action
    const handleValueChange = (field: string, value: any) => {
        onConfigChange({...config, [field]: value})
    }

    const [errorMessages, setErrorMessages] = React.useState({tableName: ''});
    React.useEffect(() => {
        const newErrorMessages = {...errorMessages};
        if (isNullOrWhiteSpace(config.tableName)) {
            newErrorMessages.tableName = intl.formatMessage({id: 'export.configurator.sql.tableName.required'});
        } else {
            newErrorMessages.tableName = '';
        }
        setErrorMessages(newErrorMessages);
    }, [config.tableName]);

    return (
        <div>
            <OptionsSelect
                label={<FormattedMessage id="export.configurator.sql.type"/>}
                selectOptions={typeOptions}
                value={config.type}
                onChange={(value) => {
                    handleValueChange('type', value)
                }}
                style={{width: '200px'}}
            />

            <div className='flex'>
                <OptionsInput
                    label={<FormattedMessage id="export.configurator.sql.tableName"/>}
                    value={config.tableName}
                    onChange={(value) => {
                        handleValueChange('tableName', value)
                    }}
                    style={{width: '150px'}}
                    errorMessage={errorMessages.tableName}
                />

                <OptionsNumberInput
                    label={<FormattedMessage id="export.configurator.sql.batchSize"/>}
                    value={config.batchSize}
                    onChange={(value) => {
                        handleValueChange('batchSize', value)
                    }}
                    style={{width: '100px'}}
                    min={1}
                />

            </div>

            <Divider margin={10}/>
            <div className="flex">
                <OptionsSwitch
                    label={<FormattedMessage id="export.configurator.sql.includeDropTable"/>}
                    value={config.dropTable}
                    onChange={(value) => {
                        handleValueChange('dropTable', value)
                    }}/>

                <OptionsSwitch
                    label={<FormattedMessage id="export.configurator.sql.includeCreateTable"/>}
                    value={config.createTable}
                    onChange={(value) => {
                        handleValueChange('createTable', value)
                    }}/>
            </div>

            {
                config.createTable && <div className="flex">
                    <OptionsSwitch
                        label={<FormattedMessage id="export.configurator.sql.includePrimaryKey"/>}
                        value={config.primaryKey}
                        onChange={(value) => {
                            handleValueChange('primaryKey', value)
                        }}/>

                    {config.primaryKey && <OptionsInput
                        label={<FormattedMessage id="export.configurator.sql.primaryKeyColumnName"/>}
                        value={config.primaryKeyColumnName}
                        onChange={(value) => {
                            handleValueChange('primaryKeyColumnName', value)
                        }}
                        style={{width: '80px'}}
                        errorMessage={errorMessages.tableName}
                    />}
                </div>
            }

        </div>
    );
}


const typeOptions: SelectOption[] = [
    {label: "MySQL", value: SqlType.MYSQL},
    {label: "PostgresSQL", value: SqlType.POSTGRES},
    {label: "Oracle Database", value: SqlType.ORACLE},
    {label: "Microsoft SQL Server", value: SqlType.MICROSOFT},
    {label: "SQLite", value: SqlType.SQLITE},
    {label: "IBM DB2", value: SqlType.IBMDB2},
    {label: "SAP HANA", value: SqlType.SAPHANA}
]
