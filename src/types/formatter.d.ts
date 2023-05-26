import React from "react";
import {ExportType, ExportTypeCategory} from "@/constants/enums";
import {JsonObject} from "@/types/system";

export enum ExportFormatCategory {
    FILE_TYPES = "fileTypes",
    PROGRAMMING_LANGUAGES = "programmingLanguages",
}

export enum ExportFormat {
    CSV = "CSV",
    JSON = "JSON",
    JAVA_SCRIPT = "Javascript",
    XML = "XML",
}

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
    format: ExportType;
    fields: DataField[];
    values: any[];
    config: JsonObject;
}