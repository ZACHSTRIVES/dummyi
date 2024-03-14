import React from "react";
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {OptionsSwitch} from "@/components/Utils/src/OptionsSwitch";
import {FormattedMessage} from "@/locale";
import {faker} from "@faker-js/faker";

// -------------------------------------------------------------------------------------------------------------
// types
export interface MonthGeneratorOptions {
    abbreviated: boolean;
}

// -------------------------------------------------------------------------------------------------------------
// default options
export const MonthGeneratorDefaultOptions: MonthGeneratorOptions = {
    abbreviated: false
}

// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: MonthGeneratorOptions): GenerateResult => {
    const {abbreviated} = options;
    const value = faker.date.month({abbreviated:abbreviated})
    return {
        value: value,
        stringValue: value
    };
}

// -------------------------------------------------------------------------------------------------------------
// options component
export const MonthGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, handleOptionValueChange} = props as {
        options: MonthGeneratorOptions,
        handleOptionValueChange: typeof props.handleOptionValueChange
    };

    // TODO: implement your own options component here
    return (
        <>
            <OptionsSwitch
                label={<FormattedMessage id='dataType.month.abbreviated'/>}
                value={options.abbreviated}
                onChange={(v) => handleOptionValueChange("abbreviated", v)}
            />

        </>
    );
}