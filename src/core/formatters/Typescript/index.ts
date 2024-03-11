import {Formatter} from "@/types/formatter";
import {ExportFormat, ExportFormatCategory} from "@/constants/enums";
import {TypescriptConfigComponent, format, defaultTypescriptFormatterConfig} from "./Typescript";


export const TypescriptFormatter: Formatter = {
    type: ExportFormat.TYPESCRIPT,
    category: ExportFormatCategory.PROGRAMMING_LANGUAGES,
    format: format,
    fileExtension: 'ts',
    configComponent: TypescriptConfigComponent,
    defaultConfig: defaultTypescriptFormatterConfig,
}