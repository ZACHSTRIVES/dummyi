import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory} from "@/constants/enums";
import {generate} from "@/core/generators/Datetime/Datetime.generate";
import {DatetimeConfigPanel} from "@/core/generators/Datetime/Datetime.config";


export const DatetimeGenerator : Generator = {
    type: DataType.DATE_TIME,
    category:DataTypeCategory.BASIC,
    generate: generate,
    configComponent: DatetimeConfigPanel
}