import React from "react";
import {EndOfLineChars} from "@/constants/enums";
import {FormatRequest, FormatterConfigComponentInterface} from "@/types/formatter";
import {FormattedMessage, useIntl} from "@/locale";
import {OptionsInput, OptionsSelect, SelectOption} from "@/components/Utils";
import {OptionsSwitch} from "@/components/Utils/src/OptionsSwitch";
import {isNullOrWhiteSpace} from "@/utils/stringUtils";

// -------------------------------------------------------------------------------------------------------------
// types

export type CsvFormatterConfig = {
    delimiter: string;
    includeHeader: boolean;
    endOfLineChar: EndOfLineChars;
}

export const defaultCsvFormatterConfig: CsvFormatterConfig = {
    delimiter: ',',
    includeHeader: false,
    endOfLineChar: EndOfLineChars.CRLF
}

// -------------------------------------------------------------------------------------------------------------
// format method

export const format = (request: FormatRequest): string => {
    const {fields, values, config, sortedFieldIds} = request;
    const {delimiter, includeHeader, endOfLineChar} = config;

    if (values.length === 0) {
        return '';
    }

    const header = sortedFieldIds
        .filter(fieldId => !fields[fieldId].isDraft)
        .map(fieldId => fields[fieldId].fieldName);

    let output = '';
    if (includeHeader) {
        output += header.join(delimiter) + endOfLineChar;
    }

    const rows = values.map(item =>
        sortedFieldIds
            .filter(column => !fields[column].isDraft)
            .map(column => {
                let value = item[column].stringValue;
                value = value.replace(/"/g, '""'); // Escape double quotes
                if (value.includes(delimiter) || value.includes(endOfLineChar)) {
                    value = `"${value}"`; // Enclose in double quotes if necessary
                }

                return value;
            }));

    output += rows.map(row => row.join(delimiter) + endOfLineChar).join('');

    return output;
};

// -------------------------------------------------------------------------------------------------------------
// config component

export const CsvConfigComponent: React.FC<FormatterConfigComponentInterface> = ({...props}) => {
    const {onConfigChange, config} = props;
    const csvConfig: CsvFormatterConfig = config;
    const intl = useIntl();

    // action
    const handleValueChange = (field: string, value: any) => {
        onConfigChange({...csvConfig, [field]: value})
    }

    // error validation
    const [errorMessages, setErrorMessages] = React.useState({delimiter: ''});
    React.useEffect(() => {
        const newErrorMessages = {...errorMessages};
        if (isNullOrWhiteSpace(csvConfig.delimiter)) {
            newErrorMessages.delimiter = intl.formatMessage({id: 'export.configurator.csv.delimiter.required'});
        } else {
            newErrorMessages.delimiter = '';
        }
        setErrorMessages(newErrorMessages);
    }, [csvConfig.delimiter]);

    return (
        <div>
            <OptionsInput
                label={<FormattedMessage id="export.configurator.csv.delimiter"/>}
                value={csvConfig.delimiter}
                onChange={(value) => {
                    handleValueChange('delimiter', value)
                }}
                style={{width: '60px'}}
                errorMessage={errorMessages.delimiter}
            />

            <OptionsSwitch
                label={<FormattedMessage id="export.configurator.csv.includeHeader"/>}
                value={csvConfig.includeHeader}
                onChange={(value) => {
                    handleValueChange('includeHeader', value)
                }}
                size={'large'}
            />

            <OptionsSelect
                label={<FormattedMessage id="export.configurator.csv.endLineChar"/>}
                selectOptions={endOfLineCharOptions}
                value={csvConfig.endOfLineChar}
                onChange={(value) => {
                    handleValueChange('endOfLineChar', value)
                }}
                style={{width: '200px'}}
            />
        </div>
    )
}

const endOfLineCharOptions: SelectOption[] = [
    {label: 'CRLF（Windows)', value: EndOfLineChars.CRLF},
    {label: 'LF (Unix)', value: EndOfLineChars.LF}
]

