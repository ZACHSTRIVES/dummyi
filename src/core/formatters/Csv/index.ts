import {Formatter} from "@/types/formatter";
import {ExportFormat, ExportFormatCategory} from "@/constants/enums";
import {format} from "@/core/formatters/Csv/Csv.format";
import {CsvConfig, defaultCsvFormatterConfig} from "@/core/formatters/Csv/Csv.config";


export const CsvFormatter: Formatter = {
    type: ExportFormat.CSV,
    category: ExportFormatCategory.FILE_TYPES,
    format: format,
    configComponent: CsvConfig,
    defaultConfig: defaultCsvFormatterConfig
};