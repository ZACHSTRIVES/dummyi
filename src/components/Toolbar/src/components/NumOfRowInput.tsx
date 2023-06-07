import React from "react";
import {InputNumber} from "@douyinfe/semi-ui";
import {useIntl} from "@/locale";
import {useDispatch, useSelector} from "react-redux";
import {doSetNumberOfExportRows} from "@/reducers/workspace/workspaceActions";
import {MAX_NUMBER_EXPORT_ROWS, MIN_NUMBER_EXPORT_ROWS} from "@/constants/core";
import {ComponentSize} from "@/constants/enums";
import {selectNumberOfExportRows} from "@/reducers/workspace/workspaceSelectors";


export type NumbOfRowInputProps = {
    size: ComponentSize
}

export const NumbOfRowInput: React.FC<NumbOfRowInputProps> = ({...props}) => {
    const {size} = props;
    const intl = useIntl();
    const dispatch = useDispatch();

    // stores
    const numOfExportRows = useSelector(selectNumberOfExportRows);

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

