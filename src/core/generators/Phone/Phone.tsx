import React from "react";
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {ExportValueType} from "@/constants/enums";
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
        stringValue: value,
        type: ExportValueType.STRING
    };
}

// -------------------------------------------------------------------------------------------------------------
// options component
export const PhoneGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, onOptionsChange} = props;

    const handleOptionsChange = (changedFieldName: string, value: any) => {
        let newOptions = {...options, [changedFieldName]: value};
        onOptionsChange(newOptions);
    };

    // TODO: implement your own options component here
    return (
        <div>
            <OptionsTagInput
                label={<FormattedMessage id={"dataType.phone.formats.label"}/>}
                infoTooltip={<FormattedMessage id={'dataType.phone.formats.tooltips'}/>}
                value={options.formats}
                onChange={(v) => handleOptionsChange("formats", v)}
                style={{width: '350px'}}
            />
        </div>
    );
}