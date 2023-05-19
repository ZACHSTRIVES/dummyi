import {Formatter} from "@/types/formatter";
import {CsvFormatter} from "@/core/formatters/Csv";
import {JsonFormatter} from "@/core/formatters/Json";
import {JavaScriptFormatter} from "@/core/formatters/JavaScript";
import {ExportFormat} from "@/constants/enums";
import {XmlFormatter} from "@/core/formatters/Xml";


export const formatters = {
    [ExportFormat.CSV]: CsvFormatter,
    [ExportFormat.JSON]: JsonFormatter,
    [ExportFormat.JAVA_SCRIPT]: JavaScriptFormatter,
    [ExportFormat.XML]: XmlFormatter,
}