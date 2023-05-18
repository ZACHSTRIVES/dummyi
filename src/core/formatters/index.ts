import {Formatter} from "@/types/formatter";
import {CsvFormatter} from "@/core/formatters/Csv";
import {JsonFormatter} from "@/core/formatters/Json";
import {JavaScriptFormatter} from "@/core/formatters/JavaScript";
import {ExportType} from "@/constants/enums";
import {XmlFormatter} from "@/core/formatters/Xml";


export const formatters = {
    [ExportType.CSV]: CsvFormatter,
    [ExportType.JSON]: JsonFormatter,
    [ExportType.JAVA_SCRIPT]: JavaScriptFormatter,
    [ExportType.XML]: XmlFormatter,
}