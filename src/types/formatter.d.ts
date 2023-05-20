import React from "react";
import {ExportType, ExportTypeCategory} from "@/constants/enums";
import {JsonObject} from "@/types/system";

export interface Formatter {
    type: ExportType;
    category: ExportTypeCategory;
    format: (request: FormatRequest) => string;
    configComponent?: React.FunctionComponent<FormatterConfigComponentInterface>;
    defaultConfig?: any;
}

export interface FormatterConfigComponentInterface {
    onConfigChange: (config: any) => void;
    config: any;
}

export interface FormatRequest {
    fields: DataField[];
    values: any[];
    config: JsonObject;
}