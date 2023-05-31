import React from 'react';
import {GenerateRequest, GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {FormattedMessage} from "@/locale";
import {InputNumber, Select, Tag} from "@douyinfe/semi-ui";
import {InfoTooltip} from "@/components/Utils";
import {useSelector} from "react-redux";
import {selectColorMode} from "@/reducers/app/appSelectors";
import {faker} from "@faker-js/faker";
import {ExportValueType} from "@/constants/enums";

// -------------------------------------------------------------------------------------------------------------
// types
export enum BooleanGenerateFormat {
    TRUE_FALSE_BOOLEAN = "TRUE_FALSE_BOOLEAN",
    ONE_ZERO_NUMBER = "ONE_ZERO_NUMBER",
    TRUE_FALSE_STRING = 'TRUE_FALSE_STRING',
    YES_NO_STRING = 'YES_NO_STRING'
}

export interface BooleanGeneratorOptions {
    truePercentage: number;
    format: BooleanGenerateFormat;
}

export const BooleanGeneratorDefaultOptions: BooleanGeneratorOptions = {
    truePercentage: 50,
    format: BooleanGenerateFormat.TRUE_FALSE_BOOLEAN
}

// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: any): GenerateResult => {
    const {truePercentage, format} = options;
    let truePercentageRate = truePercentage / 100;
    const result = faker.datatype.boolean(truePercentageRate);
    switch (format) {
        case BooleanGenerateFormat.TRUE_FALSE_BOOLEAN:
            return {
                value: result,
                stringValue: result ? 'true' : 'false',
                type: ExportValueType.BOOLEAN
            };
        case BooleanGenerateFormat.ONE_ZERO_NUMBER:
            return {
                value: result ? 1 : 0,
                stringValue: result ? '1' : '0',
                type: ExportValueType.NUMBER
            };
        case BooleanGenerateFormat.TRUE_FALSE_STRING:
            return {
                value: result ? 'true' : 'false',
                stringValue: result ? 'true' : 'false',
                type: ExportValueType.STRING
            };
        case BooleanGenerateFormat.YES_NO_STRING:
            return {
                value: result ? 'Yes' : 'No',
                stringValue: result ? 'Yes' : 'No',
                type: ExportValueType.STRING
            };
    }
}

// -------------------------------------------------------------------------------------------------------------
// options component
export const BooleanGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, onOptionsChange} = props;
    const booleanOptions: BooleanGeneratorOptions = options;
    // store
    const colorMode = useSelector(selectColorMode)

    const handleOptionsChange = (changedFieldName: string, value: any) => {
        let newOptions = {...booleanOptions, [changedFieldName]: value};
        onOptionsChange(newOptions);
    }

    return (
        <>
            <div className="generatorConfig_column">
                <div className='generatorConfig_column__label'>
                    <FormattedMessage id='dataType.boolean.true.label'/>
                    <InfoTooltip>
                        <FormattedMessage id='dataType.boolean.true.tooltip'/>
                    </InfoTooltip>
                </div>
                <InputNumber
                    value={booleanOptions.truePercentage}
                    onChange={(value) => handleOptionsChange("truePercentage", value)}
                    style={{width: '100px'}}
                    min={0}
                    max={100}
                    suffix={"%"}
                />
            </div>

            <div className="generatorConfig_column">
                <div className='generatorConfig_column__label'>
                    <FormattedMessage id='dataType.boolean.format.label'/>
                </div>
                <Select
                    style={{width: 210}}
                    value={booleanOptions.format}
                    onChange={(value) => handleOptionsChange("format", value)}>
                    {formatOptions.map((option, index) => {
                        return (
                            <Select.Option key={index} value={option.value}>
                                <Tag
                                    type={colorMode === 'dark' ? 'solid' : 'light'}
                                    style={{
                                        width: 60,
                                        textAlign: 'center',
                                        marginRight: '12px'
                                    }}>{option.tag}</Tag> {option.label}
                            </Select.Option>
                        )
                    })}
                </Select>
            </div>
        </>
    )
};

const formatOptions = [
    {
        tag: 'bool',
        value: BooleanGenerateFormat.TRUE_FALSE_BOOLEAN,
        label: 'true, false'
    },
    {
        tag: 'int',
        value: BooleanGenerateFormat.ONE_ZERO_NUMBER,
        label: '1, 0'
    },
    {
        tag: 'string',
        value: BooleanGenerateFormat.YES_NO_STRING,
        label: '"Yes", "No"'
    },
    {
        tag: 'string',
        value: BooleanGenerateFormat.TRUE_FALSE_STRING,
        label: '"true", "false"'
    }
]