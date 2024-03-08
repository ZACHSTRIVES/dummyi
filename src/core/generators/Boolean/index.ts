import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory, ValueType} from "@/constants/enums";
import {
    BooleanGeneratorDefaultOptions,
    BooleanGeneratorOptionsComponent,
    generate
} from "@/core/generators/Boolean/Boolean";


export const BooleanGenerator: Generator = {
    type: DataType.BOOLEAN,
    category: DataTypeCategory.BASIC,
    generate: generate,
    defaultValueType: ValueType.BOOLEAN,
    optionsComponent: BooleanGeneratorOptionsComponent,
    defaultOptions: BooleanGeneratorDefaultOptions,
    exampleLines: ["true, false", "1, 0", '"True", "Yes", "No"']
}