import React from "react";
import {InputNumber} from "@douyinfe/semi-ui";
import {useIntl} from "@/locale";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "@/types/system";
import {doSetNumberOfExportRows} from "@/reducers/exporter/exportActions";
import {MAX_NUMBER_EXPORT_ROWS, MIN_NUMBER_EXPORT_ROWS} from "@/constents/core";

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
            min={MIN_NUMBER_EXPORT_ROWS}
            max={MAX_NUMBER_EXPORT_ROWS}
            value={numOfExportRows}
            onChange={handleInputNumberChange}
            suffix={intl.formatMessage({id: 'toolbar.numOfRowInput.suffix'})}
            defaultValue={1}
            style={{width: '125px', marginRight: '9px'}}/>
    )
}

