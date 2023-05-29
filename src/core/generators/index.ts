import {DataType} from "@/constants/enums";
import {BooleanGenerator} from "@/core/generators/Boolean";
import {DatetimeGenerator} from "@/core/generators/Datetime";
import {NumberGenerator} from "@/core/generators/Number";
import {AccountNumberGenerator} from "@/core/generators/AccountNumber";
import {FullNameGenerator} from "@/core/generators/FullName";




export const generators = {
    [DataType.BOOLEAN]:BooleanGenerator,
    [DataType.DATE_TIME]:DatetimeGenerator,
    [DataType.NUMBER]:NumberGenerator,
    [DataType.ACCOUNT_NUMBER]:AccountNumberGenerator,
    [DataType.FULL_NAME]:FullNameGenerator
}