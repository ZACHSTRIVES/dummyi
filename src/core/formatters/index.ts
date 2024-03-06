import {SqlFormatter} from "@/core/formatters/Sql";
import {CsvFormatter} from "@/core/formatters/Csv";
import {JsonFormatter} from "@/core/formatters/Json";
import {JavaScriptFormatter} from "@/core/formatters/JavaScript";
import {ExportFormat} from "@/constants/enums";
import {XmlFormatter} from "@/core/formatters/Xml";


export const formatters = {
  [ExportFormat.SQL]: SqlFormatter,
    [ExportFormat.CSV]: CsvFormatter,
    [ExportFormat.JSON]: JsonFormatter,
    [ExportFormat.JAVA_SCRIPT]: JavaScriptFormatter,
    [ExportFormat.XML]: XmlFormatter,
}