import React from 'react';
import {GenerateRequest, GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {OptionsInput, OptionsSelect, SelectOption} from "@/components/Utils";
import {FormattedMessage} from "@/locale";
import {ExportValueType, Sex} from "@/constants/enums";
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
        type: ExportValueType.STRING
    }
}

// -------------------------------------------------------------------------------------------------------------
// options component

export const FullNameGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, onOptionsChange} = props;
    const fullNameOptions: FullNameGeneratorOptions = options;

    const handleOptionsChange = (changedFieldName: string, value: any) => {
        let newOptions = {...fullNameOptions, [changedFieldName]: value};
        onOptionsChange(newOptions);
    }

    return (
        <>
            <OptionsSelect
                label={<FormattedMessage id={"dataType.fullName.sex.label"}/>}
                selectOptions={SexSelectOptions}
                value={fullNameOptions.sex}
                style={{width: '150px'}}
                onChange={(v) => handleOptionsChange("sex", v)}/>

            <OptionsInput
                label={<FormattedMessage id={"dataType.fullName.firstName.label"}/>}
                value={fullNameOptions.firstName}
                onChange={(v) => handleOptionsChange("firstName", v)}
                style={{width: '100px'}}
            />

            <OptionsInput
                label={<FormattedMessage id={"dataType.fullName.lastName.label"}/>}
                value={fullNameOptions.lastName}
                onChange={(v) => handleOptionsChange("lastName", v)}
                style={{width: '100px'}}
            />
        </>
    )
};