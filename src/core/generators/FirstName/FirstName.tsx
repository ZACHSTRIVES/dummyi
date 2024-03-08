import React from "react";
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {Sex} from "@/constants/enums";
import {faker} from "@faker-js/faker";
import {FormattedMessage} from "@/locale";
import {OptionsSelect} from "@/components/Utils";
import {SexSelectOptions} from "@/core/common/selectOptions/SexSelectOptions";

// -------------------------------------------------------------------------------------------------------------
// types
export interface FirstNameGeneratorOptions {
    sex: Sex;
}

// -------------------------------------------------------------------------------------------------------------
// default options
export const FirstNameGeneratorDefaultOptions:FirstNameGeneratorOptions = {
    sex: Sex.ALL
}

// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: any): GenerateResult => {
    let config = null;
    if(options.sex !== Sex.ALL ){
        config = options.sex;
    }

    const value = faker.person.firstName(config);

    return {
        value: value,
        stringValue: value
    };
}

// -------------------------------------------------------------------------------------------------------------
// options component
export const FirstNameGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, handleOptionValueChange} = props as {
        options:FirstNameGeneratorOptions,
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
