import {format} from "@/core/formatters/Json/Json.format";
import {JsonConfig} from "@/core/formatters/Json/Json.config";
import {ExportFormat, ExportFormatCategory} from "@/constants/enums";
import {Formatter} from "@/types/formatter";

export const JsonFormatter: Formatter = {
    type: ExportFormat.JSON,
    category: ExportFormatCategory.FILE_TYPES,
    format: format,
};