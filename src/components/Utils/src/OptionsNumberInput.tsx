import React from 'react';
import {ErrorTooltip, InfoTooltip} from "@/components/Utils";
import {InputNumber} from "@douyinfe/semi-ui";
import {isNullOrWhiteSpace} from "@/utils/stringUtils";

export interface OptionsNumberInputProps {
    label: string | React.ReactNode;
    infoTooltip?: string | React.ReactNode;
    errorMessage?: string;
    value: number;
    onChange: (value: any) => void;
    style?: React.CSSProperties;
    suffix?: string | React.ReactNode;
    min?: number;
    max?: number;
}

export const OptionsNumberInput: React.FunctionComponent<OptionsNumberInputProps> = ({...props}) => {
    const {label, infoTooltip, errorMessage, value, suffix, style, min, max, onChange} = props;

    return (
        <div className="generatorConfig_column">
            <div className='generatorConfig_column__label'>
                {label}
                {infoTooltip && <InfoTooltip>
                    {infoTooltip}
                </InfoTooltip>}
            </div>
            <ErrorTooltip message={errorMessage}>
                <InputNumber
                    onChange={(value) => onChange(value)}
                    value={value}
                    style={style}
                    validateStatus={!isNullOrWhiteSpace(errorMessage) ? 'error' : 'default'}
                    suffix={suffix}
                    min={min}
                    max={max}
                />
            </ErrorTooltip>
        </div>
    )
}