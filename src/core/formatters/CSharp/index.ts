import {Formatter} from "@/types/formatter";
import {ExportFormat, ExportFormatCategory} from "@/constants/enums";
import {CSharpConfigComponent, format, defaultCSharpFormatterConfig} from "./CSharp";


export const CSharpFormatter: Formatter = {
    type: ExportFormat.CSHARP,
    category: ExportFormatCategory.PROGRAMMING_LANGUAGES,
    format: format,
    fileExtension: 'cs',
    configComponent: CSharpConfigComponent,
    defaultConfig: defaultCSharpFormatterConfig,
}