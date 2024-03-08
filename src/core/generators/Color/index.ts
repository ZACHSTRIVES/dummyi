import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory, ValueType} from "@/constants/enums";
import {ColorGeneratorDefaultOptions, ColorGeneratorOptionsComponent, generate} from "@/core/generators/Color/Color";

export const ColorGenerator: Generator = {
    type: DataType.COLOR,
    category: DataTypeCategory.BASIC,
    generate: generate,
    optionsComponent: ColorGeneratorOptionsComponent,
    defaultOptions: ColorGeneratorDefaultOptions,
    defaultValueType: ValueType.STRING,
    exampleLines: ["red", "#ff0000", "8-32 bits x 3"]
}
    