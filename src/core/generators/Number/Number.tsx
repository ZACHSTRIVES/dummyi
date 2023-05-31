import React from 'react';
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {FormattedMessage} from "@/locale";
import {InputNumber, Select} from "@douyinfe/semi-ui";
import {InfoTooltip} from "@/components/Utils";
import {faker} from "@faker-js/faker";
import {ExportValueType} from "@/constants/enums";

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
    const fakerOptions = min && max ? {min: min, max: max} : {min: 0, max: 9999};
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

    const handleOptionsChange = (changedFieldName: string, value: any) => {
        let newOptions = {...numberOptions, [changedFieldName]: value};
        onOptionsChange(newOptions);
    }

    return (
        <>
            <div className="generatorConfig_column">
                <div className='generatorConfig_column__label'>
                    <FormattedMessage id='dataType.number.kind.label'/>
                </div>
                <Select value={numberOptions.kind}
                        onChange={(value) => handleOptionsChange("kind", value)}>
                    {Object.values(NumberGeneratorKind).map((kind, index) => {
                        return (
                            <Select.Option key={index} value={kind}>
                                {kind}
                            </Select.Option>
                        )
                    })}
                </Select>
            </div>

            {numberOptions.kind === NumberGeneratorKind.FLOAT && <div className="generatorConfig_column">
                <div className='generatorConfig_column__label'>
                    <FormattedMessage id='dataType.number.precision.label'/>
                </div>
                <Select value={numberOptions.precision}
                        onChange={(value) => handleOptionsChange("precision", value)}>
                    <Select.Option value={0.1}>0.1</Select.Option>
                    <Select.Option value={0.01}>0.01</Select.Option>
                    <Select.Option value={0.001}>0.001</Select.Option>
                    <Select.Option value={0.0001}>0.0001</Select.Option>
                </Select>
            </div>}

            <div className='flex'>
                <div className="generatorConfig_column">
                    <div className='generatorConfig_column__label'>
                        <FormattedMessage id='dataType.number.min.label'/>
                        <InfoTooltip>
                            <FormattedMessage id='dataType.number.min.tooltip'/>
                        </InfoTooltip>
                    </div>
                    <InputNumber
                        onChange={(value) => handleOptionsChange("min", value)}
                        value={numberOptions.min}
                        style={{width: '120px'}}
                    />
                </div>

                <div className="generatorConfig_column">
                    <div className='generatorConfig_column__label'>
                        <FormattedMessage id='dataType.number.max.label'/>
                        <InfoTooltip>
                            <FormattedMessage id='dataType.number.max.tooltip'/>
                        </InfoTooltip>
                    </div>
                    <InputNumber
                        onChange={(value) => handleOptionsChange("max", value)}
                        value={numberOptions.max}
                        style={{width: '120px'}}
                    />
                </div>
            </div>
        </>
    )
};
