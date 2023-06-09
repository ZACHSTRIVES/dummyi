import React, {useMemo} from "react";
import styles from './TablePreviewer.module.scss';
import {useSelector} from "react-redux";
import {Button, Table, Toast} from "@douyinfe/semi-ui";
import {selectDataFields, selectDataFieldsSortableIdsList} from "@/reducers/workspace/workspaceSelectors";
import {selectPreviewData} from "@/reducers/workspace/workspaceSelectors";
import {DataField} from "@/types/generator";
import {IconCopy} from "@douyinfe/semi-icons";
import {useIntl} from "@/locale";

export type TablePreviewerProps = {
    height?: number;
    width?: number;
}

export const TablePreviewer: React.FunctionComponent<TablePreviewerProps> = ({...props}) => {
    const {height, width} = props;
    const scroll = useMemo(() => ({y: height, x: width + 100}), [height, width]);
    const intl = useIntl();

    // store
    const dataFields = useSelector(selectDataFields);
    const dataFieldsSortableList = useSelector(selectDataFieldsSortableIdsList);
    const data = useSelector(selectPreviewData);
    const [hoveredFieldId, setHoveredFieldId] = React.useState(null);
    const [hoveredRowIndex, setHoveredRowIndex] = React.useState(null);

    const handleMouseEnter = (id, row) => {
        setHoveredFieldId(id);
        setHoveredRowIndex(row);
    };

    const handleMouseLeave = () => {
        setHoveredFieldId(null);
        setHoveredRowIndex(null);
    };

    const copyToClipboard = (text:string) => {
        navigator.clipboard.writeText(text).then(()=>{
            Toast.success(intl.formatMessage({id: "preview.setting.copyToClipboard.notification.content"}));
        });
    }

    // render
    const renderTableColumn = (value, index, fieldId) => {
        const displayValue = value ? value.stringValue : "";
        return (
            <div className={styles.tablePreview_column} onMouseEnter={() => handleMouseEnter(fieldId, index)}
                 onMouseLeave={handleMouseLeave}>
                <div>
                    {displayValue}
                </div>

                {hoveredFieldId === fieldId && hoveredRowIndex === index && (
                    <div>
                        <Button
                            onClick={() => copyToClipboard(displayValue)}
                            className={styles.tablePreview_column__iconButton}
                            theme={'borderless'}
                            icon={<IconCopy size={'small'} style={{color:'gray'}}/>}
                            size={'small'}/>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className={styles.tablePreview}>
            <Table scroll={scroll} dataSource={data} pagination={false}>
                {dataFieldsSortableList.map((fieldId: string) => {
                    const field: DataField = dataFields[fieldId];
                    return field.isDraft ? null : <Table.Column
                        key={fieldId}
                        dataIndex={fieldId}
                        title={field.fieldName}
                        render={(text, record, index) => renderTableColumn(text, index, fieldId)}
                    />
                })}
            </Table>
        </div>
    )
}