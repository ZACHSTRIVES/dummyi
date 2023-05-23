import {DataType, DataTypeCategory} from "@/constants/enums";
import React from "react";

export interface DataField {
    id: string;
    isDraft: boolean;
    fieldName?: string;
    fieldType?: string;
}

export interface Generator {
    type: DataType;
    category: DataTypeCategory;
    generate: (request: GenerateRequest) => any;
    examples?: string;
    configComponent?: React.FunctionComponent<GeneratorConfigComponentInterface>;
    defaultConfig?: any;
    displayName?: string;
}

export interface GeneratorConfigComponentInterface {
    onConfigChange: (config: any) => void;
}

export interface GenerateRequest {
    dataFields: DataField[];
}

