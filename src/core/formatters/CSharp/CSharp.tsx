import React from "react";
import {FormatRequest, FormatterConfigComponentInterface} from "@/types/formatter";
import {OptionsInput, OptionsSelect, SelectOption} from "@/components/Utils";
import {FormattedMessage} from "@/locale";
import {OptionsSwitch} from "@/components/Utils/src/OptionsSwitch";
import {ValueType} from "@/constants/enums";
import {formatValueForCSharp} from "@/core/formatters/CSharp/CSharpFormatterUtils";

// -------------------------------------------------------------------------------------------------------------
// types

export enum CSharpCollectionType {
    GENERIC_LIST = "GENERIC_LIST",
    ARRAY = "ARRAY",
    ARRAY_LIST = "ARRAY_LIST",
    HASHSET = "HASHSET"
}

export type CSharpFormatterConfig = {
    dtoClass: boolean,
    dtoClassName: string,
    collectionName: string,
    collectionType: CSharpCollectionType
}

// -------------------------------------------------------------------------------------------------------------
// default options

export const defaultCSharpFormatterConfig: CSharpFormatterConfig = {
    dtoClass: false,
    dtoClassName: "MyData",
    collectionName: "myList",
    collectionType: CSharpCollectionType.GENERIC_LIST
}

// -------------------------------------------------------------------------------------------------------------
// format method

export const format = (request: FormatRequest): string => {
    const {fields, values, sortedFieldIds, config} = request;

    let csharpCode = '';

    // Create DTO class if required
    if (config.dtoClass) {
        csharpCode += `public class ${config.dtoClassName}\n{\n`;
        sortedFieldIds.forEach(id => {
            const field = fields[id];
            let fieldType = 'string'; // Default field type
            switch (field.valueType) {
                case ValueType.INT:
                    fieldType = `int${field.emptyRate !== 0 ? "?" : ""}`;
                    break;
                case ValueType.DOUBLE:
                    fieldType = `double${field.emptyRate !== 0 ? "?" : ""}`;
                    break;
                case ValueType.TEXT:
                    fieldType = 'string';
                    break;
                case ValueType.BOOLEAN:
                    fieldType = 'bool';
                    break;
                case ValueType.BIGINT:
                    fieldType = `long${field.emptyRate !== 0 ? "?" : ""}`;
                    break;
                case ValueType.INT_LIST:
                    fieldType = 'List<int>';
                    break;
                case ValueType.STRING_LIST:
                    fieldType = 'List<string>';
                    break;
                case ValueType.ONE_BIT:
                    fieldType = `int${field.emptyRate !== 0 ? "?" : ""}`;
                    break;
                case ValueType.DATE_TIME:
                    fieldType = `DateTime${field.emptyRate !== 0 ? "?" : ""}`
                    break;
                // Add more cases as necessary
            }
            csharpCode += `    public ${fieldType} ${field.fieldName} { get; set; }\n`;
        });
        csharpCode += '}\n\n';
    }

    // Determine collection type
    let collectionType = '';
    switch (config.collectionType) {
        case CSharpCollectionType.GENERIC_LIST:
            collectionType = 'List';
            break;
        case CSharpCollectionType.ARRAY:
            collectionType = 'Array';
            break;
        case CSharpCollectionType.ARRAY_LIST:
            collectionType = 'ArrayList';
            break;
        case CSharpCollectionType.HASHSET:
            collectionType = 'HashSet';
            break;
        // Add more cases as necessary
    }
    let itemType = config.dtoClass ? config.dtoClassName : 'var'; // Use var for non-dto types for simplicity

    // Initialize collection
    if (config.collectionType === CSharpCollectionType.ARRAY) {
        // Array initialization is unique
        csharpCode += `${itemType}[] ${config.collectionName} = new ${itemType}[${values.length}];\n`;
    } else {
        csharpCode += `${collectionType}<${itemType}> ${config.collectionName} = new ${collectionType}<${itemType}>();\n`;
    }

    // Populate collection with values
    values.forEach((value, index) => {
        let fieldAssignments = sortedFieldIds.map(id => {
            return `    ${fields[id].fieldName} = ${formatValueForCSharp(value[id], fields[id].valueType)}`;
        }).join(',\n'); // Ensure each field assignment is on a new line

        if (config.collectionType === CSharpCollectionType.ARRAY) {
            // Array value assignment
            csharpCode += `${config.collectionName}[${index}] = new ${itemType} {\n${fieldAssignments}\n    };\n`;
        } else {
            // Other collections value addition
            csharpCode += `${config.collectionName}.Add(new ${itemType}\n{\n${fieldAssignments}\n});\n`;
        }
    });

    return csharpCode;
};


// -------------------------------------------------------------------------------------------------------------
// config component

export const CSharpConfigComponent: React.FC<FormatterConfigComponentInterface> = ({...props}) => {
    const {config, onConfigChange} = props as {
        config: CSharpFormatterConfig,
        onConfigChange: typeof props.onConfigChange
    };

    // action
    const handleValueChange = (field: string, value: any) => {
        onConfigChange({...config, [field]: value})
    }

    return (
        <div>
            <OptionsSelect
                label={<FormattedMessage id="export.configurator.csharp.collectionType"/>}
                selectOptions={CSharpCollectionTypeSelectOptions}
                value={config.collectionType}
                onChange={(v) => handleValueChange("collectionType", v)}
                style={{width: "150px"}}
            />

            <OptionsInput
                required
                label={<FormattedMessage id="export.configurator.csharp.collectionName"/>}
                value={config.collectionName}
                onChange={(v) => handleValueChange("collectionName", v)}
                style={{width: "200px"}}
            />

            <OptionsSwitch
                label={<FormattedMessage id="export.configurator.csharp.dtoClass"/>}
                value={config.dtoClass}
                onChange={(v) => handleValueChange("dtoClass", v)}
            />

            {
                config.dtoClass && <OptionsInput
                    required
                    label={<FormattedMessage id="export.configurator.csharp.dtoClassName"/>}
                    value={config.dtoClassName}
                    onChange={(v) => handleValueChange("dtoClassName", v)}
                    style={{width: "200px"}}
                />
            }
        </div>
    );
}

const CSharpCollectionTypeSelectOptions: SelectOption[] = [
    {
        label: "List<T>",
        value: CSharpCollectionType.GENERIC_LIST
    },
    {
        label: "Array",
        value: CSharpCollectionType.ARRAY
    },
    {
        label: "ArrayList",
        value: CSharpCollectionType.ARRAY_LIST
    },
    {
        label: "HashSet<T>",
        value: CSharpCollectionType.HASHSET
    }
]
