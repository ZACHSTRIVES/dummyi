import React from "react";
import {FormatRequest, FormatterConfigComponentInterface} from "@/types/formatter";
import {OptionsInput, OptionsSelect, SelectOption} from "@/components/Utils";
import {FormattedMessage} from "@/locale";
import {ExportValueType} from "@/constants/enums";


// -------------------------------------------------------------------------------------------------------------
// types
export type XmlFormatterConfig = {
    rootNodeName: string;
    childNodeName: string;
    encoding: string;
    indentSize: number;
}

export const defaultXmlFormatterConfig: XmlFormatterConfig = {
    rootNodeName: 'root',
    childNodeName: 'record',
    encoding: 'UTF-8',
    indentSize: 2
}

// -------------------------------------------------------------------------------------------------------------
// format method
export const format = (request: FormatRequest): string => {
    const {fields, values, config, sortedFieldIds} = request
    const {rootNodeName, childNodeName, encoding, indentSize} = config;

    if (values.length === 0) {
        return '';
    }

    const indent = ' '.repeat(indentSize);

    let xml = '';
    xml += `<?xml version="1.0" encoding="${encoding}"?>\n`;
    xml += `<${rootNodeName}>\n`;

    values.forEach((item, index) => {
        xml += indent + `<${childNodeName}>\n`;

        sortedFieldIds.forEach(column => {
            if (!fields[column].isDraft) {
                if(item[column].type !== ExportValueType.NULL) {
                    let value = item[column].stringValue;
                    if (value.includes('\n')) {
                        value = `"${value}"`;
                    }
                    const fieldName = fields[column].fieldName ? fields[column].fieldName : "";
                    xml += indent.repeat(2) + `<${fieldName}>${value}</${fieldName}>\n`;
                }

            }
        });

        xml += indent + `</${childNodeName}>\n`;

        if (index !== values.length - 1) {
            xml += '\n';
        }
    });

    xml += `</${rootNodeName}>\n`;

    return xml;
}

// -------------------------------------------------------------------------------------------------------------
// config component
export const XmlConfigComponent: React.FunctionComponent<FormatterConfigComponentInterface> = ({...props}) => {
    const {onConfigChange, config} = props;
    const xmlConfig: XmlFormatterConfig = config;

    // action
    const handleValueChange = (field: string, value: any) => {
        onConfigChange({...xmlConfig, [field]: value})
    }

    return (
        <div>
            <OptionsInput
                label={<FormattedMessage id="export.configurator.xml.rootNodeName"/>}
                value={xmlConfig.rootNodeName}
                onChange={(value) => {
                    handleValueChange('rootNodeName', value)
                }}
                style={{width: '100px'}}
                // errorMessage={errorMessages.delimiter}
            />

            <OptionsInput
                label={<FormattedMessage id="export.configurator.xml.childNodeName"/>}
                value={xmlConfig.childNodeName}
                onChange={(value) => {
                    handleValueChange('childNodeName', value)
                }}
                style={{width: '100px'}}
                // errorMessage={errorMessages.delimiter}
            />

            <OptionsSelect
                label={<FormattedMessage id="export.configurator.xml.encoding"/>}
                selectOptions={xmlEncodingOptions}
                value={xmlConfig.encoding}
                onChange={(value) => {
                    handleValueChange('encoding', value)
                }}
                style={{width: '150px'}}
            />

            <OptionsSelect
                label={<FormattedMessage id="export.configurator.xml.indentSize"/>}
                selectOptions={xmlIndentSizeOptions}
                value={xmlConfig.indentSize}
                onChange={(value) => {
                    handleValueChange('indentSize', value)
                }}
                style={{width: '80px'}}
            />

        </div>
    )
}

const xmlEncodingOptions: SelectOption[] = [
    {value: 'UTF-8', label: 'UTF-8'},
    {value: 'UTF-16', label: 'UTF-16'},
    {value: 'ISO-8859-1', label: 'ISO-8859-1'},
];

const xmlIndentSizeOptions: SelectOption[] = [
    {value: 0, label: '0'},
    {value: 2, label: '2'},
    {value: 4, label: '4'}];


