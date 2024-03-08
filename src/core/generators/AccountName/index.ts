import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory, ValueType} from "@/constants/enums";
import {AccountNameGeneratorDefaultOptions, generate} from "./AccountName";

export const AccountNameGenerator: Generator = {
    type: DataType.ACCOUNTNAME,
    category: DataTypeCategory.COMMERCE,
    generate: generate,
    defaultOptions: AccountNameGeneratorDefaultOptions,
    defaultValueType: ValueType.STRING,
    exampleLines: ["Savings Account", "Home Loan Account", "Investment Account"]
}
    