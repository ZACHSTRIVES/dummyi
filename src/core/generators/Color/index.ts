import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory} from "@/constants/enums";

import {ColorGeneratorOptionsComponent, ColorGeneratorDefaultOptions, generate} from "@/core/generators/Color/Color";
export const ColorGenerator: Generator = {
    type: DataType.COLOR,
    category: DataTypeCategory.BASIC,
    generate: generate,
    optionsComponent: ColorGeneratorOptionsComponent,
    defaultOptions: ColorGeneratorDefaultOptions,
    exampleLines: ["red", "#ff0000", "8-32 bits x 3"]
}
    