import React, {useMemo} from "react";
import styles from './TablePreviewer.module.css';
import {useDispatch, useSelector} from "react-redux";
import {Table} from "@douyinfe/semi-ui";
import {selectDataFields, selectDataFieldsSortableIdsList} from "@/reducers/workspace/workspaceSelectors";
import {selectPreviewData} from "@/reducers/workspace/workspaceSelectors";
import {DataField} from "@/types/generator";
import {doGeneratePreviewData} from "@/reducers/workspace/workspaceActions";


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
                {dataFieldsSortableList.map((fieldId: string) => {
                    const field: DataField = dataFields[fieldId];
                    return field.isDraft ? null : <Table.Column
                            key={fieldId}
                            dataIndex={fieldId}
                            title={field.fieldName}
                            render={(value: any) => {
                                return <>{value?value.stringValue:""}</>
                            }}
                        />
                })}
            </Table>
        </div>
    )
}