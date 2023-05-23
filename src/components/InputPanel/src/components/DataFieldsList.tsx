import React, {useRef} from 'react';
import {Button, Empty, List} from "@douyinfe/semi-ui";
import {DataFieldsListItem} from "./DataFieldsListItem";
import styles from './DataFieldsList.module.scss';
import {reorder} from "@/utils/listUtils";
import {IconPlus} from "@douyinfe/semi-icons";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "@/types/system";
import {doUpdateDataFields} from "@/reducers/workspace/workspaceActions";
import {UUID} from "uuidjs";
import {DataField} from "@/types/generator";
import {useIntl} from "@/locale";
import {ComponentSize} from "@/constants/enums";
import {DataTypeSelectModal} from "@/components/InputPanel/src/components/DataTypeSelectModal";

export interface InputFieldListProps {
    height: number;
    size?: ComponentSize;
}

export const DataFieldsList: React.FunctionComponent<InputFieldListProps> = ({...props}) => {
    const {height, size} = props;
    const dispatch = useDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const intl = useIntl();

    // store
    const dataFields = useSelector((state: Store) => state.workspace.dataFields);

    // actions
    const handleOnDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }
        if (result.destination.index === result.source.index) {
            return;
        }
        const newData: any[] = reorder(dataFields, result.source.index, result.destination.index);
        dispatch(doUpdateDataFields(newData));
    }

    const handleAddField = async () => {
        const newDataField: DataField = {
            id: UUID.generate(),
            isDraft: true,
        }
        await dispatch(doUpdateDataFields([...dataFields, newDataField]));
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }

    return (
        <div className={styles.dataFieldsList} style={{height: height}} ref={containerRef}>
            {
                dataFields.length !== 0 ? <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="droppable">
                            {provided => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    <List>
                                        {dataFields.map((item, index) =>
                                            <DataFieldsListItem size={size} key={item.id} index={index} id={item.id} dataField={item}/>
                                        )}
                                        {provided.placeholder}
                                        <div className={styles.dataFieldList__bottomButton}>
                                            <Button onClick={handleAddField} icon={<IconPlus/>}>
                                                {intl.formatMessage({id: "dataFields.list.addNewFieldButton.text"})}
                                            </Button>
                                        </div>
                                    </List>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext> :
                    <>
                        <Empty
                            title="No fields"
                            description="Let's start by creating your first field!"
                            style={{marginBottom: 24, textAlign: "center"}}
                        >

                            <Button onClick={handleAddField} icon={<IconPlus/>}>
                                {intl.formatMessage({id: "dataFields.list.addNewFieldButton.text"})}
                            </Button>
                        </Empty>
                    </>
            }

            <DataTypeSelectModal/>
        </div>
    )
};


