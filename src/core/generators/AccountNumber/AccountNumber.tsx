import React from "react";
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {OptionsNumberInput} from "@/components/Utils";
import {FormattedMessage, useIntl} from "@/locale";
import {faker} from "@faker-js/faker";
import {isNullOrWhiteSpace} from "@/utils/stringUtils";

// -------------------------------------------------------------------------------------------------------------
// types
export interface AccountNumberGeneratorOptions {
    length: number
}

// -------------------------------------------------------------------------------------------------------------
// default options
export const AccountNumberGeneratorDefaultOptions: AccountNumberGeneratorOptions = {
    length: 12
}

// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: any): GenerateResult => {
    const {length} = options

    const value = faker.finance.accountNumber(length);
    return {
        value: value,
        stringValue: value
    };
}

// -------------------------------------------------------------------------------------------------------------
// options component
export const AccountNumberGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, handleOptionValueChange} = props as {
        options: AccountNumberGeneratorOptions,
        handleOptionValueChange: typeof props.handleOptionValueChange
    };

    const intl = useIntl();

    const [errorMessages, setErrorMessages] = React.useState({
        length: ''
    });

    React.useEffect(() => {
        const newErrorMessages = {...errorMessages};
        // length
        if (isNullOrWhiteSpace(options.length.toString())) {
            newErrorMessages.length = intl.formatMessage({id: 'dataType.number.min.errorMessage.empty'})
        }

        setErrorMessages(newErrorMessages);
    }, [options.length]);

    return (
        <div>
            <OptionsNumberInput
                label={<FormattedMessage id='dataType.accountnumber.length'/>}
                value={options.length}
                onChange={(v) => handleOptionValueChange('length', v)}
                style={{width: '65px'}}
                errorMessage={errorMessages.length}
                max={20}
                min={5}
            />
        </div>
    );
}