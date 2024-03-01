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
    // precision:number;
    // min:number;
    // max:number;
}

export const ColorGeneratorDefaultOptions: ColorGeneratorOptions = {
    kind: ColorGeneratorKind.HUMAN,
    format: ColorGeneratorFormat.CSS_COLOR,
    // precision: 0.1,
    // min: 0,
    // max: 9999,
    
    
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

    // error validation
    // const [errorMessages, setErrorMessages] = React.useState({
    //     min: '',
    //     max: '',
    // });

    // React.useEffect(() => {
    //     const newErrorMessages = {...errorMessages};
    //     // min
    //     if (isNullOrWhiteSpace(numberOptions.min.toString())) {
    //         newErrorMessages.min = intl.formatMessage({id: 'dataType.number.min.errorMessage.empty'})
    //     } else if (numberOptions.min > numberOptions.max) {
    //         newErrorMessages.min = intl.formatMessage({id: 'dataType.number.min.errorMessage.greaterThanMax'})
    //     } else {
    //         newErrorMessages.min = '';
    //     }

    //     // max
    //     if (isNullOrWhiteSpace(numberOptions.max.toString())) {
    //         newErrorMessages.max = intl.formatMessage({id: 'dataType.number.max.errorMessage.empty'})
    //     } else if (numberOptions.max < numberOptions.min) {
    //         newErrorMessages.max = intl.formatMessage({id: 'dataType.number.max.errorMessage.lessThanMin'})
    //     } else {
    //         newErrorMessages.max = '';
    //     }

    //     setErrorMessages(newErrorMessages);
    // }, [numberOptions.min, numberOptions.max]);

    return (
        <>
            <OptionsSelect
                label={<FormattedMessage id='dataType.number.kind.label'/>}
                selectOptions={kindSelectOptions}
                value={colorOptions.kind}
                onChange={(v) => handleOptionsChange('kind', v)}
                style={{width: '100px'}}
            />


            {/* {numberOptions.kind === NumberGeneratorKind.FLOAT && <OptionsSelect
                label={<FormattedMessage id='dataType.number.precision.label'/>}
                selectOptions={precisionSelectOptions}
                value={numberOptions.precision}
                onChange={(v) => handleOptionsChange('precision', v)}
            />} */}

            {/* <div className='flex'>
                <OptionsNumberInput
                    label={<FormattedMessage id='dataType.number.min.label'/>}
                    value={numberOptions.min}
                    onChange={(v) => handleOptionsChange('min', v)}
                    style={{width: '120px'}}
                    errorMessage={errorMessages.min}
                />
                <OptionsNumberInput
                    label={<FormattedMessage id='dataType.number.max.label'/>}
                    value={numberOptions.max}
                    onChange={(v) => handleOptionsChange('max', v)}
                    style={{width: '120px'}}
                    errorMessage={errorMessages.max}
                />
            </div> */}
        </>
    )
};
// const kindSelectOptions: SelectOption[] = Object.values(NumberGeneratorKind).map((kind) => ({
//     value: kind,
//     label: kind,
// }));

// export const generate = (options:any):GenerateResult =>{
//     const value = faker.color.rgb();
//     return {
//         value:value,
//         stringValue:value,
//         type:ExportValueType.STRING
//     }
// }
// -------------------------------------------------------------------------------------------------------------
// types
// rgb #ff0000 human 'red'
// export enum ColorGeneratorKind {
//     HUMAN = "HUMAN",

// }

// export interface ColorGeneratorOptions {
//  // TODO: add your own options type here   
// }

// // -------------------------------------------------------------------------------------------------------------
// // default options
// export const ColorGeneratorDefaultOptions:ColorGeneratorOptions = {
//     // TODO: add your own default options here
// }

// // -------------------------------------------------------------------------------------------------------------
// // generate method
// export const generate = (options: any): GenerateResult => {
//     // TODO: implement your own generate method here
   
//     return {
//         value: 'NOT IMPLEMENTED',
//         stringValue: 'NOT IMPLEMENTED',
//         type: ExportValueType.STRING
//     };
// }

// // -------------------------------------------------------------------------------------------------------------
// // options component
// export const ColorGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
//     const {options, onOptionsChange} = props;
    
//     const handleOptionsChange = (changedFieldName: string, value: any) => {
//         let newOptions = {...options, [changedFieldName]: value};
//         onOptionsChange(newOptions);
//     };
    
//     // TODO: implement your own options component here
//     return (
//         <div>
//             dasdaskjldabsj
//         </div>
//     );
// }

const kindSelectOptions: SelectOption[] = Object.values(ColorGeneratorKind).map((kind) => ({
    value: kind,
    label: kind,
}));