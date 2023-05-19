import {Formatter} from "@/types/formatter";
import {ExportFormat, ExportFormatCategory} from "@/constants/enums";
import {format} from "@/core/formatters/JavaScript/JavaScript.format";
import {JavaScriptConfig} from "@/core/formatters/JavaScript/JavaScript.config";

export const JavaScriptFormatter: Formatter = {
    type: ExportFormat.JAVA_SCRIPT,
    category: ExportFormatCategory.PROGRAMMING_LANGUAGES,
    format: format
}