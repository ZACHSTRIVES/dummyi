import React from 'react';
import styles from './DataFieldItem.module.scss';
import {Form, Input, Typography, List, Divider} from "@douyinfe/semi-ui";
import {IconHandle} from "@douyinfe/semi-icons";
import {Draggable} from "react-beautiful-dnd";

export interface DataFieldItemProps {
    id: string;
    index: number;
}

export const DataFieldItem: React.FunctionComponent<DataFieldItemProps> = ({...props}) => {
    const {id, index} = props;
    const {Label} = Form;
    const {Text} = Typography;

    const getItemStyle = (isDragging, draggableStyle) => ({
        backgroundColor: isDragging ? "rgba(var(--semi-grey-0), 0.5)" : null,
        ...draggableStyle
    })

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
                                value={`Field ${id}`}
                                style={{width: '120px'}}
                            />
                        </div>

                        <div className={styles.dataFieldItem__column}>
                            <Label style={{fontWeight: 'normal', fontSize: 'small', marginLeft: '6px'}}>
                                Type
                            </Label>
                            <Input
                                value={'Person Name'}
                                style={{width: '120px'}}
                            />
                        </div>
                    </div>
                    <Divider style={{marginTop: "12px"}}/>
                </div>
            )}
        </Draggable>
    )
}