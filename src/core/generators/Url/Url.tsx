import React from "react";
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {faker} from "@faker-js/faker";
import {Tag} from "@douyinfe/semi-ui";
import {OptionsSelect, SelectOption} from "@/components/Utils";
import {FormattedMessage} from "@/locale";
import style from '../Boolean/Boolean.module.scss';
import {OptionsSwitch} from "@/components/Utils/src/OptionsSwitch";

// -------------------------------------------------------------------------------------------------------------
// types
type HTTPProtocolType = 'http' | 'https';
export enum ProtocolGeneratorFormat{
    HTTP_PROTOCOL = 'http',
    HTTPS_PROTOCOL = 'https'
}
export interface UrlGeneratorOptions {
     appendSlash: boolean;
     protocol:HTTPProtocolType;
}

// -------------------------------------------------------------------------------------------------------------
// default options
export const UrlGeneratorDefaultOptions:UrlGeneratorOptions = {
    appendSlash:false,
    protocol:ProtocolGeneratorFormat.HTTPS_PROTOCOL

}

// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: any): GenerateResult => {
    // TODO: implement your own generate method here
    const { appendSlash, protocol } = options;
    const domain = faker.internet.domainName();
    // Construct URL
    let value = `${protocol}://${domain}`;
    if (appendSlash) {
        value += '/';
    }
    //return random http or https
    return {
        value: value,
        stringValue: value,
    }
   
}

// -------------------------------------------------------------------------------------------------------------
// options component
export const UrlGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, handleOptionValueChange} = props as {
        options: UrlGeneratorOptions,
        handleOptionValueChange: typeof props.handleOptionValueChange
    };
    const handleFormatChange = (format: ProtocolGeneratorFormat) => {
        handleOptionValueChange("protocol", format);
    }
    

    
    return (
        <>
            

            <OptionsSwitch
                label={<FormattedMessage id="dataType.url.appendSlash.label" />}
                value={options.appendSlash}
                onChange={(v) => {
                    handleOptionValueChange('appendSlash', v);
                }}
                size={'large'}
            />

            
            <OptionsSelect
                label={<FormattedMessage id="dataType.url.protocol.label" />}
                selectOptions={protocolOptions}
                value={options.protocol}
                onChange={handleFormatChange} // This directly passes the selected value to handleFormatChange
                style={{ width: '210px' }}
/>
        </>
    );
}

const protocolOptions: SelectOption[] = [
    {
        value:ProtocolGeneratorFormat.HTTPS_PROTOCOL,
        label: <>https</>
    },
    {
        value:ProtocolGeneratorFormat.HTTP_PROTOCOL,
        label: <>http</>
    }
]