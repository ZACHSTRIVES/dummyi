import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory, ValueType} from "@/constants/enums";
import {UrlGeneratorDefaultOptions, UrlGeneratorOptionsComponent, generate} from "./Url";

export const UrlGenerator: Generator = {
    type: DataType.URL,
    category: DataTypeCategory.NETWORK,
    generate: generate,
    optionsComponent: UrlGeneratorOptionsComponent,
    defaultOptions: UrlGeneratorDefaultOptions,
    defaultValueType: ValueType.STRING,
    exampleLines: ["https://slim-site.name", "https://tinyurl.com", "https://soft-snow.com"]
}
    