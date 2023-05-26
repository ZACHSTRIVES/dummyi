import React from "react";
import {Input, Form, Switch, Select} from "@douyinfe/semi-ui";
import {EndOfLineChars} from "@/constants/enums";
import {CsvFormatterConfig} from "@/core/formatters/Csv/Csv";
import {FormatterConfigComponentInterface} from "@/types/formatter";
import {useIntl} from "@/locale";

export const defaultCsvFormatterConfig: CsvFormatterConfig = {
    delimiter: ',',
    endOfLineChar: EndOfLineChars.CRLF,
    includeHeader: false
}

export const CsvConfig: React.FC<FormatterConfigComponentInterface> = ({...props}) => {
    const {onConfigChange, config } = props;
    const csvConfig: CsvFormatterConfig = config;
    const {Label} = Form;
    const intl = useIntl();

    // action
    const handleValueChange = (field: string, value: any) => {
        onConfigChange({
            ...csvConfig,
            [field]: value
        })
    }

    return (
        <div>
            <div className={'margin-top-18 flex flex-column'}>
                <Label>{intl.formatMessage({id: "export.configurator.csv.delimiter"})}</Label>
                <Input
                    onChange={(value) => {
                        handleValueChange('delimiter', value)
                    }}
                    value={csvConfig.delimiter}
                    style={{width: '60px'}}
                />
            </div>

            <div className={'margin-top-18 flex flex-column'}>
                <Label>{intl.formatMessage({id: "export.configurator.csv.includeHeader"})}</Label>
                <Switch
                    onChange={(value) => {
                        handleValueChange('includeHeader', value)
                    }}
                    size={'large'}
                    checked={csvConfig.includeHeader}
                />
            </div>

            <div className={'margin-top-18 flex flex-column'}>
                <Label>{intl.formatMessage({id: "export.configurator.csv.endLineChar"})}</Label>
                <Select
                    onChange={(value) => {
                        handleValueChange('endOfLineChar', value)
                    }
                    }
                    value={csvConfig.endOfLineChar}
                    style={{width: '200px'}}
                >
                    <Select.Option value={EndOfLineChars.CRLF}>
                        CRLF（Windows)
                    </Select.Option>
                    <Select.Option
                        value={EndOfLineChars.LF}>
                        LF (Unix)
                    </Select.Option>
                </Select>
            </div>
        </div>
    )
}