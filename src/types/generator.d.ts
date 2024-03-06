import {DataType, DataTypeCategory, ValueType} from "@/constants/enums";
import React from "react";

export interface DataField {
    isDraft: boolean;
    valueType: ValueType;
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
    generate: (options: any) => any;
    defaultValueType: ValueType;
    exampleLines?: string[];
    optionsComponent?: React.FunctionComponent<GeneratorOptionsComponentInterface>;
    defaultOptions?: any;
    displayName?: string;
}

export interface GeneratorOptionsComponentInterface {
    options: any;
    handleOptionValueChange: (fieldName: string, value: any, valueType?: ValueType) => void;
}

export interface GenerateRequest {
    field: DataField;
}

export interface GenerateResult {
    value: any;
    stringValue: string;
}

export interface GenerateDataBatchCompletedCallbackResponse {
    batchIndex: number;
    batchCount: number;
    batchTimeElapsed: number;
    totalTimeElapsed: number;
    totalNumOfRowsGenerated: number;
}

