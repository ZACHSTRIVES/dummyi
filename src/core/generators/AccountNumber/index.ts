import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory} from "@/constants/enums";
import {AccountNumberGeneratorOptionsComponent, generate} from "@/core/generators/AccountNumber/AccountNumber";


export const AccountNumberGenerator : Generator = {
    type: DataType.ACCOUNT_NUMBER,
    category: DataTypeCategory.COMMERCE,
    generate: generate,
    optionsComponent: AccountNumberGeneratorOptionsComponent
}