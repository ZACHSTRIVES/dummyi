import {Formatter} from "@/types/formatter";
import {ExportFormat, ExportFormatCategory} from "@/constants/enums";
import {CsvConfigComponent, defaultCsvFormatterConfig, format} from "@/core/formatters/Csv/Csv";


export const CsvFormatter: Formatter = {
    type: ExportFormat.CSV,
    category: ExportFormatCategory.FILE_TYPES,
    format: format,
    configComponent: CsvConfigComponent,
    defaultConfig: defaultCsvFormatterConfig
};