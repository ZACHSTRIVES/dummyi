import React from "react";
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {OptionsSwitch} from "@/components/Utils/src/OptionsSwitch";
import {FormattedMessage} from "@/locale";
import {faker} from "@faker-js/faker";

// -------------------------------------------------------------------------------------------------------------
// types
export interface WeekdayGeneratorOptions {
    abbreviated: boolean;
}

// -------------------------------------------------------------------------------------------------------------
// default options
export const WeekdayGeneratorDefaultOptions: WeekdayGeneratorOptions = {
    abbreviated: false
}

// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: WeekdayGeneratorOptions): GenerateResult => {
    const {abbreviated} = options;
    const value = faker.date.weekday({abbreviated: abbreviated})
    return {
        value: value,
        stringValue: value
    };
}

// -------------------------------------------------------------------------------------------------------------
// options component
export const WeekdayGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, handleOptionValueChange} = props as {
        options: WeekdayGeneratorOptions,
        handleOptionValueChange: typeof props.handleOptionValueChange
    };

    return (
        <>
            <OptionsSwitch
                label={<FormattedMessage id='dataType.weekday.abbreviated'/>}
                value={options.abbreviated}
                onChange={(v) => handleOptionValueChange("abbreviated", v)}
            />
        </>
    );
}