import React from "react";
import {FormatRequest, FormatterConfigComponentInterface} from "@/types/formatter";
import {CsvConfigComponent} from "@/core/formatters/Csv/Csv";
import {OptionsSwitch} from "@/components/Utils/src/OptionsSwitch";
import {FormattedMessage} from "@/locale";
import {ExportValueType} from "@/constants/enums";
import {OptionsSelect, SelectOption} from "@/components/Utils";

// -------------------------------------------------------------------------------------------------------------
// types

export type JsonFormatterConfig = {
    insideArray: boolean;
    includeNullValues: boolean;
    indentSize: number;
}

export const defaultJsonFormatterConfig: JsonFormatterConfig = {
    insideArray: true,
    includeNullValues: false,
    indentSize: 2,
}

// -------------------------------------------------------------------------------------------------------------
// format method

export const format = (request: FormatRequest): string => {
    const { fields, values, sortedFieldIds, config } = request;
    const { insideArray, includeNullValues, indentSize } = config;

    if (values.length === 0) {
        return '';
    }

    const jsonData = values.map(item => {
        const row: Record<string, string | null> = {};

        sortedFieldIds.forEach(column => {
            if (!fields[column].isDraft) {
                const value = item[column].value;

                if (includeNullValues || (item[column].type !== ExportValueType.NULL && value !== null)) {
                    row[fields[column].fieldName] = value;
                }
            }
        });

        return row;
    });

    if (insideArray) {
        return JSON.stringify(jsonData, null, indentSize);
    } else {
        return jsonData.map(row => JSON.stringify(row)).join(',\n');
    }
}

// -------------------------------------------------------------------------------------------------------------
// config component

export const JsonConfigComponent: React.FC<FormatterConfigComponentInterface> = ({...props}) => {
    const {config, onConfigChange} = props;
    const jsonConfig: JsonFormatterConfig = config;

    // action
    const handleValueChange = (field: string, value: any) => {
        onConfigChange({...jsonConfig, [field]: value})
    }

    return (
        <div>
            <OptionsSwitch
                label={<FormattedMessage id={'export.configurator.json.insideArray'}/>}
                value={jsonConfig.insideArray}
                onChange={(v) => handleValueChange('insideArray', v)}
            />

            {jsonConfig.insideArray && (
                <OptionsSelect
                    label={<FormattedMessage id="export.configurator.xml.indentSize"/>}
                    selectOptions={jsonIndentSizeOptions}
                    value={jsonConfig.indentSize}
                    onChange={(value) => {
                        handleValueChange('indentSize', value)
                    }}
                    style={{width: '80px'}}
                />)
            }

            <OptionsSwitch
                label={<FormattedMessage id={'export.configurator.json.includeNullValues'}/>}
                value={jsonConfig.includeNullValues}
                onChange={(v) => handleValueChange('includeNullValues', v)}
            />

        </div>
    )
}

const jsonIndentSizeOptions: SelectOption[] = [
    {value: 0, label: '0'},
    {value: 2, label: '2'},
    {value: 4, label: '4'}];
