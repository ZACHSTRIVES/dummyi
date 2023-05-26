import React from 'react';
import styles from './DataFieldsListItem.module.scss';
import {Input, Divider, Button, InputNumber, Typography} from "@douyinfe/semi-ui";
import {IconClose, IconHandle, IconSetting} from "@douyinfe/semi-icons";
import {Draggable} from "react-beautiful-dnd";
import {DataField} from "@/types/generator";
import {useDispatch, useSelector} from "react-redux";
import {
    doOpenDataTypeOptionsModal,
    doOpenDataTypeSelectModal,
    doUpdateDataFields
} from "@/reducers/workspace/workspaceActions";
import {FormattedMessage} from "@/locale";
import {ComponentSize} from "@/constants/enums";
import {getGeneratorByDataType} from "@/utils/generatorUtils";
import {selectDataFields} from "@/reducers/workspace/workspaceSelectors";

export interface DataFieldsListItemItemProps {
    id: string;
    index: number;
    dataField: DataField;
    size?: ComponentSize;
}

export const DataFieldsListItem: React.FunctionComponent<DataFieldsListItemItemProps> = ({...props}) => {
    const {id, index, dataField, size} = props;
    const {Text} = Typography;
    const dispatch = useDispatch();

    // store
    const dataFields = useSelector(selectDataFields);

    const getItemStyle = (isDragging, draggableStyle) => ({
        backgroundColor: isDragging ? "rgba(var(--semi-grey-0), 0.5)" : null,
        ...draggableStyle
    })

    // actions
    const handleUpdateDataField = (changedFieldName: string, value: any) => {
        const newDataFields = dataFields.map(field => {
            if (field.id === id) {
                field = {...field, [changedFieldName]: value};
                field.isDraft = !(field.dataType && field.fieldName);
                return field;
            }
            return field;
        });
        dispatch(doUpdateDataFields(newDataFields));
    }

    const handleDelete = () => {
        const newDataFields = dataFields.filter(field => field.id !== id);
        dispatch(doUpdateDataFields(newDataFields));
    }

    const handleOpenDataTypeSelectModal = () => {
        dispatch(doOpenDataTypeSelectModal(dataField));
    }

    const handleOpenDataTypeOptionsModal = () => {
        dispatch(doOpenDataTypeOptionsModal(dataField));
    }

    // renders
    const DataTypeConfigs = () => {
        if (!dataField.dataType) return null;
        const generator = getGeneratorByDataType(dataField.dataType);
        return generator.configComponent ? React.createElement(generator.configComponent) : null;
    }

    const EmptyRateInput = () => {
        return <div className={styles.dataFieldItem__column}>
            <Text style={{fontWeight: 'normal', fontSize: 'small', marginLeft: '6px'}}>
                <FormattedMessage id={'dataFields.input.emptyRate.label'}/>
            </Text>

            <InputNumber
                onChange={(value) => handleUpdateDataField('emptyRate', value)}
                min={0}
                max={100}
                suffix={"%"}
                value={dataField.emptyRate}
                style={{width: '100px'}}
            />
        </div>
    }

    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <>
                    <div
                        className={styles.dataFieldItem}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
                        <div>
                            <div className={styles.dataFieldItem__content}>
                                <div className={styles.dataFieldItem__header} {...provided.dragHandleProps}>
                                    <IconHandle size="large" style={{cursor: 'move'}}/>
                                    <div>#{index + 1}</div>
                                </div>

                                <div className="generatorConfig_column">
                                    <Text className='generatorConfig_column__label'>
                                        <FormattedMessage id="dataFields.input.fieldName.label"/>
                                    </Text>
                                    <Input
                                        onChange={(value) => handleUpdateDataField('fieldName', value)}
                                        value={dataField.fieldName}
                                        style={{width: '100px'}}
                                    />
                                </div>

                                <div className="generatorConfig_column">
                                    <Text className='generatorConfig_column__label'>
                                        <FormattedMessage id="dataFields.input.type.label"/>
                                    </Text>
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
                                        <EmptyRateInput/>
                                        {size !== ComponentSize.LARGE && <div className="generatorConfig_column">
                                            <Text className='generatorConfig_column__label'>
                                                Options
                                            </Text>
                                            <Button onClick={handleOpenDataTypeOptionsModal}
                                                    icon={<IconSetting style={{color: 'grey'}}/>}/>
                                        </div>}
                                    </>
                                )}

                                {size === ComponentSize.LARGE && <DataTypeConfigs/>}

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
                </>
            )}

        </Draggable>

    )
}