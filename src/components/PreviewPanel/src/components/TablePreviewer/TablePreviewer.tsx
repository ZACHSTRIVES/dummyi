import React, {useMemo} from "react";
import styles from './TablePreviewer.module.css';
import {useSelector} from "react-redux";
import {Store} from "@/types/system";
import {Radio, Table} from "@douyinfe/semi-ui";
import {DataField} from "@/types/generator";


export type TablePreviewerProps = {
    height?: number;
    width?: number;
}

export const TablePreviewer: React.FunctionComponent<TablePreviewerProps> = ({...props}) => {
    const {height, width} = props;
    const scroll = useMemo(() => ({y: height, x: width + 100}), [height, width]);

    // store
    const dataFields = useSelector((state: Store) => state.workspace.dataFields);
    const data = useSelector((state: Store) => state.preview.previewData);

    return (
        <div className={styles.tablePreview}>
           <Table scroll={scroll} dataSource={data} pagination={false}>
                {dataFields.map((field:DataField,index) => (
                    <Table.Column key={field.fieldName} dataIndex={field.fieldName} title={field.fieldName}/>
                ))}
            </Table>
        </div>
    )
}