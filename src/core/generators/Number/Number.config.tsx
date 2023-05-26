import React from 'react';
import {GeneratorConfigComponentInterface} from "@/types/generator";
import styles from "@/components/InputPanel/src/components/DataFieldsListItem.module.scss";
import {FormattedMessage} from "@/locale";
import {Typography, InputNumber, Select} from "@douyinfe/semi-ui";
import {NumberGeneratorConfig, NumberGeneratorKind} from "@/core/generators/Number/Number.d";

export const NumberConfigPanel: React.FunctionComponent<GeneratorConfigComponentInterface> = ({...props}) => {
    const {config, onConfigChange} = props;
    const numberConfig: NumberGeneratorConfig = config;
    const {Text} = Typography;

    return (
        <>
            <div className="generatorConfig_column">
                <Text className='generatorConfig_column__label'>
                    <FormattedMessage id='dataType.number.kind.label'/>
                </Text>
                <Select>
                    {Object.values(NumberGeneratorKind).map((kind, index) => {
                        return (
                            <Select.Option key={index} value={kind}>
                                {kind}
                            </Select.Option>
                        )
                    })}
                </Select>
            </div>

            <div className="generatorConfig_column">
                <Text className='generatorConfig_column__label'>
                    <FormattedMessage id='dataType.number.precision.label'/>
                </Text>
                <Select>
                    <Select.Option value={0.1}>0.1</Select.Option>
                    <Select.Option value={0.01}>0.01</Select.Option>
                    <Select.Option value={0.001}>0.001</Select.Option>
                    <Select.Option value={0.0001}>0.0001</Select.Option>
                </Select>
            </div>

            <div className='flex'>

                <div className="generatorConfig_column">
                    <Text className='generatorConfig_column__label'>
                        <FormattedMessage id='dataType.number.min.label'/>
                    </Text>
                    <InputNumber
                        style={{width: '120px'}}
                    />
                </div>

                <div className="generatorConfig_column">
                    <Text className='generatorConfig_column__label'>
                        <FormattedMessage id='dataType.number.max.label'/>
                    </Text>
                    <InputNumber
                        style={{width: '120px'}}
                    />
                </div>
            </div>
        </>
    )
};
