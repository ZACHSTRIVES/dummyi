import {Formatter} from "@/types/formatter";
import {ExportType, ExportTypeCategory} from "@/constants/enums";
import {format} from "@/core/formatters/Csv/Csv.format";
import {CsvConfig} from "@/core/formatters/Csv/Csv.config";


export const CsvFormatter: Formatter = {
    type: ExportType.CSV,
    category: ExportTypeCategory.FILE_TYPES,
    format: format,
    configComponent: CsvConfig
};