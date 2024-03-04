import React from "react";
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {ExportValueType, Sex} from "@/constants/enums";
import {OptionsSelect, SelectOption} from "@/components/Utils";
import {FormattedMessage} from "@/locale";
import {faker} from "@faker-js/faker";

// -------------------------------------------------------------------------------------------------------------
// types
export type EmojiType =
    | 'smiley'
    | 'body'
    | 'person'
    | 'nature'
    | 'food'
    | 'travel'
    | 'activity'
    | 'object'
    | 'symbol'
    | 'flag';

export interface EmojiGeneratorOptions {
    type: EmojiType[]
}

// -------------------------------------------------------------------------------------------------------------
// default options
export const EmojiGeneratorDefaultOptions: EmojiGeneratorOptions = {
    type: ['smiley', 'body', 'person', 'nature', 'food', 'travel', 'activity', 'object', 'symbol', 'flag']
}

// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: any): GenerateResult => {
    const config = {};
    config['types'] = options.type;


    const value = faker.internet.emoji(config);

    return {
        value: value,
        stringValue: value,
        type: ExportValueType.STRING
    };
}

// -------------------------------------------------------------------------------------------------------------
// options component
export const EmojiGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, onOptionsChange} = props;

    const handleOptionsChange = (changedFieldName: string, value: any) => {
        let newOptions = {...options, [changedFieldName]: value};
        onOptionsChange(newOptions);
    };

    return (
        <div>
            <OptionsSelect
                multiple
                maxTagCount={2}
                label={<FormattedMessage id='dataType.emoji.type'/>}
                selectOptions={EmojiTypeSelectOptions}
                value={options.type}
                onChange={(v) => handleOptionsChange("type", v)}
                style={{width: '200px'}}
            />
        </div>
    );
}

export const EmojiTypeSelectOptions: SelectOption[] = [
    {
        label: <FormattedMessage id={"dataType.emoji.type.smiley"}/>,
        value: "smiley",
    },
    {
        label: <FormattedMessage id={"dataType.emoji.type.body"}/>,
        value: "body"
    },
    {
        label: <FormattedMessage id={"dataType.emoji.type.person"}/>,
        value: "person"
    },
    {
        label: <FormattedMessage id={"dataType.emoji.type.nature"}/>,
        value: "nature"
    },
    {
        label: <FormattedMessage id={"dataType.emoji.type.food"}/>,
        value: "food"
    },
    {
        label: <FormattedMessage id={"dataType.emoji.type.travel"}/>,
        value: "travel"
    },
    {
        label: <FormattedMessage id={"dataType.emoji.type.activity"}/>,
        value: "activity"
    },
    {
        label: <FormattedMessage id={"dataType.emoji.type.object"}/>,
        value: "object"
    },
    {
        label: <FormattedMessage id={"dataType.emoji.type.symbol"}/>,
        value: "symbol"
    },
    {
        label: <FormattedMessage id={"dataType.emoji.type.flag"}/>,
        value: "flag"
    }
]




