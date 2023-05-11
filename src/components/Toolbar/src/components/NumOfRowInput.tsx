import React from "react";
import {InputNumber} from "@douyinfe/semi-ui";
import {useIntl} from "@/locale";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "@/types/system";
import {doSetNumberOfExportRows} from "@/reducers/exporter/exportActions";

export type NumbOfRowInputProps = {}

export const NumbOfRowInput: React.FC<NumbOfRowInputProps> = () => {
    const intl = useIntl();
    const dispatch = useDispatch();

    // stores
    const numOfExportRows = useSelector((state: Store) => state.exporter.numberOfExportRows);

    // actions
    const handleInputNumberChange = (value: number) => {
        dispatch(doSetNumberOfExportRows(value));
    }

    return (
        <InputNumber
            min={1} max={100}
            value={numOfExportRows}
            onChange={handleInputNumberChange}
            suffix={intl.formatMessage({id: 'toolbar.numOfRowInput.suffix'})}
            defaultValue={1}
            style={{width: '125px', marginRight: '9px'}}/>
    )
}

