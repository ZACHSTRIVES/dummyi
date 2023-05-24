import React from 'react';
import styles from './DataFieldsListItem.module.scss';
import {Form, Input, Divider, Button, InputNumber} from "@douyinfe/semi-ui";
import {IconClose, IconHandle, IconSetting} from "@douyinfe/semi-icons";
import {Draggable} from "react-beautiful-dnd";
import {DataField} from "@/types/generator";
import {Store} from "@/types/system";
import {useDispatch, useSelector} from "react-redux";
import {doOpenDataTypeSelectModal, doUpdateDataFields} from "@/reducers/workspace/workspaceActions";
import {FormattedMessage} from "@/locale";
import {ComponentSize} from "@/constants/enums";

export interface DataFieldsListItemItemProps {
    id: string;
    index: number;
    dataField: DataField;
    size?: ComponentSize;
}

export const DataFieldsListItem: React.FunctionComponent<DataFieldsListItemItemProps> = ({...props}) => {
    const {id, index, dataField, size} = props;
    const {Label} = Form;
    const dispatch = useDispatch();

    // store
    const dataFields = useSelector((state: Store) => state.workspace.dataFields);

    const getItemStyle = (isDragging, draggableStyle) => ({
        backgroundColor: isDragging ? "rgba(var(--semi-grey-0), 0.5)" : null,
        ...draggableStyle
    })

    // actions
    const handleUpdateDataField = (changedFieldName: string, value: any) => {
        const newDataFields = dataFields.map(field => {
            if (field.id === id) {
                field = {...field, [changedFieldName]: value};
                if (field.dataType && field.fieldName) {
                    field.isDraft = false;
                } else {
                    field.isDraft = true;
                }
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

    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <div className={styles.dataFieldItem}
                     ref={provided.innerRef}
                     {...provided.draggableProps}
                     style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                >
                    <div className={styles.dataFieldItem__content}>
                        <div className={styles.dataFieldItem__header} {...provided.dragHandleProps}>
                            <IconHandle size={'large'} style={{cursor: "move"}}/>
                            <div>#{index + 1}</div>
                        </div>

                        <div className={styles.dataFieldItem__column}>
                            <Label style={{fontWeight: 'normal', fontSize: 'small', marginLeft: '6px'}}>
                                <FormattedMessage id='dataFields.input.fieldName.label'/>
                            </Label>
                            <Input
                                onChange={(value) => handleUpdateDataField('fieldName', value)}
                                value={dataField.fieldName}
                                style={{width: '100px'}}
                            />
                        </div>

                        <div className={styles.dataFieldItem__column}>
                            <Label style={{fontWeight: 'normal', fontSize: 'small', marginLeft: '6px'}}>
                                <FormattedMessage id='dataFields.input.type.label'/>
                            </Label>
                            <Button onClick={handleOpenDataTypeSelectModal}
                                    style={{width: 140, fontSize: '13px', fontWeight: 'normal'}}
                            >
                                <FormattedMessage id={`dataType.${dataField.dataType}`}/>
                            </Button>
                        </div>

                        <div className={styles.dataFieldItem__column}>
                            <Label style={{fontWeight: 'normal', fontSize: 'small', marginLeft: '6px'}}>
                                <FormattedMessage id={'dataFields.input.emptyRate.label'}/>
                            </Label>

                            <InputNumber
                                onChange={(value) => handleUpdateDataField('emptyRate', value)}
                                min={0}
                                max={100}
                                suffix={"%"}
                                value={dataField.emptyRate}
                                style={{width: '100px'}}
                            />

                        </div>

                        <div className={styles.dataFieldItem__column}>
                            <Button onClick={handleDelete} style={{color: '#c7c4c4'}} theme={'borderless'}
                                    icon={<IconClose/>}/>
                            <Button onClick={() => {
                            }} style={{color: '#c7c4c4'}} theme={'borderless'}
                                    icon={<IconSetting/>}/>
                        </div>

                        {dataField.isDraft&&  <div className={styles.dataFieldItem__column}>
                            <Label style={{fontWeight: 'normal', fontSize: 'small', marginLeft: '6px'}}>
                                测试TEMP
                            </Label>
                            这是Draft
                        </div>}



                    </div>
                    <Divider style={{marginTop: "12px"}}/>
                </div>
            )}
        </Draggable>
    )
}