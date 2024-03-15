import React from "react";
import { GenerateResult, GeneratorOptionsComponentInterface } from "@/types/generator";
import { faker } from "@faker-js/faker";
import { OptionsSelect, SelectOption } from "@/components/Utils";
import { FormattedMessage } from "@/locale";
// -------------------------------------------------------------------------------------------------------------
// types

export enum MacAddressGeneratorSeparator {
    COLON_FORMAT = ':',
    HYPEN_FORMAT = '-',
    NONE_FORMAT = ''
}
export interface MacAddressGeneratorOptions {

    separator: MacAddressGeneratorSeparator;//separator


}

// -------------------------------------------------------------------------------------------------------------
// default options
export const MacAddressGeneratorDefaultOptions: MacAddressGeneratorOptions = {

    separator: MacAddressGeneratorSeparator.COLON_FORMAT,
}

// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: MacAddressGeneratorOptions): GenerateResult => {

    const value = faker.internet.mac(options.separator);
    return {
        value: value,
        stringValue: value,
    };
}

// -------------------------------------------------------------------------------------------------------------
// options component
export const MacAddressGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({ ...props }) => {
    const { options, handleOptionValueChange } = props as {
        options: MacAddressGeneratorOptions,
        handleOptionValueChange: typeof props.handleOptionValueChange
    };




    return (
        <>
            <OptionsSelect
                label={<FormattedMessage id='dataType.macaddress.format' />}
                selectOptions={SeparatorFormatSelectOptions}
                value={options.separator}
                onChange={(v) => handleOptionValueChange("format", v)}
                style={{ width: '80px' }}
            />
        </>
    );
}

export const SeparatorFormatSelectOptions: SelectOption[] = [
    {
        label:
            <>
                &quot; : &quot;
            </>,
        value: MacAddressGeneratorSeparator.COLON_FORMAT
    },
    {
        label:
            <>
                &quot; - &quot;
            </>,
        value: MacAddressGeneratorSeparator.HYPEN_FORMAT
    },
    {
        label:
            <>
                &quot;&quot;
            </>,
        value: MacAddressGeneratorSeparator.NONE_FORMAT
    },
]