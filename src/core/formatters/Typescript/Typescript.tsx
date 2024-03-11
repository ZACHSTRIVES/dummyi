import React from "react";
import {FormatRequest, FormatterConfigComponentInterface} from "@/types/formatter";
import {OptionsInput} from "@/components/Utils";
import {OptionsRadio, RadioOption} from "@/components/Utils/src/OptionsRadio";
import {FormattedMessage} from "@/locale";
import {toJsonListStringWithoutQuotes} from "@/utils/formatterUtils";
import {ValueType} from "@/constants/enums";

// -------------------------------------------------------------------------------------------------------------
// types

export enum TypescriptDeclaration {
    INTERFACE = "interface",
    TYPE = "type"
}

export type TypescriptFormatterConfig = {
    declaration: TypescriptDeclaration,
    declarationName: string,
    variableName: string
}

// -------------------------------------------------------------------------------------------------------------
// default options

export const defaultTypescriptFormatterConfig: TypescriptFormatterConfig = {
    declaration: TypescriptDeclaration.TYPE,
    declarationName: "MyRecord",
    variableName: "myData"
}

// -------------------------------------------------------------------------------------------------------------
// format method

export const format = (request: FormatRequest): string => {
    const {fields, values, sortedFieldIds, config} = request;
    const {declaration, declarationName, variableName} = config as TypescriptFormatterConfig;

    if (sortedFieldIds.length === 0 || values.length === 0) {
        return '';
    }

    let output = '';

    // type & interface
    output += `export ${declaration} ${declarationName}${declaration === TypescriptDeclaration.TYPE ? " = " : ""} {\n`;
    sortedFieldIds.forEach(id => {
        const field = fields[id];
        let fieldType = 'string'; // Default field type
        switch (field.valueType) {
            case ValueType.BIGINT:
            case ValueType.DOUBLE:
            case ValueType.ONE_BIT:
            case ValueType.INT:
                fieldType = `number`;
                break;
            case ValueType.BOOLEAN:
                fieldType = 'boolean';
                break;
            case ValueType.INT_LIST:
                fieldType = 'number[]'
                break;
            case ValueType.STRING_LIST:
                fieldType = 'string[]'
                break;
        }
        output+= `  ${field.fieldName}${field.emptyRate !== 0 ? "?" : ""}: ${fieldType};\n`;
    });
    output+="}; \n\n"

    // values
    output += `export const ${variableName}: ${declarationName}[] = ${toJsonListStringWithoutQuotes(fields, sortedFieldIds, values)};`;

    return output;
}

// -------------------------------------------------------------------------------------------------------------
// config component

export const TypescriptConfigComponent: React.FC<FormatterConfigComponentInterface> = ({...props}) => {
    const {config, onConfigChange} = props as {
        config: TypescriptFormatterConfig
        onConfigChange: typeof props.onConfigChange
    }

    // action
    const handleValueChange = (field: string, value: any) => {
        onConfigChange({...config, [field]: value})
    }

    // TODO: implement your own configs component here
    return (
        <div>
            <OptionsRadio
                label={<FormattedMessage id={"export.configurator.typescript.declarationType"}/>}
                radioOptions={typescriptDeclarationTypeRadioOptions}
                type={"button"}
                value={config.declaration}
                onChange={(v) => handleValueChange("declaration", v)}
                style={{"width": "160px"}}
            />

            <OptionsInput
                label={<FormattedMessage
                    id={`export.configurator.typescript.declarationType.${config.declaration}.name`}/>}
                value={config.declarationName}
                onChange={(v) => handleValueChange("declarationName", v)}
                style={{"width": "155px"}}
            />

            <OptionsInput
                label={<FormattedMessage id={"export.configurator.typescript.variableName"}/>}
                value={config.variableName}
                onChange={(v) => handleValueChange("variableName", v)}
                style={{"width": "160px"}}
            />

        </div>
    );
}

const typescriptDeclarationTypeRadioOptions: RadioOption[] = [
    {
        label: "type",
        value: TypescriptDeclaration.TYPE
    },
    {
        label: "interface",
        value: TypescriptDeclaration.INTERFACE
    }
]