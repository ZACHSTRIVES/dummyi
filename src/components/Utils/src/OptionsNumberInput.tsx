import React from 'react';
import {FormattedMessage} from "@/locale";
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
}

export const OptionsNumberInput: React.FunctionComponent<OptionsNumberInputProps> = ({...props}) => {
    const {label, infoTooltip, errorMessage, value, onChange} = props;

    return (
        <div className="generatorConfig_column">
            <div className='generatorConfig_column__label'>
                {label}
                {infoTooltip && <InfoTooltip>
                    <FormattedMessage id='dataType.number.max.tooltip'/>
                </InfoTooltip>}
            </div>
            <ErrorTooltip message={errorMessage}>
                <InputNumber
                    onChange={(value) => onChange( value)}
                    value={value}
                    style={{width: '120px'}}
                    validateStatus={!isNullOrWhiteSpace(errorMessage) ? 'error' : 'default'}
                />
            </ErrorTooltip>
        </div>
    )
}