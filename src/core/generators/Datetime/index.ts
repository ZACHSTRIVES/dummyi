import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory} from "@/constants/enums";
import {DatetimeGeneratorOptionsComponent, generate} from "@/core/generators/Datetime/Datetime";



export const DatetimeGenerator : Generator = {
    type: DataType.DATE_TIME,
    category:DataTypeCategory.BASIC,
    generate: generate,
    optionsComponent: DatetimeGeneratorOptionsComponent
}