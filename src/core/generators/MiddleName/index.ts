import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory} from "@/constants/enums";
import {MiddleNameGeneratorDefaultOptions, MiddleNameGeneratorOptionsComponent, generate} from "./MiddleName";

export const MiddleNameGenerator: Generator = {
    type: DataType.MIDDLENAME,
    category: DataTypeCategory.PERSON,
    generate: generate,
    optionsComponent: MiddleNameGeneratorOptionsComponent,
    defaultOptions: MiddleNameGeneratorDefaultOptions,
    exampleLines: ["Elliott", "Taylor", "Bailey"]
}
    