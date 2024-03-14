import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory, ValueType} from "@/constants/enums";
import {DateTimeGeneratorDefaultOptions, DateTimeGeneratorOptionsComponent, generate} from "./DateTime";

export const DateTimeGenerator: Generator = {
    type: DataType.DATETIME,
    category: DataTypeCategory.DATETIME,
    generate: generate,
    optionsComponent: DateTimeGeneratorOptionsComponent,
    defaultOptions: DateTimeGeneratorDefaultOptions,
    defaultValueType: ValueType.DATE_TIME,
    exampleLines: ["1725842513046", "29-01-2025 20:15:40", "13-06-2023 08:16:09"]
}
    