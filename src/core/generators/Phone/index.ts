import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory} from "@/constants/enums";
import {PhoneGeneratorDefaultOptions, PhoneGeneratorOptionsComponent, generate} from "./Phone";

export const PhoneGenerator: Generator = {
    type: DataType.PHONE,
    category: DataTypeCategory.PERSON,
    generate: generate,
    optionsComponent: PhoneGeneratorOptionsComponent,
    defaultOptions: PhoneGeneratorDefaultOptions,
    exampleLines: ["+1-493-854-638", "(555) 750-8477", "(+64) 022-958-4397"]
}
    