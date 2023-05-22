import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory} from "@/constants/enums";
import {generate} from "@/core/generators/Boolean/Boolean.generate";
import {BooleanConfigPanel} from "@/core/generators/Boolean/Boolean.config";

export const BooleanGenerator : Generator = {
    type: DataType.BOOLEAN,
    category: DataTypeCategory.BASIC,
    generate: generate,
    configComponent: BooleanConfigPanel
}