import {Formatter} from "@/types/formatter";
import {ExportFormat, ExportFormatCategory} from "@/constants/enums";
import {SqlConfigComponent, format, defaultSqlFormatterConfig} from "./Sql";


export const SqlFormatter: Formatter = {
    type: ExportFormat.SQL,
    category: ExportFormatCategory.DATABASES,
    format: format,
    fileExtension: 'sql',
    configComponent: SqlConfigComponent,
    defaultConfig: defaultSqlFormatterConfig,
}