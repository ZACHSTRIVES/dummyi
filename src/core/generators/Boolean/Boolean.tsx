import React from 'react';
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {FormattedMessage, useIntl} from "@/locale";
import {Tag} from "@douyinfe/semi-ui";
import {OptionsNumberInput, OptionsSelect, SelectOption} from "@/components/Utils";
import {faker} from "@faker-js/faker";
import {ExportValueType} from "@/constants/enums";
import style from './Boolean.module.scss';
import {isNullOrWhiteSpace} from "@/utils/stringUtils";

// -------------------------------------------------------------------------------------------------------------
// types
export enum BooleanGenerateFormat {
    TRUE_FALSE_BOOLEAN = "TRUE_FALSE_BOOLEAN",
    ONE_ZERO_NUMBER = "ONE_ZERO_NUMBER",
    TRUE_FALSE_STRING = 'TRUE_FALSE_STRING',
    YES_NO_STRING = 'YES_NO_STRING'
}

export interface BooleanGeneratorOptions {
    truePercentage: number;
    format: BooleanGenerateFormat;
}

export const BooleanGeneratorDefaultOptions: BooleanGeneratorOptions = {
    truePercentage: 50,
    format: BooleanGenerateFormat.TRUE_FALSE_BOOLEAN
}

// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: any): GenerateResult => {
    const {truePercentage, format} = options;
    let truePercentageRate = truePercentage / 100;
    const result = faker.datatype.boolean(truePercentageRate);
    switch (format) {
        case BooleanGenerateFormat.TRUE_FALSE_BOOLEAN:
            return {
                value: result,
                stringValue: result ? 'true' : 'false',
                type: ExportValueType.BOOLEAN
            };
        case BooleanGenerateFormat.ONE_ZERO_NUMBER:
            return {
                value: result ? 1 : 0,
                stringValue: result ? '1' : '0',
                type: ExportValueType.NUMBER
            };
        case BooleanGenerateFormat.TRUE_FALSE_STRING:
            return {
                value: result ? 'true' : 'false',
                stringValue: result ? 'true' : 'false',
                type: ExportValueType.STRING
            };
        case BooleanGenerateFormat.YES_NO_STRING:
            return {
                value: result ? 'Yes' : 'No',
                stringValue: result ? 'Yes' : 'No',
                type: ExportValueType.STRING
            };
    }
}

// -------------------------------------------------------------------------------------------------------------
// options component
export const BooleanGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, onOptionsChange} = props;
    const booleanOptions: BooleanGeneratorOptions = options;
    const intl = useIntl();

    const handleOptionsChange = (changedFieldName: string, value: any) => {
        let newOptions = {...booleanOptions, [changedFieldName]: value};
        onOptionsChange(newOptions);
    }

    // error validation
    const [errorMessages, setErrorMessages] = React.useState({
        truePercentage: '',
    });

    React.useEffect(() => {
        if(isNullOrWhiteSpace(booleanOptions.truePercentage.toString())) {
            setErrorMessages({
                ...errorMessages,
                truePercentage: intl.formatMessage({id: 'dataType.boolean.true.errorMessage.empty'})
            })
        }else{
            setErrorMessages({
                ...errorMessages,
                truePercentage: ''
            })
        }
    }, [booleanOptions.truePercentage])

    return (
        <>
            <OptionsNumberInput
                label={<FormattedMessage id='dataType.boolean.true.label'/>}
                infoTooltip={<FormattedMessage id='dataType.boolean.true.tooltip'/>}
                value={booleanOptions.truePercentage}
                onChange={(v) => handleOptionsChange("truePercentage", v)}
                style={{width: '100px'}}
                suffix={"%"}
                min={0}
                max={100}
                errorMessage={errorMessages.truePercentage}
            />

            <OptionsSelect
                label={<FormattedMessage id='dataType.boolean.format.label'/>}
                selectOptions={formatOptions}
                value={booleanOptions.format}
                onChange={(v) => handleOptionsChange("format", v)}
                style={{width: '210px'}}
            />
        </>
    )
};

const formatOptions: SelectOption[] = [
    {
        value: BooleanGenerateFormat.TRUE_FALSE_BOOLEAN,
        label: <><Tag type={'light'} className={style.formatSelectOption}>bool</Tag> true, false</>
    },
    {
        value: BooleanGenerateFormat.ONE_ZERO_NUMBER,
        label: <><Tag type={'light'} className={style.formatSelectOption}>int</Tag> 1, 0</>
    },
    {
        value: BooleanGenerateFormat.TRUE_FALSE_STRING,
        label: <><Tag type={'light'} className={style.formatSelectOption}>string</Tag> true, false</>
    },
    {
        value: BooleanGenerateFormat.YES_NO_STRING,
        label: <><Tag type={'light'} className={style.formatSelectOption}>string</Tag> Yes, No</>
    }
]

