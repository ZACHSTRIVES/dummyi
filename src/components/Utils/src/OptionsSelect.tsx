import React from 'react';
import {FormattedMessage} from "@/locale";
import {ErrorTooltip, InfoTooltip} from "@/components/Utils";
import {Select} from "@douyinfe/semi-ui";

export interface SelectOption {
    label: string | React.ReactNode;
    value: any;
}

export interface OptionsSelectProps {
    label: string | React.ReactNode;
    selectOptions: SelectOption[];
    infoTooltip?: string | React.ReactNode;
    errorMessage?: string;
    value: any;
    onChange: (value: any) => void;
    style?: React.CSSProperties;
}

export const OptionsSelect: React.FunctionComponent<OptionsSelectProps> = ({...props}) => {
    const {label, selectOptions, infoTooltip, errorMessage, value, onChange} = props;
    return (
        <div className="generatorConfig_column">
            <div className='generatorConfig_column__label'>
                {label}
                {infoTooltip && <InfoTooltip>
                    <FormattedMessage id='dataType.number.max.tooltip'/>
                </InfoTooltip>}
            </div>
            <ErrorTooltip message={errorMessage}>
                <Select value={value}
                        onChange={(value) => onChange(value)}>
                    {selectOptions.map((option, index) => {
                        return (
                            <Select.Option key={index} value={option.value}>
                                {option.label}
                            </Select.Option>
                        )
                    })}
                </Select>
            </ErrorTooltip>
        </div>
    )
}
