import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory} from "@/constants/enums";
import {generate} from "@/core/generators/Number/Number.generate";
import {NumberConfigPanel} from "@/core/generators/Number/Number.config";


export const NumberGenerator : Generator = {
    type: DataType.NUMBER,
    category: DataTypeCategory.BASIC,
    generate: generate,
    configComponent: NumberConfigPanel,
    examples:"0.2, 1000, 1234 " +
        "10110101, af17"
}