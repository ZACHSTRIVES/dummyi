import React from "react";
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {OptionsSelect, SelectOption} from "@/components/Utils";
import {FormattedMessage} from "@/locale";
import {faker} from "@faker-js/faker";
// -------------------------------------------------------------------------------------------------------------
// types

export type IpType = 'IPv4' | 'IPv6'

export interface IpAddressGeneratorOptions {
    types: IpType[]
}


// -------------------------------------------------------------------------------------------------------------
// default options
export const IpAddressGeneratorDefaultOptions: IpAddressGeneratorOptions = {
    types: ["IPv4", "IPv6"]
}


// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: IpAddressGeneratorOptions): GenerateResult => {
    let value: string;

    if (options.types.length === 2) {
        value = faker.internet.ip();
    } else if (options.types.includes("IPv4")) {
        value = faker.internet.ipv4();
    } else if (options.types.includes("IPv6")){
        value = faker.internet.ipv6();
    }

    return {
        value: value,
        stringValue: value,
    };
}

// -------------------------------------------------------------------------------------------------------------
// options component
export const IpAddressGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, handleOptionValueChange} = props as {
        options: IpAddressGeneratorOptions,
        handleOptionValueChange: typeof props.handleOptionValueChange
    };

    return (
        <div>
            <OptionsSelect
                multiple
                maxTagCount={2}
                label={<FormattedMessage id='dataType.ipaddress.types'/>}
                selectOptions={IpTypeSelectOptions}
                value={options.types}
                onChange={(v) => handleOptionValueChange("types", v)}
                style={{width: '160px'}}
            />
        </div>
    );
}


export const IpTypeSelectOptions: SelectOption[] = [
    {label: "IPv4", value: "IPv4",},
    {label: "IPv6", value: "IPv6"}
]