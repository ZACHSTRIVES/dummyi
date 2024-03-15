import React from "react";
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {faker} from "@faker-js/faker";
import {OptionsSelect, SelectOption} from "@/components/Utils";
import {FormattedMessage} from "@/locale";
import {Tag} from "@douyinfe/semi-ui";
import style from "@/core/generators/Boolean/Boolean.module.scss";
// -------------------------------------------------------------------------------------------------------------
// types

export enum SeparatorGeneratorFormat {
    COLON_FORMAT = ':',
    HYPEN_FORMAT = '-',
    NONE_FORMAT = ''
}
export interface MacAddressGeneratorOptions {
   
   format:SeparatorGeneratorFormat;


}

// -------------------------------------------------------------------------------------------------------------
// default options
export const MacAddressGeneratorDefaultOptions:MacAddressGeneratorOptions = {
    
    format : SeparatorGeneratorFormat.COLON_FORMAT,
}

// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: MacAddressGeneratorOptions): GenerateResult => {
    
    const value = faker.internet.mac(options.format);
    return {
        value: value,
        stringValue: value,
    };
}

// -------------------------------------------------------------------------------------------------------------
// options component
export const MacAddressGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, handleOptionValueChange} = props as {
        options: MacAddressGeneratorOptions,
        handleOptionValueChange: typeof props.handleOptionValueChange
    };

    
    
    
    return (
        <>
            <OptionsSelect
                label={<FormattedMessage id='dataType.macaddress'/>}
                selectOptions={SeparatorFormatSelectOptions}
                value={options.format}
                onChange={(v) => handleOptionValueChange("format", v)}
                style={{ width: '200px' }}
            />
        </>
    );
}

export const SeparatorFormatSelectOptions:SelectOption[] = [
    {
        label:
            <>
                :
            </>,
        value: SeparatorGeneratorFormat.COLON_FORMAT
    },
    { 
        label:
            <>
                -
            </>, 
        value: SeparatorGeneratorFormat.HYPEN_FORMAT 
    },
    { 
        label:
            <>
               &quot;&quot;
            </>,  
        value: SeparatorGeneratorFormat.NONE_FORMAT 
    },
]