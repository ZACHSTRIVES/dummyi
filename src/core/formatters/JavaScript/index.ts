import {Formatter} from "@/types/formatter";
import {ExportFormat, ExportFormatCategory} from "@/constants/enums";
import {JavascriptConfigComponent, format, defaultJavascriptFormatterConfig} from "@/core/formatters/JavaScript/Javascript";

export const JavaScriptFormatter: Formatter = {
    type: ExportFormat.JAVA_SCRIPT,
    category: ExportFormatCategory.PROGRAMMING_LANGUAGES,
    format: format,
    fileExtension: 'js',
    configComponent: JavascriptConfigComponent,
    defaultConfig: defaultJavascriptFormatterConfig
}