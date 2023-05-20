import React, {useMemo} from "react";
import styles from './TablePreviewer.module.css';
import {useSelector} from "react-redux";
import {Store} from "@/types/system";
import {Radio, Table} from "@douyinfe/semi-ui";


export type TablePreviewerProps = {
    height?: number;
    width?: number;
}

export const TablePreviewer: React.FunctionComponent<TablePreviewerProps> = ({...props}) => {
    const {height,width} = props;
    const scroll = useMemo(() => ({ y: height,x:width+100}), [height,width]);

    // store
    const data = useSelector((state: Store) => state.preview.tableViewContent);

    return (
        <div className={styles.tablePreview}>
            {data.length > 0 && <Table   scroll={scroll} dataSource={data} pagination={false}>
                {Object.entries(data[0]).map(([key, value]) => (
                    <Table.Column key={key} title={key} dataIndex={key}/>
                ))}
            </Table>}
        </div>
    )
}