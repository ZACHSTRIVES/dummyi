import React from 'react';
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {OptionsInput, OptionsSelect} from "@/components/Utils";
import {FormattedMessage} from "@/locale";
import {Sex} from "@/constants/enums";
import {faker} from "@faker-js/faker";
import {isNullOrWhiteSpace} from "@/utils/stringUtils";
import {SexSelectOptions} from "@/core/common/selectOptions/SexSelectOptions";


// -------------------------------------------------------------------------------------------------------------
// types

export interface FullNameGeneratorOptions {
    sex: Sex;
    firstName?: string;
    lastName?: string;
}

export const FullNameGeneratorDefaultOptions: FullNameGeneratorOptions = {
    sex: Sex.ALL,
    firstName: '',
    lastName: '',
}


// -------------------------------------------------------------------------------------------------------------
// generate method

export const generate = (options): GenerateResult => {
    const config = {};
    if(options.sex !== Sex.ALL ){
        config['sex'] = options.sex;
    }
    if(!isNullOrWhiteSpace(options.firstName)){
        config['firstName'] = options.firstName;
    }
    if(!isNullOrWhiteSpace(options.lastName)){
        config['lastName'] = options.lastName;
    }

    const value = faker.person.fullName(config)

    return {
        value:value,
        stringValue: value,
    }
}

// -------------------------------------------------------------------------------------------------------------
// options component

export const FullNameGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, handleOptionValueChange} = props as {
        options: FullNameGeneratorOptions,
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

            <OptionsInput
                label={<FormattedMessage id={"dataType.fullName.firstName.label"}/>}
                value={options.firstName}
                onChange={(v) => handleOptionValueChange("firstName", v)}
                style={{width: '100px'}}
            />

            <OptionsInput
                label={<FormattedMessage id={"dataType.fullName.lastName.label"}/>}
                value={options.lastName}
                onChange={(v) => handleOptionValueChange("lastName", v)}
                style={{width: '100px'}}
            />
        </>
    )
};