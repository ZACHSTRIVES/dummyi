import {DomainNameGenerator} from "@/core/generators/DomainName";
import {ColorGenerator} from "@/core/generators/Color";
import {PhoneGenerator} from "@/core/generators/Phone";
import {EmojiGenerator} from "@/core/generators/Emoji";
import {PersonTitleGenerator} from "@/core/generators/PersonTitle";
import {MiddleNameGenerator} from "@/core/generators/MiddleName";
import {LastNameGenerator} from "@/core/generators/LastName";
import {FirstNameGenerator} from "@/core/generators/FirstName";
import {SexGenerator} from "@/core/generators/Sex";
import {BooleanGenerator} from "@/core/generators/Boolean";
import {NumberGenerator} from "@/core/generators/Number";
import {FullNameGenerator} from "@/core/generators/FullName";
import {EmailGenerator} from "@/core/generators/Email";
import {CompanyNameGenerator} from "@/core/generators/CompanyName";
import {DataType} from "@/constants/enums";

export const generators = {
  [DataType.DOMAINNAME]: DomainNameGenerator,
    [DataType.COLOR]: ColorGenerator,
    [DataType.PHONE]: PhoneGenerator,
    [DataType.EMOJI]: EmojiGenerator,
    [DataType.PERSONTITLE]: PersonTitleGenerator,
    [DataType.MIDDLENAME]: MiddleNameGenerator,
    [DataType.LASTNAME]: LastNameGenerator,
    [DataType.FIRSTNAME]: FirstNameGenerator,
    [DataType.SEX]: SexGenerator,
    [DataType.BOOLEAN]: BooleanGenerator,
    [DataType.NUMBER]: NumberGenerator,
    [DataType.FULL_NAME]: FullNameGenerator,
    [DataType.EMAIL]: EmailGenerator,
    [DataType.COMPANY_NAME]: CompanyNameGenerator,
}