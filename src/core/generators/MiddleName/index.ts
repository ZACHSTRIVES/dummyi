import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory, ValueType} from "@/constants/enums";
import {generate, MiddleNameGeneratorDefaultOptions, MiddleNameGeneratorOptionsComponent} from "./MiddleName";

export const MiddleNameGenerator: Generator = {
    type: DataType.MIDDLENAME,
    category: DataTypeCategory.PERSON,
    generate: generate,
    optionsComponent: MiddleNameGeneratorOptionsComponent,
    defaultOptions: MiddleNameGeneratorDefaultOptions,
    defaultValueType: ValueType.STRING,
    exampleLines: ["Elliott", "Taylor", "Bailey"]
}
    