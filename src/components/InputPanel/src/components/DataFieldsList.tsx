import React, {useRef} from 'react';
import {Button, Empty} from "@douyinfe/semi-ui";
import {DataFieldsListItem} from "./DataFieldsListItem";
import styles from './DataFieldsList.module.scss';
import {reorder} from "@/utils/listUtils";
import {IconPlus} from "@douyinfe/semi-icons";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {useDispatch, useSelector} from "react-redux";
import {doAddNewDataField, doSortDataFields} from "@/reducers/workspace/workspaceActions";
import {FormattedMessage} from "@/locale";
import {ComponentSize} from "@/constants/enums";
import {DataTypeSelectModal} from "@/components/InputPanel/src/components/DataTypeSelectModal";
import {DataTypeOptionsModal} from "@/components/InputPanel/src/components/DataTypeOptionsModal";
import {
    selectDataFields,
    selectDataFieldsSortableIdsList,
    selectNumbersOfDataFields
} from "@/reducers/workspace/workspaceSelectors";

export interface InputFieldListProps {
    height: number;
    size?: ComponentSize;
}

export const DataFieldsList: React.FunctionComponent<InputFieldListProps> = ({...props}) => {
    const {height, size} = props;
    const dispatch = useDispatch();
    const containerRef = useRef<HTMLDivElement>(null);

    // store
    const dataFields = useSelector(selectDataFields);
    const sortableDataFieldsIds = useSelector(selectDataFieldsSortableIdsList);
    const numberOfDataFields = useSelector(selectNumbersOfDataFields);

    // actions
    const handleOnDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }
        if (result.destination.index === result.source.index) {
            return;
        }
        const newData: any[] = reorder(sortableDataFieldsIds, result.source.index, result.destination.index);
        dispatch(doSortDataFields(newData));
    }

    const handleAddField = () => {
        dispatch(doAddNewDataField());
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }

    return (
        <div className={styles.dataFieldsList} style={{height: height}} ref={containerRef}>
            {
                numberOfDataFields !== 0 ? <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="droppable">
                            {provided => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {sortableDataFieldsIds.map((id, index) => {
                                            const dataField = dataFields[id];
                                            return <DataFieldsListItem size={size} key={id} index={index} id={id}
                                                                       dataField={dataField}/>
                                        }
                                    )}
                                    {provided.placeholder}
                                    <div className={styles.dataFieldList__bottomButton}>
                                        <Button onClick={handleAddField} icon={<IconPlus/>}>
                                            <FormattedMessage id={"dataFields.list.addNewFieldButton.text"}/>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext> :
                    <>
                        <Empty
                            title={<FormattedMessage id={"dataFields.list.noDataFields.text"}/>}
                            description={<FormattedMessage id={"dataFields.list.createFirstField.text"}/>}
                            style={{marginBottom: 24, textAlign: "center"}}
                        >

                            <Button onClick={handleAddField} icon={<IconPlus/>}>
                                <FormattedMessage id={"dataFields.list.addNewFieldButton.text"}/>
                            </Button>
                        </Empty>
                    </>
            }
            <DataTypeSelectModal/>
            <DataTypeOptionsModal size={size}/>
        </div>
    )
};


