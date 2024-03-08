import React from "react";
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {faker} from "@faker-js/faker";
import {FormattedMessage} from "@/locale";
import {OptionsTagInput} from "@/components/Utils/src/OptionsTagInput";

// -------------------------------------------------------------------------------------------------------------
// types
export interface PhoneGeneratorOptions {
    formats: string[];
}

// -------------------------------------------------------------------------------------------------------------
// default options
export const PhoneGeneratorDefaultOptions: PhoneGeneratorOptions = {
    formats: ["+1-###-###-###", "(555) ###-####"]
}

// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: PhoneGeneratorOptions): GenerateResult => {
    let format = '';
    if (options.formats && options.formats.length != 0) {
        format = options.formats[faker.number.int({min: 0, max: options.formats.length - 1})];
    }
    const value = faker.phone.number(format);
    return {
        value: value,
        stringValue: value
    };
}

// -------------------------------------------------------------------------------------------------------------
// options component
export const PhoneGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, handleOptionValueChange} = props as {
        options: PhoneGeneratorOptions,
        handleOptionValueChange: typeof props.handleOptionValueChange
    };

    return (
        <div>
            <OptionsTagInput
                label={<FormattedMessage id={"dataType.phone.formats.label"}/>}
                infoTooltip={<FormattedMessage id={'dataType.phone.formats.tooltips'}/>}
                value={options.formats}
                onChange={(v) => handleOptionValueChange("formats", v)}
                style={{width: '350px'}}
            />
        </div>
    );
}