import {format, JsonConfigComponent, defaultJsonFormatterConfig} from "@/core/formatters/Json/Json";
import {ExportFormat, ExportFormatCategory} from "@/constants/enums";
import {Formatter} from "@/types/formatter";

export const JsonFormatter: Formatter = {
    type: ExportFormat.JSON,
    category: ExportFormatCategory.FILE_TYPES,
    format: format,
    fileExtension: 'json',
    configComponent: JsonConfigComponent,
    defaultConfig: defaultJsonFormatterConfig
};