import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory, ValueType} from "@/constants/enums";
import {AccountNumberGeneratorDefaultOptions, AccountNumberGeneratorOptionsComponent, generate} from "./AccountNumber";

export const AccountNumberGenerator: Generator = {
    type: DataType.ACCOUNTNUMBER,
    category: DataTypeCategory.COMMERCE,
    generate: generate,
    optionsComponent: AccountNumberGeneratorOptionsComponent,
    defaultOptions: AccountNumberGeneratorDefaultOptions,
    defaultValueType: ValueType.STRING,
    exampleLines: ["240073388677", "58712518", "817968195916"]
}
    