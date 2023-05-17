import {Formatter} from "@/types/formatter";
import {ExportType, ExportTypeCategory} from "@/constants/enums";
import {format} from "@/core/formatters/JavaScript/JavaScript.format";
import {JavaScriptConfig} from "@/core/formatters/JavaScript/JavaScript.config";

export const JavaScriptFormatter: Formatter = {
    type: ExportType.JAVA_SCRIPT,
    category: ExportTypeCategory.PROGRAMMING_LANGUAGES,
    format: format,
    configComponent: JavaScriptConfig
}