import React from "react";
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {ExportValueType} from "@/constants/enums";
import {faker} from "@faker-js/faker";
import {OptionsNumberInput, OptionsSelect, SelectOption} from "@/components/Utils";
import {FormattedMessage, useIntl} from "@/locale";


export enum ColorGeneratorFormat {
    BINARY_COLOR = "BINARY_COLOR",
    CSS_COLOR = "CSS_COLOR",
    DECIMAL_COLOR = "DECIMAL_COLOR",
}

export enum ColorGeneratorKind {
    HUMAN = "HUMAN",
    RGB = "RGB",
    HSL = "HSL",
}
export interface ColorGeneratorOptions {
    kind: ColorGeneratorKind;
    format: ColorGeneratorFormat;
    
}

export const ColorGeneratorDefaultOptions: ColorGeneratorOptions = {
    kind: ColorGeneratorKind.HUMAN,
    format: ColorGeneratorFormat.CSS_COLOR,
    
    
    
};


export const generate = (options): GenerateResult =>{
    const { format,kind} = options;
    const fakerOptions = { format:ColorGeneratorFormat.CSS_COLOR };
    let result: any;
    
    switch (kind) {
        case ColorGeneratorKind.HSL:
            result = faker.color.hsl();
            break;
        case ColorGeneratorKind.HUMAN:
            result = faker.color.human();
            break;
        case ColorGeneratorKind.RGB:
            result = faker.color.rgb();
            break;
            
    }
    return {
        value:result,
        stringValue:result.toString(),
        type:kind === ColorGeneratorKind.HSL || ColorGeneratorKind.HUMAN || ColorGeneratorKind.RGB ? ExportValueType.STRING : ExportValueType.NULL
    }

}

export const ColorGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, onOptionsChange} = props;
    const colorOptions: ColorGeneratorOptions = options;
    const intl = useIntl();

    const handleOptionsChange = (changedFieldName: string, value: any) => {
        let newOptions = {...colorOptions, [changedFieldName]: value};
        onOptionsChange(newOptions);
    }

    

    return (
        <>
            <OptionsSelect
                label={<FormattedMessage id='dataType.number.kind.label'/>}
                selectOptions={kindSelectOptions}
                value={colorOptions.kind}
                onChange={(v) => handleOptionsChange('kind', v)}
                style={{width: '100px'}}
            />


            
        </>
    )
};


const kindSelectOptions: SelectOption[] = Object.values(ColorGeneratorKind).map((kind) => ({
    value: kind,
    label: kind,
}));