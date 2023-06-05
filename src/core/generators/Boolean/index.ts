import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory} from "@/constants/enums";
import {
    generate,
    BooleanGeneratorOptionsComponent,
    BooleanGeneratorDefaultOptions
} from "@/core/generators/Boolean/Boolean";


export const BooleanGenerator: Generator = {
    type: DataType.BOOLEAN,
    category: DataTypeCategory.BASIC,
    generate: generate,
    optionsComponent: BooleanGeneratorOptionsComponent,
    defaultOptions: BooleanGeneratorDefaultOptions,
    exampleLines: ["true, false", "1, 0", '"True", "Yes", "No"']
}