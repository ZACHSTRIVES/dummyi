import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory} from "@/constants/enums";
import {generate} from "@/core/generators/AccountNumber/AccountNumber.generate";
import {AccountNumberConfigPanel} from "@/core/generators/AccountNumber/AccountNumber.config";

export const AccountNumberGenerator : Generator = {
    type: DataType.ACCOUNT_NUMBER,
    category: DataTypeCategory.COMMERCE,
    generate: generate,
    configComponent: AccountNumberConfigPanel
}