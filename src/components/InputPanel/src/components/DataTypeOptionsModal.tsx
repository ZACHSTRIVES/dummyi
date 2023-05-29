import React from 'react';
import {Button, InputNumber, Modal} from "@douyinfe/semi-ui";
import {useDispatch, useSelector} from "react-redux";
import {
    selectCurrentDataTypeOptionsModalTargetField,
    selectCurrentDataTypeOptionsModalTargetFieldId,
    selectShowDataTypeOptionsModal
} from "@/reducers/workspace/workspaceSelectors";
import {getGeneratorOptionsComponentByDataType} from "@/utils/generatorUtils";
import {doCloseDataTypeOptionsModal, doUpdateDataField} from "@/reducers/workspace/workspaceActions";
import {ComponentSize} from "@/constants/enums";
import {FormattedMessage} from "@/locale";

export interface DataTypeOptionsModalProps {
    size: ComponentSize;
}

export const DataTypeOptionsModal: React.FunctionComponent<DataTypeOptionsModalProps> = ({...props}) => {
    const {size} = props;

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
        if (!dataField.dataType) return null;
        const OptionsComponent = getGeneratorOptionsComponentByDataType(dataField.dataType);
        return OptionsComponent ?
            <OptionsComponent options={dataField.dataTypeOptions} onOptionsChange={handleDataFieldOptionsChange}/> : null;
    };

    // actions
    const handleDataFieldOptionsChange = (options) => {
        const newDataField = {
            ...dataField,
            dataTypeOptions: options
        };
        dispatch(doUpdateDataField(dataFieldId, newDataField));
    }

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
                {(size === ComponentSize.SMALL && dataField) && <div className="generatorConfig_column">
                    <div className='generatorConfig_column__label'>
                        <FormattedMessage id={'dataFields.input.emptyRate.label'}/>
                    </div>
                    <InputNumber
                        onChange={(value) => {
                        }}
                        min={0}
                        max={100}
                        suffix={"%"}
                        value={dataField.emptyRate}
                        style={{width: '100px'}}
                    />
                </div>}
                {renderDataTypeOptions()}
            </div>
        </Modal>
    )
}

