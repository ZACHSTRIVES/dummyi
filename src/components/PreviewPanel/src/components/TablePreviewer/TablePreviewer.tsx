import React, {useMemo} from "react";
import styles from './TablePreviewer.module.css';
import {useSelector} from "react-redux";
import {Table} from "@douyinfe/semi-ui";
import {selectDataFields, selectDataFieldsSortableIdsList} from "@/reducers/workspace/workspaceSelectors";
import {selectPreviewData} from "@/reducers/preview/previewSelectors";


export type TablePreviewerProps = {
    height?: number;
    width?: number;
}

export const TablePreviewer: React.FunctionComponent<TablePreviewerProps> = ({...props}) => {
    const {height, width} = props;
    const scroll = useMemo(() => ({y: height, x: width + 100}), [height, width]);

    // store
    const dataFields = useSelector(selectDataFields);
    const dataFieldsSortableList = useSelector(selectDataFieldsSortableIdsList);
    const data = useSelector(selectPreviewData);


    return (
        <div className={styles.tablePreview}>
            <Table scroll={scroll} dataSource={data} pagination={false}>
                {dataFieldsSortableList.map((fieldId: string, index) => {
                    const field = dataFields[fieldId];
                    return <Table.Column key={field.fieldName} dataIndex={field.fieldName} title={field.fieldName}/>
                })}
            </Table>
        </div>
    )
}