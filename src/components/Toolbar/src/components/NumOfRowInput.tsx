import React from "react";
import {InputNumber} from "@douyinfe/semi-ui";
import {useIntl} from "@/locale";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "@/types/system";
import {doSetNumberOfExportRows} from "@/reducers/exporter/exportActions";
import {MAX_NUMBER_EXPORT_ROWS, MIN_NUMBER_EXPORT_ROWS} from "@/constants/core";
import {ComponentSize} from "@/constants/enums";


export type NumbOfRowInputProps = {
    size: ComponentSize
}

export const NumbOfRowInput: React.FC<NumbOfRowInputProps> = ({...props}) => {
    const {size} = props;
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
            suffix={size === 'large' ? intl.formatMessage({id: 'toolbar.numOfRowInput.suffix'}) : null}
            defaultValue={1}
            placeholder={size === 'small' ? intl.formatMessage({id: 'toolbar.numOfRowInput.suffix'}) : null}
            style={{
                width: size === 'large' ?
                    '120px' : '80px', marginRight: '9px'
            }}
        />
    )
}

