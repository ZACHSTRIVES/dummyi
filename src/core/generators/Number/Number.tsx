import React from 'react';
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {FormattedMessage, useIntl} from "@/locale";
import {OptionsNumberInput, OptionsSelect, SelectOption} from "@/components/Utils";
import {faker} from "@faker-js/faker";
import {ValueType} from "@/constants/enums";
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

const kindToValueTypeMap = {
    [NumberGeneratorKind.INTEGER]: ValueType.INT,
    [NumberGeneratorKind.BINARY]: ValueType.INT,
    [NumberGeneratorKind.HEX]: ValueType.STRING,
    [NumberGeneratorKind.BIGINT]: ValueType.BIGINT,
    [NumberGeneratorKind.FLOAT]: ValueType.DOUBLE,
    [NumberGeneratorKind.OCTAL]: ValueType.STRING,
};

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
    };
}

// -------------------------------------------------------------------------------------------------------------
// options component

export const NumberGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, handleOptionValueChange} = props as {
        options: NumberGeneratorOptions,
        handleOptionValueChange: typeof props.handleOptionValueChange
    };

    const intl = useIntl();

    // error validation
    const [errorMessages, setErrorMessages] = React.useState({
        min: '',
        max: '',
    });

    React.useEffect(() => {
        const newErrorMessages = {...errorMessages};
        // min
        if (isNullOrWhiteSpace(options.min.toString())) {
            newErrorMessages.min = intl.formatMessage({id: 'dataType.number.min.errorMessage.empty'})
        } else if (options.min > options.max) {
            newErrorMessages.min = intl.formatMessage({id: 'dataType.number.min.errorMessage.greaterThanMax'})
        } else {
            newErrorMessages.min = '';
        }

        // max
        if (isNullOrWhiteSpace(options.max.toString())) {
            newErrorMessages.max = intl.formatMessage({id: 'dataType.number.max.errorMessage.empty'})
        } else if (options.max < options.min) {
            newErrorMessages.max = intl.formatMessage({id: 'dataType.number.max.errorMessage.lessThanMin'})
        } else {
            newErrorMessages.max = '';
        }

        setErrorMessages(newErrorMessages);
    }, [options.min, options.max]);


    const handleKindChange = (kind: NumberGeneratorKind) => {
        const valueType = kindToValueTypeMap[kind];
        if (valueType) {
            handleOptionValueChange("kind", kind, valueType);
        }
    };

    return (
        <>
            <OptionsSelect
                label={<FormattedMessage id='dataType.number.kind.label'/>}
                selectOptions={kindSelectOptions}
                value={options.kind}
                onChange={(v) => handleKindChange(v)}
                style={{width: '100px'}}
            />

            {options.kind === NumberGeneratorKind.FLOAT && <OptionsSelect
                label={<FormattedMessage id='dataType.number.precision.label'/>}
                selectOptions={precisionSelectOptions}
                value={options.precision}
                onChange={(v) => handleOptionValueChange('precision', v)}
            />}

            <div className='flex'>
                <OptionsNumberInput
                    label={<FormattedMessage id='dataType.number.min.label'/>}
                    value={options.min}
                    onChange={(v) => handleOptionValueChange('min', v)}
                    style={{width: '120px'}}
                    errorMessage={errorMessages.min}
                    min={-2147483647}
                    max={2147483647}
                />
                <OptionsNumberInput
                    label={<FormattedMessage id='dataType.number.max.label'/>}
                    value={options.max}
                    onChange={(v) => handleOptionValueChange('max', v)}
                    style={{width: '120px'}}
                    errorMessage={errorMessages.max}
                    max={2147483647}
                    min={-2147483647}
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
