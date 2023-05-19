import {format} from "@/core/formatters/Xml/Xml.format";
import {Formatter} from "@/types/formatter";
import {ExportFormat, ExportFormatCategory} from "@/constants/enums";
import {XmlConfig} from "@/core/formatters/Xml/Xml.config";


export const XmlFormatter: Formatter = {
    type: ExportFormat.XML,
    category: ExportFormatCategory.FILE_TYPES,
    format: format,
    configComponent: XmlConfig
}