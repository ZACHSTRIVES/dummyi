import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory, ValueType} from "@/constants/enums";
import {generate, SexGeneratorDefaultOptions} from "./Sex";

export const SexGenerator: Generator = {
    type: DataType.SEX,
    category: DataTypeCategory.PERSON,
    generate: generate,
    defaultOptions: SexGeneratorDefaultOptions,
    defaultValueType: ValueType.STRING,
    exampleLines: ['male', 'female']
}
    