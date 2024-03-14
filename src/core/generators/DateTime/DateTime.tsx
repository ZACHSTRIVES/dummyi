import React from "react";
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {OptionsSelect, SelectOption} from "@/components/Utils";
import {FormattedMessage} from "@/locale";
import {OptionsDatetimePicker} from "@/components/Utils/src/OptionsDatetimePicker";
import {faker} from "@faker-js/faker";
import {ValueType} from "@/constants/enums";
import style from "@/core/generators/Boolean/Boolean.module.scss";
import {Tag} from "@douyinfe/semi-ui";
import {toDateTimeString} from "@/utils/typeUtils";

// -------------------------------------------------------------------------------------------------------------
// types
export enum DateTimeTerms {
    ANYTIME = "anytime",
    BETWEEN = "between",
    FUTURE = "future",
    PAST = "past",
    RECENT = "recent",
    SOON = "soon"
}

export enum DateTimeFormat {
    TEXT = "text",
    TIMESTAMP = "timestamp",
    DATETIME = "datetime"
}

export interface DateTimeGeneratorOptions {
    terms: DateTimeTerms;
    ref: Date | number | string;
    format: DateTimeFormat;
    timeRange: Date[] | number[] | string[];
}

// -------------------------------------------------------------------------------------------------------------
// default options
export const DateTimeGeneratorDefaultOptions: DateTimeGeneratorOptions = {
    terms: DateTimeTerms.ANYTIME,
    ref: Date.now(),
    format: DateTimeFormat.DATETIME,
    timeRange: [new Date(2023, 0, 1), new Date()]
}

// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: DateTimeGeneratorOptions): GenerateResult => {
    const {terms, ref, format} = options;

    let value: Date;
    const fakerOptions = {refDate: ref}

    switch (terms) {
        case DateTimeTerms.FUTURE:
            value = faker.date.future(fakerOptions);
            break;
        case DateTimeTerms.PAST:
            value = faker.date.past(fakerOptions);
            break;
        case DateTimeTerms.RECENT:
            value = faker.date.recent(fakerOptions);
            break;
        case DateTimeTerms.SOON:
            value = faker.date.soon(fakerOptions);
            break;
        case DateTimeTerms.BETWEEN:
            value = faker.date.between({from: options.timeRange[0], to: options.timeRange[1]});
            break;
        default:
            value = faker.date.anytime(fakerOptions);
    }

    const output = formatDateTime(value, format);

    return {
        value: output,
        stringValue: (output instanceof Date) ? output.toISOString() : output.toString()
    };
}

// -------------------------------------------------------------------------------------------------------------
// options component
export const DateTimeGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {

    const {options, handleOptionValueChange} = props as {
        options: DateTimeGeneratorOptions,
        handleOptionValueChange: typeof props.handleOptionValueChange
    };

    const handleChangeFormat = (format: DateTimeFormat) => {
        if (format === DateTimeFormat.TIMESTAMP) {
            handleOptionValueChange("format", format, ValueType.INT);
        } else if (format === DateTimeFormat.TEXT) {
            handleOptionValueChange("format", format, ValueType.STRING);
        } else if (format === DateTimeFormat.DATETIME) {
            handleOptionValueChange("format", format, ValueType.DATE_TIME);
        }
    }

    return (
        <>
            <OptionsSelect
                label={<FormattedMessage id={'dataType.datetime.terms'}/>}
                selectOptions={DateTimeTermsSelectOptions}
                value={options.terms}
                onChange={(v) => handleOptionValueChange("terms", v)}
                style={{width: "130px"}}
            />

            {
                options.terms === DateTimeTerms.BETWEEN ? <OptionsDatetimePicker
                        label={<FormattedMessage id={'dataType.datetime.timeRange'}/>}
                        type={'dateTimeRange'}
                        value={options.timeRange}
                        onChange={(v) => handleOptionValueChange("timeRange", v)}
                        style={{width: "260px"}}
                        required
                    />
                    :
                    <OptionsDatetimePicker
                        label={<FormattedMessage id={'dataType.datetime.ref'}/>}
                        infoTooltip={<FormattedMessage id={'dataType.datetime.ref.tooltip'}/>}
                        type={'dateTime'}
                        value={options.ref}
                        onChange={(v) => handleOptionValueChange("ref", v)}
                        style={{width: "185px"}}
                        required
                    />
            }

            <OptionsSelect
                label={<FormattedMessage id={'dataType.datetime.format'}/>}
                selectOptions={DateTimeFormatSelectOptions}
                value={options.format}
                onChange={handleChangeFormat}
                style={{width: "200px"}}
            />
        </>
    );
}

export const formatDateTime = (date: Date, format: DateTimeFormat) => {
    switch (format) {
        case DateTimeFormat.DATETIME:
            return date;
        case DateTimeFormat.TIMESTAMP:
            return date.getTime();
        case DateTimeFormat.TEXT:
            return toDateTimeString(date);
    }
}

export const DateTimeTermsSelectOptions: SelectOption[] = Object.values(DateTimeTerms).map((term) => {
    return {
        value: term,
        label: <FormattedMessage id={`dataType.datetime.terms.${term}`}/>
    };
})

export const DateTimeFormatSelectOptions: SelectOption[] = [
    {
        value: DateTimeFormat.DATETIME,
        label:
            <>
                <Tag type={'light'}
                     className={style.formatSelectOption}>Date</Tag>
                <FormattedMessage id={`dataType.datetime.format.datetime`}/>
            </>
    },
    {
        value: DateTimeFormat.TIMESTAMP,
        label:
            <>
                <Tag type={'light'}
                     className={style.formatSelectOption}>number</Tag>
                <FormattedMessage id={`dataType.datetime.format.timestamp`}/>
            </>
    },
    {
        value: DateTimeFormat.TEXT,
        label:
            <>
                <Tag type={'light'}
                     className={style.formatSelectOption}>string</Tag>
                <FormattedMessage id={`dataType.datetime.format.text`}/>
            </>
    },

]