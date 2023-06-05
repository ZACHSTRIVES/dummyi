import React from 'react';
import {ErrorTooltip, InfoTooltip} from "@/components/Utils";
import {Button} from "@douyinfe/semi-ui";

export interface OptionsButtonProps {
    label: string | React.ReactNode;
    infoTooltip?: string | React.ReactNode;
    errorMessage?: string;
    icon?: string | React.ReactNode;
    text?: string | React.ReactNode;
    onClick: () => void;
    style?: React.CSSProperties;
}

export const OptionsButton: React.FunctionComponent<OptionsButtonProps> = ({...props}) => {
    const {label, infoTooltip, errorMessage, icon, text, style, onClick} = props;

    return (
        <div className="generatorConfig_column">
            <div className='generatorConfig_column__label'>
                {label}
                {infoTooltip && <InfoTooltip>
                    {infoTooltip}
                </InfoTooltip>}
            </div>
            <ErrorTooltip message={errorMessage}>
                <Button
                    icon={icon}
                    onClick={onClick}
                    style={style}
                >
                    {text}
                </Button>
            </ErrorTooltip>
        </div>
    )
}