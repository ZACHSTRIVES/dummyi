import React from 'react';
import styles from './DataFieldItem.module.scss';
import {Form, Input, Typography, List, Divider, Button} from "@douyinfe/semi-ui";
import {IconClose, IconHandle} from "@douyinfe/semi-icons";
import {Draggable} from "react-beautiful-dnd";
import {DataField} from "@/types/generator";
import {DataTypeSelector} from "@/components/DataTypeSelector";
import {Store} from "@/types/system";
import {useDispatch, useSelector} from "react-redux";
import {doUpdateDataFields} from "@/reducers/workspace/workspaceActions";

export interface DataFieldItemProps {
    id: string;
    index: number;
    dataField:DataField;
}

export const DataFieldItem: React.FunctionComponent<DataFieldItemProps> = ({...props}) => {
    const {id, index,dataField} = props;
    const {Label} = Form;
    const dispatch = useDispatch();

    // store
    const dataFields = useSelector((state: Store) => state.workspace.dataFields);

    const getItemStyle = (isDragging, draggableStyle) => ({
        backgroundColor: isDragging ? "rgba(var(--semi-grey-0), 0.5)" : null,
        ...draggableStyle
    })

    // actions
    const handleDelete = () => {
        const newDataFields = dataFields.filter(field => field.id !== id);
        dispatch(doUpdateDataFields(newDataFields));
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
                                Field Name
                            </Label>
                            <Input
                                value={dataField.fieldName}
                                style={{width: '100px'}}
                            />
                        </div>

                        <div className={styles.dataFieldItem__column}>
                            <Label style={{fontWeight: 'normal', fontSize: 'small', marginLeft: '6px'}}>
                                Type
                            </Label>
                           <DataTypeSelector />
                        </div>

                        <div className={styles.dataFieldItem__column}>
                           <Button onClick={handleDelete} style={{color:'#c7c4c4'}} theme={'borderless'} icon={<IconClose/>}/>
                        </div>

                    </div>
                    <Divider style={{marginTop: "12px"}}/>
                </div>
            )}
        </Draggable>
    )
}