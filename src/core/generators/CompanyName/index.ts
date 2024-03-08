import {Generator} from "@/types/generator";
import {generate} from "@/core/generators/CompanyName/CompanyName";
import {DataType, DataTypeCategory, ValueType} from "@/constants/enums";

export const CompanyNameGenerator:Generator = {
    type: DataType.COMPANY_NAME,
    category: DataTypeCategory.COMMERCE,
    generate: generate,
    defaultValueType: ValueType.STRING,
    exampleLines: ["Cassin LLC", "Thompson Group", "Emmerich Inc"]
}

