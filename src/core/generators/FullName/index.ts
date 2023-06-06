import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory} from "@/constants/enums";
import {
    FullNameGeneratorDefaultOptions,
    FullNameGeneratorOptionsComponent,
    generate
} from "@/core/generators/FullName/FullName";



export const FullNameGenerator : Generator = {
    type: DataType.FULL_NAME,
    category:DataTypeCategory.PERSON,
    generate: generate,
    optionsComponent: FullNameGeneratorOptionsComponent,
    defaultOptions: FullNameGeneratorDefaultOptions,
    exampleLines:["Zach Smith", "Peggy Hackett", "Mr. Elmer Nienow"]
}