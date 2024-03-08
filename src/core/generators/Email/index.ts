import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory, ValueType} from "@/constants/enums";
import {EmailGeneratorDefaultOptions, EmailGeneratorOptionsComponent, generate} from "@/core/generators/Email/Email";

export const EmailGenerator: Generator = {
    type: DataType.EMAIL,
    category: DataTypeCategory.NETWORK,
    generate: generate,
    optionsComponent: EmailGeneratorOptionsComponent,
    defaultOptions: EmailGeneratorDefaultOptions,
    defaultValueType: ValueType.STRING,
    exampleLines: ["Saman3@hotmail.com", "nik.Rau78@yahoo.com", "denis@apple.com"]
}