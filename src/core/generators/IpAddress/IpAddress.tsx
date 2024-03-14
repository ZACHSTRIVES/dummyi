import React from "react";
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {OptionsSelect, SelectOption} from "@/components/Utils";
import {FormattedMessage} from "@/locale";
import {faker} from "@faker-js/faker";
// -------------------------------------------------------------------------------------------------------------
// types

export type IpType = 
    | 'ip'
    | 'ip4'
    | 'ip6'
export interface IpAddressGeneratorOptions {
   type:IpType[]   
}



// -------------------------------------------------------------------------------------------------------------
// default options
export const IpAddressGeneratorDefaultOptions:IpAddressGeneratorOptions = {
    type: ['ip', 'ip4', 'ip6']
}



// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: any): GenerateResult => {
  

    let ips: string[] = [];
    options.type.forEach((type) => {
        switch (type) {
            case 'ip4':
                ips.push(faker.internet.ip());
                break;
            case 'ip6':
                ips.push(faker.internet.ipv6());
                break;
            case 'ip':
                ips.push(Math.random() < 0.5 ? faker.internet.ip() : faker.internet.ipv6());
                break;
            default:
                break;
        }
    });

    // Joining the IP addresses with a newline character to ensure each is on its own line
    const stringValue = ips.join('\n');

    return {
        value: ips, // This is now an array of IPs, one per selected type
        stringValue: stringValue, // IPs separated by newline for display
    };
}

// -------------------------------------------------------------------------------------------------------------
// options component
export const IpAddressGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, handleOptionValueChange} = props as {
        options: IpAddressGeneratorOptions,
        handleOptionValueChange: typeof props.handleOptionValueChange
    };
    
    // TODO: implement your own options component here
    return (
        <div>
            <OptionsSelect
                multiple
                maxTagCount={2}
                label={<FormattedMessage id='dataType.ipaddress.type'/>}
                selectOptions={IpTypeSelectOptions}
                value={options.type}
                onChange={(v) => handleOptionValueChange("type", v)}
                style={{width: '200px'}}
            />
        </div>
    );
}


export const IpTypeSelectOptions: SelectOption[] = [
    {
        label: <FormattedMessage id={"dataType.ipaddress.type.ip"}/>,
        value: "ip",
    },
    {
        label: <FormattedMessage id={"dataType.ipaddress.type.ip4"}/>,
        value: "ip4"
    },
    {
        label: <FormattedMessage id={"dataType.ipaddress.type.ip6"}/>,
        value: "ip6"
    }
]