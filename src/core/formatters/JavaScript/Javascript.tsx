import React from "react";
import {FormatRequest, FormatterConfigComponentInterface} from "@/types/formatter";
import {FormattedMessage, useIntl} from "@/locale";
import {OptionsInput, OptionsSelect, SelectOption} from "@/components/Utils";
import {isNullOrWhiteSpace} from "@/utils/stringUtils";

// -------------------------------------------------------------------------------------------------------------
// types

export enum JavascriptFormatterFormat { VARIABLE = "VARIABLE", EXPORT = "EXPORT"}

export enum JavascriptDeclarationKeyword { VAR = "var", CONST = "const", LET = "let" }

export enum JavascriptModuleType { ES6 = "ES6", CommonJS = "CommonJS"}

export type JavascriptFormatterConfig = {
    format: JavascriptFormatterFormat,
    variableName?: string,
    declarationKeyword: JavascriptDeclarationKeyword,
    module: JavascriptModuleType
}

export const defaultJavascriptFormatterConfig: JavascriptFormatterConfig = {
    format: JavascriptFormatterFormat.VARIABLE,
    variableName: "data",
    declarationKeyword: JavascriptDeclarationKeyword.VAR,
    module: JavascriptModuleType.ES6
}

// -------------------------------------------------------------------------------------------------------------
// format method

export const format = (request: FormatRequest): string => {
    const {fields, values, config, sortedFieldIds} = request;
    const {format: formatType, variableName, declarationKeyword, module} = config;

    if (values.length === 0) {
        return '';
    }

    const jsonData = values.map(item => {
        const row: Record<string, string | null> = {};
        for (const column of sortedFieldIds) {
            const field = fields[column];
            const {isDraft, fieldName} = field;
            const itemValue = item[column];
            let {value} = itemValue;

            if (!isDraft && value !== null) {
                if (typeof value === 'bigint') {
                    value = value.toString();
                }
                row[fieldName] = value;
            }
        }
        return row;
    });

    let output = JSON.stringify(jsonData, null, 3);

    return formatOutput(formatType, module, declarationKeyword, variableName, output);
};

function formatOutput(formatType, module, declarationKeyword, variableName, output) {
    switch (formatType) {
        case JavascriptFormatterFormat.VARIABLE:
            return formatVariableOutput(declarationKeyword, variableName, output);
        case JavascriptFormatterFormat.EXPORT:
            return formatExportOutput(module, output);
        default:
            return output;
    }
}

function formatVariableOutput(declarationKeyword, variableName, output) {
    if (isNullOrWhiteSpace(variableName)) {
        return '';
    }
    return `${declarationKeyword} ${variableName} = ${output};`;
}

function formatExportOutput(module, output) {
    switch (module) {
        case JavascriptModuleType.ES6:
            return `export default ${output};`;
        case JavascriptModuleType.CommonJS:
            return `module.exports = ${output};`;
        default:
            return output;
    }
}

// -------------------------------------------------------------------------------------------------------------
// config component

export const JavascriptConfigComponent: React.FC<FormatterConfigComponentInterface> = ({...props}) => {
    const {onConfigChange, config} = props;
    const jsConfig: JavascriptFormatterConfig = config;
    const intl = useIntl();

    // action
    const handleValueChange = (field: string, value: any) => {
        onConfigChange({...jsConfig, [field]: value})
    }

    // error validation
    const [errorMessages, setErrorMessages] = React.useState({varName: ''});
    React.useEffect(() => {
        const newErrorMessages = {...errorMessages};
        if (isNullOrWhiteSpace(jsConfig.variableName) && jsConfig.format === JavascriptFormatterFormat.VARIABLE) {
            newErrorMessages.varName = intl.formatMessage({id: 'export.configurator.javascript.varName.required'});
        } else {
            newErrorMessages.varName = '';
        }
        setErrorMessages(newErrorMessages);
    }, [jsConfig.format, jsConfig.variableName]);

    return (
        <div>
            <OptionsSelect
                label={<FormattedMessage id="export.configurator.javascript.format"/>}
                selectOptions={formatOptions}
                value={jsConfig.format}
                onChange={(value) => {
                    handleValueChange('format', value)
                }}
                style={{width: '120px'}}
            />

            {
                jsConfig.format === JavascriptFormatterFormat.VARIABLE &&
                <>
                    <OptionsInput
                        label={<FormattedMessage id="export.configurator.javascript.varName"/>}
                        value={jsConfig.variableName}
                        onChange={(value) => {
                            handleValueChange('variableName', value)
                        }}
                        style={{width: '150px'}}
                        errorMessage={errorMessages.varName}
                    />
                    <OptionsSelect
                        label={<FormattedMessage id="export.configurator.javascript.declarationKeyword"/>}
                        selectOptions={keywordsOptions}
                        value={jsConfig.declarationKeyword}
                        onChange={(value) => {
                            handleValueChange('declarationKeyword', value)
                        }}
                        style={{width: '120px'}}
                    />
                </>
            }

            {
                jsConfig.format === JavascriptFormatterFormat.EXPORT &&
                <OptionsSelect
                    label={<FormattedMessage id="export.configurator.javascript.module"/>}
                    selectOptions={moduleOptions}
                    value={jsConfig.module}
                    onChange={(value) => {
                        handleValueChange('module', value)
                    }}
                    style={{width: '150px'}}
                />
            }

        </div>
    )
}

const formatOptions: SelectOption[] = [
    {
        label: <FormattedMessage id={"export.configurator.javascript.format.variable"}/>,
        value: JavascriptFormatterFormat.VARIABLE
    },
    {
        label: <FormattedMessage id={"export.configurator.javascript.format.export"}/>,
        value: JavascriptFormatterFormat.EXPORT
    }
]

const keywordsOptions: SelectOption[] = [
    {label: "var", value: JavascriptDeclarationKeyword.VAR},
    {label: "const", value: JavascriptDeclarationKeyword.CONST},
    {label: "let", value: JavascriptDeclarationKeyword.LET}
]

const moduleOptions: SelectOption[] = [
    {label: "ES6", value: JavascriptModuleType.ES6},
    {label: "CommonJS", value: JavascriptModuleType.CommonJS},
]

