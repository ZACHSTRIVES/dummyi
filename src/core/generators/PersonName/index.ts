import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory} from "@/constants/enums";
import {generate} from "@/core/generators/PersonName/PersonName.generate";
import {PersonNameConfigPanel} from "@/core/generators/PersonName/PersonName.config";



export const PersonNameGenerator : Generator = {
    type: DataType.NAME,
    category: DataTypeCategory.PERSON,
    generate: generate,
    configComponent: PersonNameConfigPanel
}