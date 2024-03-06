import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory, ValueType} from "@/constants/enums";
import {generate, PersonTitleGeneratorDefaultOptions, PersonTitleGeneratorOptionsComponent} from "./PersonTitle";

export const PersonTitleGenerator: Generator = {
    type: DataType.PERSONTITLE,
    category: DataTypeCategory.PERSON,
    generate: generate,
    optionsComponent: PersonTitleGeneratorOptionsComponent,
    defaultOptions: PersonTitleGeneratorDefaultOptions,
    defaultValueType: ValueType.STRING,
    exampleLines: ["Miss", "Mr.", "Dr."]
}
    