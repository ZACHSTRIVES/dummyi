import {isNullOrWhiteSpace} from "@/utils/stringUtils";
import {faker} from "@faker-js/faker";
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import React from "react";
import {OptionsSwitch} from "@/components/Utils/src/OptionsSwitch";
import {FormattedMessage} from "@/locale";
import {OptionsInput} from "@/components/Utils";


// -------------------------------------------------------------------------------------------------------------
// types
export interface EmailGeneratorOptions {
    allowSpecialCharacters: boolean;
    provider: string;
}

export const EmailGeneratorDefaultOptions: EmailGeneratorOptions = {
    allowSpecialCharacters: false,
    provider: ''
}

// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: any): GenerateResult => {
    const {allowSpecialCharacters, provider} = options;
    const config = {}
    if (allowSpecialCharacters) {
        config['allowSpecialCharacters'] = true;
    }
    if (!isNullOrWhiteSpace(provider)) {
        config['provider'] = provider;
    }
    const value = faker.internet.email(config).toLowerCase();

    return {
        value: value,
        stringValue: value,
    }
}

// -------------------------------------------------------------------------------------------------------------
// options component
export const EmailGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, handleOptionValueChange} = props as {
        options: EmailGeneratorOptions,
        handleOptionValueChange: typeof props.handleOptionValueChange
    };

    return (
        <>
            <OptionsInput
                label={<FormattedMessage id="dataType.email.provider.label"/>}
                value={options.provider}
                onChange={(v) => {
                    handleOptionValueChange('provider', v)
                }}
            />

            <OptionsSwitch
                label={<FormattedMessage id="dataType.email.allowSpecialCharacters.label"/>}
                value={options.allowSpecialCharacters}
                onChange={(v) => {
                    handleOptionValueChange('allowSpecialCharacters', v)
                }}
                size={'large'}
            />

        </>
    )
}