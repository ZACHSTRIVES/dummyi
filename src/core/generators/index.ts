import {DataType} from "@/constants/enums";
import {BooleanGenerator} from "@/core/generators/Boolean";
import {DatetimeGenerator} from "@/core/generators/Datetime";
import {PersonNameGenerator} from "@/core/generators/PersonName";
import {NumberGenerator} from "@/core/generators/Number";
import {AccountNumberGenerator} from "@/core/generators/AccountNumber";




export const generators = {
    [DataType.BOOLEAN]:BooleanGenerator,
    [DataType.DATE_TIME]:DatetimeGenerator,
    [DataType.PERSON_NAME]:PersonNameGenerator,
    [DataType.NUMBER]:NumberGenerator,
    [DataType.ACCOUNT_NUMBER]:AccountNumberGenerator
}