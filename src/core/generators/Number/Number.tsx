import React from 'react';
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {FormattedMessage, useIntl} from "@/locale";
import {OptionsNumberInput, OptionsSelect, SelectOption} from "@/components/Utils";
import {faker} from "@faker-js/faker";
import {ExportValueType} from "@/constants/enums";
import {isNullOrWhiteSpace} from "@/utils/stringUtils";

// -------------------------------------------------------------------------------------------------------------
// types

export enum NumberGeneratorKind {
    BIGINT = "BIGINT",
    BINARY = "BINARY",
    FLOAT = "FLOAT",
    HEX = "HEX",
    INTEGER = "INT",
    OCTAL = "OCTAL",
}

export interface NumberGeneratorOptions {
    kind: NumberGeneratorKind;
    precision: number;
    min: number;
    max: number;
}

export const NumberGeneratorDefaultOptions: NumberGeneratorOptions = {
    kind: NumberGeneratorKind.INTEGER,
    precision: 0.1,
    min: 0,
    max: 9999,
}

// -------------------------------------------------------------------------------------------------------------
// generate method

export const generate = (options): GenerateResult => {
    const {kind, precision, min, max} = options;
    const fakerOptions = {min: min, max: max};
    let result: any;

    switch (kind) {
        case NumberGeneratorKind.BIGINT:
            result = faker.number.bigInt(fakerOptions);
            break;
        case NumberGeneratorKind.BINARY:
            result = faker.number.binary(fakerOptions);
            break;
        case NumberGeneratorKind.FLOAT:
            result = faker.number.float({...fakerOptions, precision});
            break;
        case NumberGeneratorKind.HEX:
            result = faker.number.hex(fakerOptions);
            break;
        case NumberGeneratorKind.INTEGER:
            result = faker.number.int(fakerOptions);
            break;
        case NumberGeneratorKind.OCTAL:
            result = faker.number.octal(fakerOptions);
            break;
    }
    return {
        value: result,
        stringValue: result.toString(),
        type: kind === NumberGeneratorKind.BINARY || kind === NumberGeneratorKind.OCTAL || kind === NumberGeneratorKind.HEX ? ExportValueType.STRING : ExportValueType.NUMBER
    };
}

// -------------------------------------------------------------------------------------------------------------
// options component

export const NumberGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, onOptionsChange} = props;
    const numberOptions: NumberGeneratorOptions = options;
    const intl = useIntl();

    const handleOptionsChange = (changedFieldName: string, value: any) => {
        let newOptions = {...numberOptions, [changedFieldName]: value};
        onOptionsChange(newOptions);
    }

    // error validation
    const [errorMessages, setErrorMessages] = React.useState({
        min: '',
        max: '',
    });

    React.useEffect(() => {
        const newErrorMessages = {...errorMessages};
        // min
        if (isNullOrWhiteSpace(numberOptions.min.toString())) {
            newErrorMessages.min = intl.formatMessage({id: 'dataType.number.min.errorMessage.empty'})
        } else if (numberOptions.min > numberOptions.max) {
            newErrorMessages.min = intl.formatMessage({id: 'dataType.number.min.errorMessage.greaterThanMax'})
        } else {
            newErrorMessages.min = '';
        }

        // max
        if (isNullOrWhiteSpace(numberOptions.max.toString())) {
            newErrorMessages.max = intl.formatMessage({id: 'dataType.number.max.errorMessage.empty'})
        } else if (numberOptions.max < numberOptions.min) {
            newErrorMessages.max = intl.formatMessage({id: 'dataType.number.max.errorMessage.lessThanMin'})
        } else {
            newErrorMessages.max = '';
        }

        setErrorMessages(newErrorMessages);
    }, [numberOptions.min, numberOptions.max]);

    return (
        <>
            <OptionsSelect
                label={<FormattedMessage id='dataType.number.kind.label'/>}
                selectOptions={kindSelectOptions}
                value={numberOptions.kind}
                onChange={(v) => handleOptionsChange('kind', v)}
                style={{width: '100px'}}
            />

            {numberOptions.kind === NumberGeneratorKind.FLOAT && <OptionsSelect
                label={<FormattedMessage id='dataType.number.precision.label'/>}
                selectOptions={precisionSelectOptions}
                value={numberOptions.precision}
                onChange={(v) => handleOptionsChange('precision', v)}
            />}

            <div className='flex'>
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
            </div>
        </>
    )
};

const precisionSelectOptions: SelectOption[] = [
    {value: 0.1, label: "0.1"},
    {value: 0.01, label: "0.01"},
    {value: 0.001, label: "0.001"},
    {value: 0.0001, label: "0.0001"},
]

const kindSelectOptions: SelectOption[] = Object.values(NumberGeneratorKind).map((kind) => ({
    value: kind,
    label: kind,
}));
