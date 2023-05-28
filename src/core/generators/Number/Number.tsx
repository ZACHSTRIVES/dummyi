import React from 'react';
import {GenerateRequest, GeneratorOptionsComponentInterface} from "@/types/generator";
import {FormattedMessage} from "@/locale";
import {InputNumber, Select} from "@douyinfe/semi-ui";
import {NumberGeneratorKind, NumberGeneratorOptions} from "@/core/generators/Number/Number.d";
import {InfoTooltip} from "@/components/Utils";

export const generate = (request: GenerateRequest): string => {
    return 'Hello World';
}

export const NumberGeneratorDefaultOptions: NumberGeneratorOptions = {
    kind: NumberGeneratorKind.INTEGER,
    precision: 0.1,
    min: null,
    max: null,
}

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
