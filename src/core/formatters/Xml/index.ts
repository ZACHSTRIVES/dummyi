import {format} from "@/core/formatters/Xml/Xml.format";
import {Formatter} from "@/types/formatter";
import {ExportType, ExportTypeCategory} from "@/constants/enums";
import {XmlConfig} from "@/core/formatters/Xml/Xml.config";


export const XmlFormatter: Formatter = {
    type: ExportType.XML,
    category: ExportTypeCategory.FILE_TYPES,
    format: format,
    configComponent: XmlConfig
}