import React from "react";
import {InputNumber} from "@douyinfe/semi-ui";
import {useIntl} from "@/locale";
import {useDispatch, useSelector} from "react-redux";
import {doSetNumberOfExportRows} from "@/reducers/workspace/workspaceActions";
import {MAX_NUMBER_EXPORT_ROWS, MIN_NUMBER_EXPORT_ROWS} from "@/constants/config";
import {ComponentSize} from "@/constants/enums";
import {selectNumberOfExportRows} from "@/reducers/workspace/workspaceSelectors";
import {ErrorTooltip} from "@/components/Utils";
import {isNullOrWhiteSpace} from "@/utils/stringUtils";


export type NumbOfRowInputProps = {
    size: ComponentSize,
    errorMessage?: string,
}

export const NumbOfRowInput: React.FC<NumbOfRowInputProps> = ({...props}) => {
    const {size, errorMessage} = props;
    const intl = useIntl();
    const dispatch = useDispatch();

    // stores
    const numOfExportRows = useSelector(selectNumberOfExportRows);

    // actions
    const handleInputNumberChange = (value: number) => {
        dispatch(doSetNumberOfExportRows(value));
    }

    return (
        <ErrorTooltip message={errorMessage}>
            <InputNumber
                min={MIN_NUMBER_EXPORT_ROWS}
                max={MAX_NUMBER_EXPORT_ROWS}
                value={numOfExportRows}
                validateStatus={isNullOrWhiteSpace(errorMessage) ? 'default' : 'error'}
                onChange={handleInputNumberChange}
                suffix={size === 'large' ? intl.formatMessage({id: 'toolbar.numOfRowInput.suffix'}) : null}
                defaultValue={1}
                placeholder={size === 'small' ? intl.formatMessage({id: 'toolbar.numOfRowInput.suffix'}) : null}
                style={{
                    width: size === 'large' ?
                        '150px' : '100px', marginRight: '9px'
                }}
            />
        </ErrorTooltip>
    )
}

