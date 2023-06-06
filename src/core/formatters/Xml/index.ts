import {Formatter} from "@/types/formatter";
import {ExportFormat, ExportFormatCategory} from "@/constants/enums";
import {XmlConfigComponent, format, defaultXmlFormatterConfig} from "@/core/formatters/Xml/Xml";


export const XmlFormatter: Formatter = {
    type: ExportFormat.XML,
    category: ExportFormatCategory.FILE_TYPES,
    format: format,
    configComponent: XmlConfigComponent,
    defaultConfig: defaultXmlFormatterConfig,
}