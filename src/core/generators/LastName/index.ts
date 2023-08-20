import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory} from "@/constants/enums";
import {LastNameGeneratorDefaultOptions, LastNameGeneratorOptionsComponent, generate} from "./LastName";

export const LastNameGenerator: Generator = {
    type: DataType.LASTNAME,
    category: DataTypeCategory.PERSON,
    generate: generate,
    optionsComponent: LastNameGeneratorOptionsComponent,
    defaultOptions: LastNameGeneratorDefaultOptions,
    exampleLines: ["Hegmann", "Parker", "Wang"]
}
    