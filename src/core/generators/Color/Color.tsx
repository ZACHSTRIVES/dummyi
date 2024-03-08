import React from "react";
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {faker} from "@faker-js/faker";
import {Tag} from "@douyinfe/semi-ui";
import {OptionsSelect, SelectOption} from "@/components/Utils";
import {FormattedMessage} from "@/locale";
import style from '../Boolean/Boolean.module.scss';
import {ValueType} from "@/constants/enums";


export enum ColorGeneratorFormat {
    BINARY = "BINARY",
    CSS = "CSS",
    DECIMAL = "DECIMAL",
}

export enum ColorGeneratorKind {
    HUMAN = "HUMAN",
    RGB = "RGB",
    HSL = "HSL",
}

export interface ColorGeneratorOptions {
    kind: ColorGeneratorKind;
    format: ColorGeneratorFormat;
    casing?: 'lower' | 'mixed' | 'upper';
    includeAlpha?: boolean;
    prefix?: string;
}

export const ColorGeneratorDefaultOptions: ColorGeneratorOptions = {
    kind: ColorGeneratorKind.HUMAN,
    format: ColorGeneratorFormat.CSS,
};

const toBinary = (value: number): string => value.toString(2).padStart(8, '0');

export const generate = (options): GenerateResult => {
    const {format, kind, casing, includeAlpha, prefix} = options;

    let result: any;
    let stringValue: string;
    const fakerOptions: {
        casing?: 'lower' | 'mixed' | 'upper';
        includeAlpha?: boolean;
        prefix?: string;
        format?: 'css' | 'decimal' | 'hex';
    } = {
        casing: casing,
        includeAlpha: includeAlpha,
        prefix: prefix,
    };

    switch (kind) {
        case ColorGeneratorKind.HSL:
            result = faker.color.hsl();
            break;
        case ColorGeneratorKind.HUMAN:
            result = faker.color.human();
            break;
        case ColorGeneratorKind.RGB:
            if (format === ColorGeneratorFormat.BINARY) {
                // Handle binary format conversion separately since Faker doesn't support it directly
                const decimalColor = faker.color.rgb({format: 'decimal'});
                result = decimalColor.map(toBinary).join(' ');
            } else {
                fakerOptions.format = format === ColorGeneratorFormat.CSS ? 'css' :
                    format === ColorGeneratorFormat.DECIMAL ? 'decimal' : 'hex';

                result = faker.color.rgb(fakerOptions);
            }
            break;
    }

    stringValue = Array.isArray(result) ? result.join(', ') : result;

    return {
        value: result,
        stringValue: stringValue,
    };
}


export const ColorGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, handleOptionValueChange} = props as {
        options: ColorGeneratorOptions,
        handleOptionValueChange: typeof props.handleOptionValueChange
    };

    // kind
    const handleChangeKind = (kind: ColorGeneratorKind) => {
        if (kind === ColorGeneratorKind.RGB) {
            handleOptionValueChange("kind", kind, options.format === ColorGeneratorFormat.DECIMAL ? ValueType.INT_LIST : ValueType.STRING);
        } else if (kind === ColorGeneratorKind.HSL) {
            handleOptionValueChange("kind", kind, ValueType.INT_LIST);
        } else if (kind === ColorGeneratorKind.HUMAN) {
            handleOptionValueChange("kind", kind, ValueType.STRING);
        }
    }

    // format
    const handleChangeFormat = (format: ColorGeneratorFormat) => {
        if (format === ColorGeneratorFormat.DECIMAL) {
            handleOptionValueChange("format", format, ValueType.INT_LIST);
        } else {
            handleOptionValueChange("format", format, ValueType.STRING);
        }
    }

    return (
        <>
            <OptionsSelect
                label={<FormattedMessage id='dataType.color.kind.label'/>}
                selectOptions={kindSelectOptions}
                value={options.kind}
                onChange={(v) => handleChangeKind(v)}
                style={{width: '150px'}}
            />

            {options.kind === ColorGeneratorKind.RGB && <OptionsSelect
                label={<FormattedMessage id='dataType.color.format.label'/>}
                selectOptions={formatSelectOptions}
                value={options.format}
                onChange={(v) => handleChangeFormat(v)}
                style={{width: '250px'}}
            />}

        </>
    )
};


const kindSelectOptions: SelectOption[] = [
    {
        label: <FormattedMessage id='dataType.color.format.humanWord'/>,
        value: ColorGeneratorKind.HUMAN,
    }, {
        label: "RGB",
        value: ColorGeneratorKind.RGB
    }, {
        label: "HSL",
        value: ColorGeneratorKind.HSL
    }]

const formatSelectOptions: SelectOption[] = [
    {
        value: ColorGeneratorFormat.BINARY,
        label: <><Tag type={'light'} className={style.formatSelectOption}>string</Tag>Binary</>
    },
    {
        value: ColorGeneratorFormat.CSS,
        label: <><Tag type={'light'} className={style.formatSelectOption}>string</Tag>CSS</>
    },
    {
        value: ColorGeneratorFormat.DECIMAL,
        label: <><Tag type={'light'} className={style.formatSelectOption}>list</Tag>Decimal</>
    }
]

