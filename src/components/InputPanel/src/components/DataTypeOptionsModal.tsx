import React from 'react';
import {Button, Modal} from "@douyinfe/semi-ui";
import {useDispatch, useSelector} from "react-redux";
import {
    selectCurrentDataTypeOptionsModalTargetField,
    selectCurrentDataTypeOptionsModalTargetFieldId,
    selectShowDataTypeOptionsModal
} from "@/reducers/workspace/workspaceSelectors";
import {getGeneratorOptionsComponentByDataType} from "@/utils/generatorUtils";
import {doCloseDataTypeOptionsModal, doUpdateDataField} from "@/reducers/workspace/workspaceActions";
import {ComponentSize, ValueType} from "@/constants/enums";
import {FormattedMessage, useIntl} from "@/locale";
import {OptionsNumberInput} from "@/components/Utils";
import {isNullOrWhiteSpace} from "@/utils/stringUtils";
import {hasValue} from "@/utils/typeUtils";

export interface DataTypeOptionsModalProps {
    size: ComponentSize;
}

export const DataTypeOptionsModal: React.FunctionComponent<DataTypeOptionsModalProps> = ({...props}) => {
    const {size} = props;
    const intl = useIntl();

    // store
    const open = useSelector(selectShowDataTypeOptionsModal);
    const dataField = useSelector(selectCurrentDataTypeOptionsModalTargetField);
    const dataFieldId = useSelector(selectCurrentDataTypeOptionsModalTargetFieldId)
    const dispatch = useDispatch();

    // action
    const handleCancel = () => {
        dispatch(doCloseDataTypeOptionsModal());
    }

    // renders
    const renderDataTypeOptions = () => {
        if (!dataField) return null;
        if (!dataField.dataType) return null;
        const OptionsComponent = getGeneratorOptionsComponentByDataType(dataField.dataType);
        return OptionsComponent ?
            <OptionsComponent options={dataField.dataTypeOptions}
                              handleOptionValueChange={handleOptionValueChange}/> : null;
    };

    // actions
    const handleOptionValueChange = (fieldName: string, value: any, valueType?: ValueType) => {
        let field = {...dataField, dataTypeOptions: {...dataField.dataTypeOptions, [fieldName]: value}};
        if (hasValue(valueType)) {
            field.valueType = valueType;
        }
        dispatch(doUpdateDataField(dataFieldId, field));
    };

    const handleEmptyRateChange = (value) => {
        const newDataField = {
            ...dataField,
            emptyRate: value
        };
        dispatch(doUpdateDataField(dataFieldId, newDataField));
    }

    // error validation
    const [emptyRateError, setEmptyRateError] = React.useState<string>(null);
    React.useEffect(() => {
        if (!dataField) return;
        if (isNullOrWhiteSpace(dataField.emptyRate.toString())) {
            setEmptyRateError(intl.formatMessage({id: 'dataFields.input.emptyRate.errorMessage.empty'}));
        } else {
            setEmptyRateError(null);
        }
    }, [dataField?.emptyRate]);

    return (
        <Modal
            onCancel={handleCancel}
            title="Options"
            visible={open}
            footer={
                <Button onClick={handleCancel} style={{width: '100px'}}>
                    Cancel
                </Button>
            }
            style={{width: '80%', maxWidth: '400px'}}
        >
            <div style={{marginBottom: '12px'}}>
                {(size === ComponentSize.SMALL && dataField) && <OptionsNumberInput
                    label={<FormattedMessage id={'dataFields.input.emptyRate.label'}/>}
                    value={dataField.emptyRate}
                    onChange={handleEmptyRateChange}
                    style={{width: '100px'}}
                    suffix={"%"}
                    infoTooltip={<FormattedMessage id={'dataFields.input.emptyRate.tooltip'}/>}
                    errorMessage={emptyRateError}
                    min={0}
                    max={100}
                />}
                {renderDataTypeOptions()}
            </div>
        </Modal>
    )
}

