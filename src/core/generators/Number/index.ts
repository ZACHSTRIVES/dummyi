import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory} from "@/constants/enums";
import {NumberGeneratorOptionsComponent, NumberGeneratorDefaultOptions, generate} from "@/core/generators/Number/Number";


export const NumberGenerator: Generator = {
    type: DataType.NUMBER,
    category: DataTypeCategory.BASIC,
    generate: generate,
    optionsComponent: NumberGeneratorOptionsComponent,
    defaultOptions: NumberGeneratorDefaultOptions,
    exampleLines: ["0.2, 1000, 1234", "10110101, af17", "431433n, 0x1234"]
}