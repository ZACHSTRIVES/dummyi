// -------------------------------------------------------------------------------------------------------------
// types
import {isNullOrWhiteSpace} from "@/utils/stringUtils";
import {faker} from "@faker-js/faker";
import {ExportValueType} from "@/constants/enums";
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import React from "react";
import {OptionsSwitch} from "@/components/Utils/src/OptionsSwitch";
import {FormattedMessage} from "@/locale";
import {OptionsInput} from "@/components/Utils";

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
    const value = faker.internet.email(config);

    return {
        value: value,
        stringValue: value,
        type: ExportValueType.STRING
    }
}

// -------------------------------------------------------------------------------------------------------------
// options component
export const EmailGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, onOptionsChange} = props;
    const emailOptions: EmailGeneratorOptions = options;

    const handleOptionsChange = (changedFieldName: string, value: any) => {
        let newOptions = {...emailOptions, [changedFieldName]: value};
        onOptionsChange(newOptions);
    }

    return (
        <>
            <OptionsInput
                label={<FormattedMessage id="dataType.email.provider.label"/>}
                value={options.provider}
                onChange={(v) => {
                    handleOptionsChange('provider', v)
                }}
            />

            <OptionsSwitch
                label={<FormattedMessage id="dataType.email.allowSpecialCharacters.label"/>}
                value={options.allowSpecialCharacters}
                onChange={(v) => {
                    handleOptionsChange('allowSpecialCharacters', v)
                }}
                size={'large'}
            />

        </>
    )
}