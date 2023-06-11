import React from 'react';
import {Modal} from "@douyinfe/semi-ui";
import {useDispatch, useSelector} from "react-redux";
import {selectEstimatedFileSize, selectExportFileName, selectShowExportModal} from "@/reducers/export/exportSelectors";
import {doSetShowExportModal} from "@/reducers/export/exportActions";
import {FormattedMessage} from "@/locale";
import {selectExportFormat, selectNumberOfExportRows} from "@/reducers/workspace/workspaceSelectors";
import {ExportPreview} from "@/components/Exporter/src/ExportPreview";


export interface ExportModalProps {}

export const ExportModal: React.FunctionComponent<ExportModalProps> = () => {
    const dispatch = useDispatch();

    // state
    const visible = useSelector(selectShowExportModal);
    const estimatedSize = useSelector(selectEstimatedFileSize);
    const format = useSelector(selectExportFormat);
    const exportFileName = useSelector(selectExportFileName);
    const exportNumOfRows = useSelector(selectNumberOfExportRows);

    // action
    const onCancel = () => {
        dispatch(doSetShowExportModal(false));
    }

    return (
        <Modal
            style={{width: '90%', maxWidth: '420px'}}
            visible={visible}
            title={<FormattedMessage id={'export.modal.title'}/>}
            onCancel={onCancel}
            onOk={() => {
            }}
        >
            <ExportPreview
                exportNumOfRows={exportNumOfRows}
                exportFileName={exportFileName}
                estimatedSize={estimatedSize}
                format={format}
            />

            {/*<ExportProgressDash/>*/}
        </Modal>
    )
}