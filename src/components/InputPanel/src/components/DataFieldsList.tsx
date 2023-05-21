import React from 'react';
import {Button, List} from "@douyinfe/semi-ui";
import {DataFieldItem} from "./DataFieldItem";
import styles from './DataFieldsList.module.scss';
import {reorder} from "@/utils/listUtils";
import {IconPlus} from "@douyinfe/semi-icons";
import {DragDropContext, Droppable} from "react-beautiful-dnd";

export interface InputFieldListProps {
    height: number;
}

export const DataFieldsList: React.FunctionComponent<InputFieldListProps> = ({...props}) => {
    const {height} = props;
    const [data, setData] = React.useState([
        {id: '1', content: 'First task'},
        {id: '2', content: 'Second task'},
        {id: '3', content: 'Third task'},
        {id: '4', content: 'Fourth task'},
        {id: '5', content: 'Fifth task'},
        {id: '6', content: 'Sixth task'},
        {id: '7', content: 'Seventh task'},
        {id: '8', content: 'Eighth task'},
        {id: '9', content: 'Ninth task'},
        {id: '10', content: 'Tenth task'}
    ]);

    const handleOnDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const newData: any[] = reorder(data, result.source.index, result.destination.index);
        setData(newData);

    }

    return (
        <div className={styles.dataFieldsList} style={{height: height}}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="droppable">
                    {provided => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <List>
                                {data.map((item, index) =>
                                    <DataFieldItem key={item.id} index={index} id={item.id}/>
                                )}
                                {provided.placeholder}
                            </List>

                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div className={styles.dataFieldList__bottomButton}>
                <Button icon={<IconPlus/>}>Add field</Button>
            </div>
        </div>
    )
};


