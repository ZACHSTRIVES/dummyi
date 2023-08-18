import React from "react";
import {ExportType, ExportTypeCategory} from "@/constants/enums";
import {JsonObject} from "@/types/system";
import {DataFieldList} from "@/types/generator";

export interface Formatter {
    type: ExportType;
    category: ExportTypeCategory;
    format: (request: FormatRequest) => string;
    fileExtension: string;
    configComponent?: React.FunctionComponent<FormatterConfigComponentInterface>;
    defaultConfig?: any;
}

export interface FormatterConfigComponentInterface {
    onConfigChange: (config: any) => void;
    config: any;
}

export interface FormatRequest {
    format: ExportType;
    fields: DataFieldList;
    sortedFieldIds: string[];
    values: any[];
    config: JsonObject;
}