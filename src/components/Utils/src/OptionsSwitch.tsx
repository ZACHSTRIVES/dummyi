import React from 'react';
import {Switch} from "@douyinfe/semi-ui";
import {ErrorTooltip, InfoTooltip} from "@/components/Utils";


export interface OptionsSwitchProps {
    label: string | React.ReactNode;
    value: boolean;
    onChange: (value: any) => void;
    style?: React.CSSProperties;
    size?: 'small' | 'default' | 'large';
    infoTooltip?: string | React.ReactNode;
    errorMessage?: string;
}

export const OptionsSwitch: React.FunctionComponent<OptionsSwitchProps> = ({...props}) => {
    const {label, infoTooltip, value, size, style, onChange, errorMessage} = props;

    return (
        <div className="generatorConfig_column">
            <div className='generatorConfig_column__label'>
                {label}
                {infoTooltip && <InfoTooltip>
                    {infoTooltip}
                </InfoTooltip>}
            </div>
            <ErrorTooltip message={errorMessage}>
                <Switch
                    onChange={onChange}
                    size={size ? size : 'large'}
                    checked={value}
                    style={style}
                />
            </ErrorTooltip>
        </div>
    )
}