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
   // TODO: add your own option types here 
   format:SeparatorGeneratorFormat;


}

// -------------------------------------------------------------------------------------------------------------
// default options
export const MacAddressGeneratorDefaultOptions:MacAddressGeneratorOptions = {
    // TODO: add your own default options here
    format : SeparatorGeneratorFormat.COLON_FORMAT,
}

// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: MacAddressGeneratorOptions): GenerateResult => {
    // TODO: implement your own generate method here
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

    
    
    // TODO: implement your own options component here
    return (
        <>
            <OptionsSelect
                label={<FormattedMessage id='dataType.macAddress.format'/>}
                selectOptions={SeparatorFormatSelectOptions}
                value={options.format}
                onChange={(newFormat) => handleOptionValueChange("format", newFormat)}
                style={{ width: '200px' }}
            />
        </>
    );
}

export const SeparatorFormatSelectOptions:SelectOption[] = [
    {
        label:
            <>
                <Tag type={'light'}
                     className={style.formatSelectOption}>:</Tag>
                <FormattedMessage id={`dataType.macaddress.format.colon`}/>
            </>,
        value: SeparatorGeneratorFormat.COLON_FORMAT
    },
    { 
        label:
            <>
                <Tag type={'light'}
                     className={style.formatSelectOption}>-</Tag>
                <FormattedMessage id={`dataType.macaddress.format.dash`}/>
            </>, 
        value: SeparatorGeneratorFormat.HYPEN_FORMAT 
    },
    { 
        label:
            <>
                <Tag type={'light'}
                     className={style.formatSelectOption}>""</Tag>
                <FormattedMessage id={`dataType.macaddress.format.space`}/>
            </>,  
        value: SeparatorGeneratorFormat.NONE_FORMAT 
    },
]