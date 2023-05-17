import {Formatter} from "@/types/formatter";
import {CsvFormatter} from "@/core/formatters/Csv";
import {JsonFormatter} from "@/core/formatters/Json";
import {JavaScriptFormatter} from "@/core/formatters/JavaScript";


export const formatters: Formatter[] = [
    CsvFormatter,
    JsonFormatter,
    JavaScriptFormatter
]