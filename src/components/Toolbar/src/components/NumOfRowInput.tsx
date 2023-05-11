import React from "react";
import {InputNumber} from "@douyinfe/semi-ui";
import {useIntl} from "@/locale";

export type NumbOfRowInputProps = {}

export const NumbOfRowInput: React.FC<NumbOfRowInputProps> = () => {
    const intl = useIntl();

    return (
        <InputNumber
            min={1} max={100}
            innerButtons={true}
            suffix={intl.formatMessage({id: 'toolbar.numOfRowInput.suffix'})}
            defaultValue={1}
            style={{width: '125px', marginRight: '9px'}}/>
    )
}

