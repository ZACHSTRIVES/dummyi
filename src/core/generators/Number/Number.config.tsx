import React from 'react';
import {GeneratorConfigComponentInterface} from "@/types/generator";
import styles from "@/components/InputPanel/src/components/DataFieldsListItem.module.scss";
import {FormattedMessage} from "@/locale";
import {Typography, InputNumber, Select} from "@douyinfe/semi-ui";
import {NumberGeneratorKind} from "@/core/generators/Number/Number.d";


export const NumberConfigPanel: React.FunctionComponent<GeneratorConfigComponentInterface> = ({...props}) => {
    const {config, onConfigChange} = props;
    const {Text} = Typography;


    return (
        <>
            <div className="generatorConfig_column">
                <Text className='generatorConfig_column__label'>
                    Kind
                    {/*<FormattedMessage id='dataFields.input.type.label'/>*/}
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
                    Precision
                    {/*<FormattedMessage id='dataFields.input.type.label'/>*/}
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
                        Min.
                        {/*<FormattedMessage id='dataFields.input.type.label'/>*/}
                    </Text>
                    <InputNumber
                        style={{width: '120px'}}
                    />
                </div>

                <div className="generatorConfig_column">
                    <Text className='generatorConfig_column__label'>
                        Max.
                        {/*<FormattedMessage id='dataFields.input.type.label'/>*/}
                    </Text>
                    <InputNumber
                        style={{width: '120px'}}
                    />
                </div>

            </div>

        </>
    )
};
