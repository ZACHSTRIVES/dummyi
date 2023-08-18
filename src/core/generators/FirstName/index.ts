import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory} from "@/constants/enums";
import {FirstNameGeneratorDefaultOptions, FirstNameGeneratorOptionsComponent, generate} from "./FirstName";

export const FirstNameGenerator: Generator = {
    type: DataType.FIRSTNAME,
    category: DataTypeCategory.PERSON,
    generate: generate,
    optionsComponent: FirstNameGeneratorOptionsComponent,
    defaultOptions: FirstNameGeneratorDefaultOptions,
    exampleLines: ["Javier", "Luis", "Tom"]
}
    