import React from 'react';
import {Button, Modal} from "@douyinfe/semi-ui";
import {useDispatch, useSelector} from "react-redux";
import {
    selectEstimatedFileSize,
    selectExportFileName,
    selectExportProcessStage,
    selectShowExportModal
} from "@/reducers/export/exportSelectors";
import {doSetExportProcessStage, doSetShowExportModal} from "@/reducers/export/exportActions";
import {FormattedMessage} from "@/locale";
import {selectExportFormat, selectNumberOfExportRows} from "@/reducers/workspace/workspaceSelectors";
import {ExportPreview} from "@/components/Exporter/src/ExportPreview";
import {ExportProcessStage} from "@/constants/enums";
import {ExportProgressDash} from "@/components/Exporter/src/ExportProgressDash";


export interface ExportModalProps {
}

export const ExportModal: React.FunctionComponent<ExportModalProps> = () => {
    const dispatch = useDispatch();

    // state
    const visible = useSelector(selectShowExportModal);
    const estimatedSize = useSelector(selectEstimatedFileSize);
    const format = useSelector(selectExportFormat);
    const exportFileName = useSelector(selectExportFileName);
    const exportNumOfRows = useSelector(selectNumberOfExportRows);
    const exportProcessStage = useSelector(selectExportProcessStage);



    // action
    const onCancel = () => {
        dispatch(doSetShowExportModal(false));
    }

    const onGenerate = () => {
        dispatch(doSetExportProcessStage(ExportProcessStage.GENERATING));
    }

    // render
    const renderModalContent = () => {
        switch (exportProcessStage) {
            case ExportProcessStage.PREVIEW:
                return <ExportPreview exportNumOfRows={exportNumOfRows}
                                      exportFileName={exportFileName}
                                      estimatedSize={estimatedSize}
                                      format={format}/>
            case ExportProcessStage.GENERATING:
                return <ExportProgressDash/>

        }
    }

    const renderModalFooter = () => {
        switch (exportProcessStage) {
            case ExportProcessStage.PREVIEW:
                return <>
                    <Button onClick={onCancel}>
                        <FormattedMessage id={'export.modal.cancel.button.text'}/>
                    </Button>
                    <Button theme={'solid'} onClick={onGenerate}>
                        <FormattedMessage id={'export.modal.generate.button.text'}/>
                    </Button>
                </>
            case ExportProcessStage.GENERATING:
                return <>
                    <Button onClick={onCancel}>
                        <FormattedMessage id={'export.modal.cancel.button.text'}/>
                    </Button>
                    <Button theme={'solid'}>
                        <FormattedMessage id={'export.modal.generate.button.text'}/>
                    </Button>
                </>
        }
    }

    return (
        <Modal
            style={{width: '90%', maxWidth: '420px'}}
            visible={visible}
            title={<FormattedMessage id={'export.modal.title'}/>}
            onCancel={onCancel}
            footer={renderModalFooter()}
        >
            {renderModalContent()}
        </Modal>
    )
}