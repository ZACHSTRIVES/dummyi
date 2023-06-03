import React from 'react';
import styles from './DataFieldsListItem.module.scss';
import {Input, Divider, Button, InputNumber} from "@douyinfe/semi-ui";
import {IconClose, IconHandle, IconSetting} from "@douyinfe/semi-icons";
import {Draggable} from "react-beautiful-dnd";
import {DataField} from "@/types/generator";
import {useDispatch} from "react-redux";
import {
    doDeleteDataField,
    doOpenDataTypeOptionsModal,
    doOpenDataTypeSelectModal,
    doUpdateDataField,
} from "@/reducers/workspace/workspaceActions";
import {FormattedMessage} from "@/locale";
import {ComponentSize} from "@/constants/enums";
import {getGeneratorOptionsComponentByDataType} from "@/utils/generatorUtils";

export interface DataFieldsListItemItemProps {
    id: string;
    index: number;
    dataField: DataField;
    size?: ComponentSize;
}

export const DataFieldsListItem: React.FunctionComponent<DataFieldsListItemItemProps> = ({...props}) => {
    const {id, index, dataField, size} = props;
    const dispatch = useDispatch();

    const getItemStyle = (isDragging, draggableStyle) => ({
        backgroundColor: isDragging ? "rgba(var(--semi-grey-0), 0.5)" : null,
        ...draggableStyle
    });

    // actions
    const handleUpdateDataField = (changedFieldName: string, value: any) => {
        const field = {...dataField, [changedFieldName]: value};
        dispatch(doUpdateDataField(id, field));
    };

    const handleOptionsChange = (options: any) => {
        const field = {...dataField, dataTypeOptions: options};
        handleUpdateDataField('dataTypeOptions', options);
    }

    const handleDelete = () => {
        dispatch(doDeleteDataField(id));
    };

    const handleOpenDataTypeSelectModal = () => {
        dispatch(doOpenDataTypeSelectModal(id));
    };

    const handleOpenDataTypeOptionsModal = () => {
        dispatch(doOpenDataTypeOptionsModal(id));
    };

    // renders
    const renderDataTypeOptions = () => {
        if (!dataField.dataType) return null;
        const OptionsComponent = getGeneratorOptionsComponentByDataType(dataField.dataType);
        return OptionsComponent ?
            <OptionsComponent options={dataField.dataTypeOptions} onOptionsChange={handleOptionsChange}/> : null;
    };

    const renderEmptyRateInput = () => {
        return (<div className="generatorConfig_column">
            <div className='generatorConfig_column__label'>
                <FormattedMessage id={'dataFields.input.emptyRate.label'}/>
            </div>

            <InputNumber
                onChange={(value) => handleUpdateDataField('emptyRate', value)}
                min={0}
                max={100}
                suffix={"%"}
                value={dataField.emptyRate}
                style={{width: '100px'}}
            />
        </div>)
    };

    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef}
                     {...provided.draggableProps}
                     style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                    <div className={styles.dataFieldItem}>
                        <div>
                            <div className={styles.dataFieldItem__content}>
                                <div className={styles.dataFieldItem__header} {...provided.dragHandleProps}>
                                    <IconHandle size="large" style={{cursor: 'move'}}/>
                                    <div>#{index + 1}</div>
                                </div>

                                <div className="generatorConfig_column">
                                    <div className='generatorConfig_column__label'>
                                        <FormattedMessage id="dataFields.input.fieldName.label"/>
                                    </div>
                                    <Input
                                        onChange={(value) => handleUpdateDataField('fieldName', value)}
                                        value={dataField.fieldName}
                                        style={{width: '100px'}}
                                    />
                                </div>

                                <div className="generatorConfig_column">
                                    <div className='generatorConfig_column__label'>
                                        <FormattedMessage id="dataFields.input.type.label"/>
                                    </div>
                                    <Button
                                        onClick={handleOpenDataTypeSelectModal}
                                        style={{width: 140, fontSize: '13px', fontWeight: 'normal'}}
                                    >
                                        {dataField.dataType ?
                                            <FormattedMessage id={`dataType.${dataField.dataType}`}/> :
                                            <FormattedMessage id={`dataFields.input.type.placeholder`}/>}
                                    </Button>
                                </div>

                                {size !== ComponentSize.SMALL && (
                                    <>
                                        {renderEmptyRateInput()}
                                        {size !== ComponentSize.LARGE && <div className="generatorConfig_column">
                                            <div className='generatorConfig_column__label'>
                                                <FormattedMessage id="dataFields.input.options.label"/>
                                            </div>
                                            <Button
                                                style={{width: 80}}
                                                onClick={handleOpenDataTypeOptionsModal}
                                                icon={<IconSetting style={{color: 'grey'}}/>
                                                }/>
                                        </div>}
                                    </>
                                )}

                                {size === ComponentSize.LARGE && renderDataTypeOptions()}

                            </div>
                        </div>
                        <div>
                            <div className="generatorConfig_column">
                                <Button
                                    onClick={handleDelete}
                                    style={{color: '#c7c4c4'}}
                                    theme="borderless"
                                    icon={<IconClose/>}
                                />
                                {size === ComponentSize.SMALL && (
                                    <Button onClick={handleOpenDataTypeOptionsModal}
                                            style={{color: '#c7c4c4'}} theme="borderless" icon={<IconSetting/>}/>
                                )}
                            </div>
                        </div>
                    </div>
                    <Divider style={{marginTop: '12px'}}/>
                </div>
            )}

        </Draggable>

    )
}