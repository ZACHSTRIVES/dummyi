import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory, ValueType} from "@/constants/enums";
import {FirstNameGeneratorDefaultOptions, FirstNameGeneratorOptionsComponent, generate} from "./FirstName";

export const FirstNameGenerator: Generator = {
    type: DataType.FIRSTNAME,
    category: DataTypeCategory.PERSON,
    generate: generate,
    optionsComponent: FirstNameGeneratorOptionsComponent,
    defaultOptions: FirstNameGeneratorDefaultOptions,
    defaultValueType: ValueType.STRING,
    exampleLines: ["Javier", "Luis", "Tom"]
}
    