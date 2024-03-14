import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory, ValueType} from "@/constants/enums";
import {WeekdayGeneratorDefaultOptions, WeekdayGeneratorOptionsComponent, generate} from "./Weekday";

export const WeekdayGenerator: Generator = {
    type: DataType.WEEKDAY,
    category: DataTypeCategory.DATETIME,
    generate: generate,
    optionsComponent: WeekdayGeneratorOptionsComponent,
    defaultOptions: WeekdayGeneratorDefaultOptions,
    defaultValueType: ValueType.STRING,
    exampleLines: ["Wednesday", "Wed", "Thursday"]
}
    