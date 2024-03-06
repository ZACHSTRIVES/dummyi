import React from "react";
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {Sex} from "@/constants/enums";
import {faker} from "@faker-js/faker";
import {OptionsSelect} from "@/components/Utils";
import {FormattedMessage} from "@/locale";
import {SexSelectOptions} from "@/core/common/selectOptions/SexSelectOptions";

// -------------------------------------------------------------------------------------------------------------
// types
export interface MiddleNameGeneratorOptions {
    sex: Sex;
}

// -------------------------------------------------------------------------------------------------------------
// default options
export const MiddleNameGeneratorDefaultOptions: MiddleNameGeneratorOptions = {
    sex: Sex.ALL
}

// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: any): GenerateResult => {
    let config = null;
    if (options.sex !== Sex.ALL) {
        config = options.sex;
    }

    const value = faker.person.middleName(config);

    return {
        value: value,
        stringValue: value,
    };
}

// -------------------------------------------------------------------------------------------------------------
// options component
export const MiddleNameGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, handleOptionValueChange} = props as {
        options: MiddleNameGeneratorOptions,
        handleOptionValueChange: typeof props.handleOptionValueChange
    };

    return (
        <>
            <OptionsSelect
                label={<FormattedMessage id={"dataType.fullName.sex.label"}/>}
                selectOptions={SexSelectOptions}
                value={options.sex}
                style={{width: '150px'}}
                onChange={(v) => handleOptionValueChange("sex", v)}/>
        </>
    );
}