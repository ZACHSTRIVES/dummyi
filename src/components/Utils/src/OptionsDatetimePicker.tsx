import React from "react";
import {ErrorTooltip, InfoTooltip} from "@/components/Utils";
import {useIntl} from "@/locale";
import {isNullOrWhiteSpace} from "@/utils/stringUtils";
import {DatePicker} from "@douyinfe/semi-ui";
import {hasValue} from "@/utils/typeUtils";

export interface OptionsDatetimePickerProps {
    label: string | React.ReactNode;
    type?: "date" | "dateTime" | "dateRange" | "dateTimeRange";
    infoTooltip?: string | React.ReactNode;
    errorMessage?: string;
    value: string | number | Date | string[] | number[] | Date[];
    onChange: (value: any) => void;
    style?: React.CSSProperties;
    required?: boolean;
}

export const OptionsDatetimePicker: React.FunctionComponent<OptionsDatetimePickerProps> = ({...props}) => {
    const {label, type, infoTooltip, errorMessage, value, style, onChange, required} = props;
    const intl = useIntl();

    // Add a new useState to manage the validation error message
    const [validationError, setValidationError] = React.useState<string | undefined>();

    // Add effect to validate value when it changes or when required status changes
    React.useEffect(() => {
        if (required && !hasValue(value)) {
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
                <DatePicker
                    density="compact"
                    type={type}
                    onChange={(date, dateString) => onChange(dateString)}
                    value={value}
                    style={style}
                    validateStatus={!isNullOrWhiteSpace(validationError || errorMessage) ? 'error' : 'default'}
                />
            </ErrorTooltip>
        </div>
    )
}