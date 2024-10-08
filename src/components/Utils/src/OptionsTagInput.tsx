import React from 'react';
import {ErrorTooltip, InfoTooltip} from "@/components/Utils";
import {Input, TagInput} from "@douyinfe/semi-ui";
import {isNullOrWhiteSpace} from "@/utils/stringUtils";

export interface OptionsTagInputProps {
    label: string | React.ReactNode;
    infoTooltip?: string | React.ReactNode;
    errorMessage?: string;
    suffix?: string | React.ReactNode;
    value: string[];
    onChange: (value: any) => void;
    style?: React.CSSProperties;
}

export const OptionsTagInput: React.FunctionComponent<OptionsTagInputProps> = ({...props}) => {
    const {label, infoTooltip, errorMessage, value, style, suffix, onChange} = props;

    return (
        <div className="generatorConfig_column">
            <div className='generatorConfig_column__label'>
                {label}
                {infoTooltip && <InfoTooltip>
                    {infoTooltip}
                </InfoTooltip>}
            </div>
            <ErrorTooltip message={errorMessage}>
                <TagInput
                    onChange={(value) => onChange(value)}
                    value={value}
                    style={style}
                    suffix={suffix}
                    validateStatus={!isNullOrWhiteSpace(errorMessage) ? 'error' : 'default'}
                />
            </ErrorTooltip>
        </div>
    )
}