import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory} from "@/constants/enums";
import {SexGeneratorDefaultOptions, SexGeneratorOptionsComponent, generate} from "./Sex";

export const SexGenerator: Generator = {
    type: DataType.SEX,
    category: DataTypeCategory.PERSON,
    generate: generate,
    defaultOptions: SexGeneratorDefaultOptions,
    exampleLines: ['male', 'female']
}
    