import React from "react";
import { GenerateResult, GeneratorOptionsComponentInterface } from "@/types/generator";
import { ExportValueType } from "@/constants/enums";
import { CssFunctionType, faker } from "@faker-js/faker";
import { Tag } from "@douyinfe/semi-ui";
import { OptionsNumberInput, OptionsSelect, SelectOption } from "@/components/Utils";
import { FormattedMessage} from "@/locale";
import style from '../Boolean/Boolean.module.scss';


export enum ColorGeneratorFormat {
    BINARY = "BINARY",
    CSS = "CSS",
    DECIMAL = "DECIMAL",
}

export enum ColorGeneratorKind {
    HUMAN = "W",
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
    const { format, kind, casing, includeAlpha, prefix } = options;


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
                const decimalColor = faker.color.rgb({ format: 'decimal' });
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
        type: ExportValueType.STRING
    };


}



export const ColorGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({ ...props }) => {
    const { options, onOptionsChange } = props;
    const colorOptions: ColorGeneratorOptions = options;
    


    const handleOptionsChange = (changedFieldName: string, value: any) => {
        let newOptions = { ...colorOptions, [changedFieldName]: value };
        onOptionsChange(newOptions);
    }

    return (
        <>
            <OptionsSelect
                label={<FormattedMessage id='dataType.number.kind.label' />}
                selectOptions={kindSelectOptions}
                value={colorOptions.kind}
                onChange={(v) => handleOptionsChange('kind', v)}
                style={{ width: '100px' }}
            />

            {colorOptions.kind === ColorGeneratorKind.RGB && <OptionsSelect
                label={<FormattedMessage id='dataType.color.format.label' />}
                selectOptions={formatSelectOptions}
                value={colorOptions.format}
                onChange={(v) => handleOptionsChange('format', v)}
            />}

        </>
    )
};


const kindSelectOptions: SelectOption[] = Object.values(ColorGeneratorKind).map((kind) => ({
    value: kind,
    label: kind,
}));

const formatSelectOptions: SelectOption[] = [
    {
        value: ColorGeneratorFormat.BINARY,
        label: <><Tag type={'light'} className={style.formatSelectOption}>binary</Tag>Binary Format</>
    },
    {
        value: ColorGeneratorFormat.CSS,
        label: <><Tag type={'light'} className={style.formatSelectOption}>string</Tag>CSS Format</>
    },
    {
        value: ColorGeneratorFormat.DECIMAL,
        label: <><Tag type={'light'} className={style.formatSelectOption}>string</Tag>Integer Format</>
    }
]

