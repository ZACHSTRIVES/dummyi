import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory} from "@/constants/enums";
import {EmailGeneratorDefaultOptions, EmailGeneratorOptionsComponent, generate} from "@/core/generators/Email/Email";

export const EmailGenerator: Generator = {
    type: DataType.EMAIL,
    category: DataTypeCategory.NETWORK,
    generate: generate,
    optionsComponent: EmailGeneratorOptionsComponent,
    defaultOptions: EmailGeneratorDefaultOptions,
    exampleLines: ["Saman3@hotmail.com", "nik.Rau78@yahoo.com", "denis@apple.com"]
}