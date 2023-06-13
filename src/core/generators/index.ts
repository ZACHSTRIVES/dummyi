import {BooleanGenerator} from "@/core/generators/Boolean";
import {NumberGenerator} from "@/core/generators/Number";
import {FullNameGenerator} from "@/core/generators/FullName";
import {EmailGenerator} from "@/core/generators/Email";
import {CompanyNameGenerator} from "@/core/generators/CompanyName";
import {DataType} from "@/constants/enums";

export const generators = {
    [DataType.BOOLEAN]: BooleanGenerator,
    [DataType.NUMBER]: NumberGenerator,
    [DataType.FULL_NAME]: FullNameGenerator,
    [DataType.EMAIL]: EmailGenerator,
    [DataType.COMPANY_NAME]: CompanyNameGenerator,
}