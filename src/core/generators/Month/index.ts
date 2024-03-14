import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory, ValueType} from "@/constants/enums";
import {MonthGeneratorDefaultOptions, MonthGeneratorOptionsComponent, generate} from "./Month";

export const MonthGenerator: Generator = {
    type: DataType.MONTH,
    category: DataTypeCategory.DATETIME,
    generate: generate,
    optionsComponent: MonthGeneratorOptionsComponent,
    defaultOptions: MonthGeneratorDefaultOptions,
    defaultValueType: ValueType.STRING,
    exampleLines: ["September", "Feb", "December"]
}
    