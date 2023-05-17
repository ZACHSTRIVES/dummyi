import {format} from "@/core/formatters/Json/Json.format";
import {JsonConfig} from "@/core/formatters/Json/Json.config";
import {ExportType, ExportTypeCategory} from "@/constants/enums";
import {Formatter} from "@/types/formatter";

export const JsonFormatter: Formatter = {
    type: ExportType.JSON,
    category: ExportTypeCategory.FILE_TYPES,
    format: format,
    configComponent: JsonConfig
};