import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory, ValueType} from "@/constants/enums";
import {BirthdayGeneratorDefaultOptions, BirthdayGeneratorOptionsComponent, generate} from "./Birthday";

export const BirthdayGenerator: Generator = {
    type: DataType.BIRTHDAY,
    category: DataTypeCategory.PERSON,
    generate: generate,
    optionsComponent: BirthdayGeneratorOptionsComponent,
    defaultOptions: BirthdayGeneratorDefaultOptions,
    defaultValueType: ValueType.DATE_TIME,
    exampleLines: ["1949-08-11T20:00:14.636Z", "-640186506999", "18-02-1968 20:14:50"]
}
    