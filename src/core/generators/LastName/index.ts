import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory, ValueType} from "@/constants/enums";
import {generate, LastNameGeneratorDefaultOptions, LastNameGeneratorOptionsComponent} from "./LastName";

export const LastNameGenerator: Generator = {
    type: DataType.LASTNAME,
    category: DataTypeCategory.PERSON,
    generate: generate,
    optionsComponent: LastNameGeneratorOptionsComponent,
    defaultOptions: LastNameGeneratorDefaultOptions,
    defaultValueType: ValueType.STRING,
    exampleLines: ["Hegmann", "Parker", "Wang"]
}
    