import React from "react";
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {faker} from "@faker-js/faker";
import {OptionsSelect, SelectOption} from "@/components/Utils";
import {FormattedMessage} from "@/locale";
import {OptionsSwitch} from "@/components/Utils/src/OptionsSwitch";
// -------------------------------------------------------------------------------------------------------------
// types
type HTTPProtocolType = 'http' | 'https';
export interface UrlGeneratorOptions {
     appendSlash: boolean;
     protocol:HTTPProtocolType;
}

// -------------------------------------------------------------------------------------------------------------
// default options
export const UrlGeneratorDefaultOptions:UrlGeneratorOptions = {
    appendSlash:false,
    protocol:'https'

}

// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: any): GenerateResult => {
    // TODO: implement your own generate method here
    const { appendSlash, protocol } = options;
    const domain = faker.internet.domainName();
    // Construct URL
    let url = `${protocol}://${domain}`;
    if (appendSlash) {
        url += '/';
    }
    //return random http or https
    return {
        value: url,
        stringValue: `'${url}'`,
    }
   
}

// -------------------------------------------------------------------------------------------------------------
// options component
export const UrlGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, handleOptionValueChange} = props as {
        options: UrlGeneratorOptions,
        handleOptionValueChange: typeof props.handleOptionValueChange
    };

    
    const handleProtocolToggle = () => {
        handleOptionValueChange('protocol', options.protocol === 'http' ? 'https' : 'http');
    };

    
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

            <OptionsSwitch
                label={<FormattedMessage id="dataType.url.protocol.label" />}
                value={options.protocol === 'https'}
                onChange={handleProtocolToggle}
                size={'large'}
            />

        </>
    );
}