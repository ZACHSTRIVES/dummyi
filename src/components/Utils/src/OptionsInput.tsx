import React from 'react';
import {ErrorTooltip, InfoTooltip} from "@/components/Utils";
import {Input} from "@douyinfe/semi-ui";
import {isNullOrWhiteSpace} from "@/utils/stringUtils";
import {useIntl} from "@/locale";

export interface OptionsInputProps {
    label: string | React.ReactNode;
    infoTooltip?: string | React.ReactNode;
    errorMessage?: string;
    suffix?: string | React.ReactNode;
    value: string;
    onChange: (value: any) => void;
    style?: React.CSSProperties;
    required?: boolean; // Add this line for the new required prop
}

export const OptionsInput: React.FunctionComponent<OptionsInputProps> = ({...props}) => {
    const {label, infoTooltip, errorMessage, value, style, suffix, onChange, required} = props;
    const intl = useIntl();

    // Add a new useState to manage the validation error message
    const [validationError, setValidationError] = React.useState<string | undefined>();

    // Add effect to validate value when it changes or when required status changes
    React.useEffect(() => {
        if (required && isNullOrWhiteSpace(value)) {
            setValidationError(intl.formatMessage({id: 'error.input.isRequired'})); // Set default required error message or use props.errorMessage
        } else {
            setValidationError(undefined); // Clear error message when input is valid
        }
    }, [value, required]);

    return (
        <div className="generatorConfig_column">
            <div className='generatorConfig_column__label'>
                {label}
                {infoTooltip && <InfoTooltip>
                    {infoTooltip}
                </InfoTooltip>}
            </div>
            <ErrorTooltip message={validationError || errorMessage}>
                <Input
                    onChange={(value) => onChange(value)}
                    value={value}
                    style={style}
                    suffix={suffix}
                    validateStatus={!isNullOrWhiteSpace(validationError || errorMessage) ? 'error' : 'default'}
                />
            </ErrorTooltip>
        </div>
    )
}
