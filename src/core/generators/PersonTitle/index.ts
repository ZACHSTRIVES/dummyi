import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory} from "@/constants/enums";
import {PersonTitleGeneratorDefaultOptions, PersonTitleGeneratorOptionsComponent, generate} from "./PersonTitle";

export const PersonTitleGenerator: Generator = {
    type: DataType.PERSONTITLE,
    category: DataTypeCategory.PERSON,
    generate: generate,
    optionsComponent: PersonTitleGeneratorOptionsComponent,
    defaultOptions: PersonTitleGeneratorDefaultOptions,
    exampleLines: ["Miss", "Mr.", "Dr."]
}
    