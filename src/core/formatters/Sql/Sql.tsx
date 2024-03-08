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

// Extend the addCreateTableColumn function to support different SQL dialects
const addCreateTableColumn = (field: DataField, sqlType: SqlType) => {
    let fieldType = "VARCHAR(255)"; // Default data type
    switch (field.valueType) {
        case ValueType.INT:
            fieldType = "INT";
            break;
        case ValueType.DOUBLE:
            fieldType = "DOUBLE(18,4)";
            break;
        case ValueType.TEXT:
            fieldType = (sqlType === SqlType.ORACLE || sqlType === SqlType.IBMDB2) ? "CLOB" : "TEXT";
            break;
        case ValueType.ONE_BIT:
            fieldType = "TINYINT(1)";
            break;
        case ValueType.BOOLEAN:
            fieldType = "TINYINT(1)";
            break;
        case ValueType.BIGINT:
            fieldType = "BIGINT";
            break;
        default:
            fieldType = "VARCHAR(255)";
            break;
    }

    // Apply SQL type-specific modifications
    switch (sqlType) {
        case SqlType.ORACLE:
            // Oracle-specific adaptations, e.g., use NUMBER instead of INT
            if (fieldType === "INT") {
                fieldType = "NUMBER";
            } else if (fieldType === "TINYINT(1)") {
                fieldType = "NUMBER(1)";
            }
            break;
        case SqlType.POSTGRES:
            // Postgres-specific adaptations, e.g., use BOOLEAN instead of TINYINT(1)
            if (fieldType === "TINYINT(1)") {
                fieldType = "BOOLEAN";
            }
            break;
        case SqlType.SQLITE:
            // SQLite uses a more dynamic type system
            if (fieldType === "TINYINT(1)") {
                fieldType = "INTEGER";
            }
            break;
        // Add cases for other SQL types as necessary
    }

    return `  ${field.fieldName} ${fieldType} DEFAULT NULL`;
};

const formatValueForSQL = (value: any, sqlType: SqlType, valueType: ValueType): string => {
    if (value === null) {
        // Handle null values
        return 'NULL';
    }

    switch (valueType) {
        case ValueType.STRING:
            return `'${value.replace(/'/g, "''")}'`;
        case ValueType.BOOLEAN:
            return (value ? "1" : "0");
        case ValueType.INT_LIST:
            return `'${value.join(", ")}'`
        case ValueType.STRING_LIST:
            return `'${value.map(item => `"${item}"`).join(', ')}'`
        default:
            return value;
    }
};

const generateInsertStatements = (sqlType: SqlType, tableName: string, sortedFieldIds: string[], values: any[], fields: {
    [key: string]: any
}, batchSize: number): string => {
    let inserts = '';
    for (let i = 0; i < values.length; i += batchSize) {
        const batchValues = values.slice(i, i + batchSize);
        inserts += `INSERT INTO ${tableName} (${sortedFieldIds.map(id => fields[id].fieldName).join(', ')}) VALUES\n`;

        batchValues.forEach((item, index) => {
            const valueString = sortedFieldIds.map(id => {
                const field = fields[id];
                if (field.isDraft) {
                    return ""
                }
                let result = item[id]; // Assuming direct use of value; adapt as necessary
                return formatValueForSQL(result.value, sqlType, field.valueType); // Apply formatting function
            }).join(', ');

            inserts += `  (${valueString})${index < batchValues.length - 1 ? ',' : ';\n'}\n`;
        });
    }
    return inserts;
};

// Modify the format function to adapt to different SQL dialects
export const format = (request: FormatRequest): string => {
    console.log(request)

    const {fields, values, config, sortedFieldIds} = request;
    const {type, tableName, batchSize, dropTable, createTable, primaryKey, primaryKeyColumnName} = config;

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
            if (type === SqlType.ORACLE) {
                sql += `  ${primaryKeyColumnName} NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n`;
            } else if (type === SqlType.POSTGRES) {
                sql += `  ${primaryKeyColumnName} SERIAL PRIMARY KEY,\n`;
            } else if (type === SqlType.SQLITE) {
                sql += `  ${primaryKeyColumnName} INTEGER PRIMARY KEY AUTOINCREMENT,\n`;
            } else { // Default, also covers MYSQL and others
                sql += `  ${primaryKeyColumnName} INT AUTO_INCREMENT PRIMARY KEY,\n`;
            }
        }
        sortedFieldIds.forEach((id, index) => {
            sql += addCreateTableColumn(fields[id], type) // Pass SQL type to function
            sql += index < sortedFieldIds.length - 1 ? ',\n' : '\n';
        });
        sql += `);\n\n`;
    }

    // Insert data
    if (values.length > 0) {
        sql += generateInsertStatements(type, tableName, sortedFieldIds, values, fields, batchSize);
    }

    return sql;
};


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
