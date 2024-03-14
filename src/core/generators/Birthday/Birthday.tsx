import React from "react";
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {DateTimeFormat, DateTimeFormatSelectOptions, formatDateTime} from "@/core/generators/DateTime/DateTime";
import {OptionsNumberInput, OptionsSelect, SelectOption} from "@/components/Utils";
import {FormattedMessage} from "@/locale";
import {faker} from "@faker-js/faker";
import {ValueType} from "@/constants/enums";

// -------------------------------------------------------------------------------------------------------------
// types

export enum BirthdayGeneratorMode {
    AGE = "age",
    YEAR = "year"
}

export interface BirthdayGeneratorOptions {
    format: DateTimeFormat;
    mode: BirthdayGeneratorMode;
    minAge: number;
    maxAge: number;
    fromYear: number;
    toYear: number;
}

// -------------------------------------------------------------------------------------------------------------
// default options
export const BirthdayGeneratorDefaultOptions: BirthdayGeneratorOptions = {
    format: DateTimeFormat.DATETIME,
    mode: BirthdayGeneratorMode.AGE,
    minAge: 1,
    maxAge: 80,
    fromYear: 1960,
    toYear: 2000,
}

// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: BirthdayGeneratorOptions): GenerateResult => {

    const value = faker.date.birthdate({
        mode: options.mode,
        min: options.mode === BirthdayGeneratorMode.AGE ? options.minAge : options.fromYear,
        max: options.mode === BirthdayGeneratorMode.AGE ? options.maxAge : options.toYear,
        refDate: Date.now()
    })
    const output = formatDateTime(value, options.format);

    return {
        value: output,
        stringValue: (output instanceof Date) ? output.toISOString() : output.toString()
    };
}

// -------------------------------------------------------------------------------------------------------------
// options component
export const BirthdayGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, handleOptionValueChange} = props as {
        options: BirthdayGeneratorOptions,
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
                label={<FormattedMessage id={"dataType.birthday.mode"}/>}
                selectOptions={BirthdayGeneratorModeSelectOptions}
                value={options.mode}
                onChange={(v) => handleOptionValueChange("mode", v)}
            />

            {options.mode === BirthdayGeneratorMode.AGE && <>
                <OptionsNumberInput
                    label={<FormattedMessage id={"dataType.birthday.mode.minAge"}/>}
                    value={options.minAge}
                    onChange={(v) => handleOptionValueChange("minAge", v)}
                    style={{width: "70px"}}
                    min={0}
                    max={options.maxAge}
                />

                <OptionsNumberInput
                    label={<FormattedMessage id={"dataType.birthday.mode.maxAge"}/>}
                    value={options.maxAge}
                    onChange={(v) => handleOptionValueChange("maxAge", v)}
                    style={{width: "70px"}}
                    min={options.minAge}
                    max={150}
                />
            </>}


            {options.mode === BirthdayGeneratorMode.YEAR && <>
                <OptionsNumberInput
                    label={<FormattedMessage id={"dataType.birthday.mode.fromYear"}/>}
                    value={options.fromYear}
                    onChange={(v) => handleOptionValueChange("fromYear", v)}
                    style={{width: "90px"}}
                    min={1000}
                    max={options.toYear}
                />

                <OptionsNumberInput
                    label={<FormattedMessage id={"dataType.birthday.mode.toYear"}/>}
                    value={options.toYear}
                    onChange={(v) => handleOptionValueChange("toYear", v)}
                    style={{width: "100px"}}
                    min={options.toYear}
                    max={2500}
                />
            </>}

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

const BirthdayGeneratorModeSelectOptions: SelectOption[] = [
    {
        label: <FormattedMessage id={"dataType.birthday.mode.age"}/>,
        value: BirthdayGeneratorMode.AGE
    }, {
        label: <FormattedMessage id={"dataType.birthday.mode.year"}/>,
        value: BirthdayGeneratorMode.YEAR
    }
]