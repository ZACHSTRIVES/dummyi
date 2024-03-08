import React from "react";
import {ErrorTooltip, InfoTooltip} from "@/components/Utils";
import {Radio, RadioGroup} from "@douyinfe/semi-ui";

export interface RadioOption {
    label: string | React.ReactNode;
    value: any;
}

export interface OptionsRadioProps {
    label: string | React.ReactNode;
    radioOptions: RadioOption[];
    type: 'button'|'card'
    infoTooltip?: string | React.ReactNode;
    errorMessage?: string;
    value: any;
    onChange: (value: any) => void;
    style?: React.CSSProperties;
}

export const OptionsRadio: React.FunctionComponent<OptionsRadioProps> = ({...props}) => {
    const {label, radioOptions, infoTooltip, errorMessage, value, style,  onChange} = props;

    return (
        <div className="generatorConfig_column">
            <div className='generatorConfig_column__label'>
                {label}
                {infoTooltip && <InfoTooltip>
                    {infoTooltip}
                </InfoTooltip>}
            </div>
            <ErrorTooltip message={errorMessage}>
                <RadioGroup
                    type={props.type}
                    buttonSize='middle'
                    value={value}
                    onChange={(e)=> onChange(e.target.value)}
                    style={style}
                >
                    {radioOptions.map((option,index)=>{
                        return <Radio key={index} value={option.value}>
                            {option.label}
                        </Radio>
                    })}
                </RadioGroup>
            </ErrorTooltip>
        </div>
    )
}