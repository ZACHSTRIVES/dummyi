import React from "react";
import styles from './TablePreviewer.module.css';
import {useSelector} from "react-redux";
import {Store} from "@/types/system";
import {Radio, Table} from "@douyinfe/semi-ui";


export type TablePreviewerProps = {}

export const TablePreviewer: React.FunctionComponent<TablePreviewerProps> = () => {

    // store
    const data = useSelector((state: Store) => state.preview.tableViewContent);

    return (
        <div className={styles.tablePreview}>
            {data.length > 0 && <Table dataSource={data} pagination={false}>
                {Object.entries(data[0]).map(([key, value]) => (
                    <Table.Column key={key} title={key} dataIndex={key}/>
                ))}
            </Table>}
        </div>
    )
}