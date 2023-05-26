import React from 'react';
import {Button, InputNumber, Modal, Typography} from "@douyinfe/semi-ui";
import {useDispatch, useSelector} from "react-redux";
import {
    selectCurrentDataTypeOptionsModalTargetField,
    selectShowDataTypeOptionsModal
} from "@/reducers/workspace/workspaceSelectors";
import {getGeneratorByDataType} from "@/utils/generatorUtils";
import {doCloseDataTypeOptionsModal} from "@/reducers/workspace/workspaceActions";
import {ComponentSize} from "@/constants/enums";
import {FormattedMessage} from "@/locale";

export interface DataTypeConfigModalProps {
    size: ComponentSize;
}

export const DataTypeConfigModal: React.FunctionComponent<DataTypeConfigModalProps> = ({...props}) => {
    const {size} = props;
    const {Text} = Typography;

    // store
    const open = useSelector(selectShowDataTypeOptionsModal);
    const dataField = useSelector(selectCurrentDataTypeOptionsModalTargetField);
    const dispatch = useDispatch();

    // action
    const handleCancel = () => {
        dispatch(doCloseDataTypeOptionsModal());
    }
    // render
    const DataTypeConfigs = () => {
        if (!dataField.dataType) return null;
        const generator = getGeneratorByDataType(dataField.dataType);
        return generator.configComponent ? React.createElement(generator.configComponent) : null;
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
            style={{width: '80%', maxWidth:'400px'}}
        >
            <div style={{marginBottom: '12px'}}>
                {(size === ComponentSize.SMALL && dataField)  && <div className="generatorConfig_column">
                    <Text className='generatorConfig_column__label'>
                        <FormattedMessage id={'dataFields.input.emptyRate.label'}/>
                    </Text>
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
                <DataTypeConfigs/>
            </div>
        </Modal>
    )
}

