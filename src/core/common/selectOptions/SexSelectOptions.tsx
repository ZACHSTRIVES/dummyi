import {SelectOption} from "@/components/Utils";
import {FormattedMessage} from "@/locale";
import {Sex} from "@/constants/enums";
import React from "react";

export const SexSelectOptions: SelectOption[] = [
    {
        label: <FormattedMessage id={"dataType.fullName.sex.selectOptions.all"}/>,
        value: Sex.ALL
    },
    {
        label: <FormattedMessage id={"dataType.fullName.sex.selectOptions.male"}/>,
        value: Sex.MALE,
    },
    {
        label: <FormattedMessage id={"dataType.fullName.sex.selectOptions.female"}/>,
        value: Sex.FEMALE
    }
]
