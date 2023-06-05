import {DataType, DataTypeCategory, ExportValueType} from "@/constants/enums";
import React from "react";

export interface DataField {
    isDraft: boolean;
    fieldName?: string;
    dataType?: DataType;
    dataTypeOptions?: any;
    emptyRate?: number;
}

export interface DataFieldList {
    [id: string]: DataField;
}

export interface Generator {
    type: DataType;
    category: DataTypeCategory;
    generate: (options:any) => any;
    exampleLines?: string[];
    optionsComponent?: React.FunctionComponent<GeneratorOptionsComponentInterface>;
    defaultOptions?: any;
    displayName?: string;
}

export interface GeneratorOptionsComponentInterface {
    options: any;
    onOptionsChange: (config: any) => void;
}

export interface GenerateRequest {
    field: DataField;
}

export interface GenerateResult {
    value: any;
    stringValue: string;
    type: ExportValueType
}

