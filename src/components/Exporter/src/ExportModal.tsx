import React from 'react';
import {Button, Modal} from "@douyinfe/semi-ui";
import {useDispatch, useSelector} from "react-redux";
import {
    selectCurrentNumOfRowsGenerated, selectEstimatedFileSize,
    selectExportFileName, selectExportProcessStage, selectShowExportModal,
    selectSparkLineData, selectTimeElapsed
} from "@/reducers/export/exportSelectors";
import {doOnBatchComplete, doSetExportProcessStage, doSetShowExportModal} from "@/reducers/export/exportActions";
import {FormattedMessage} from "@/locale";
import {
    selectDataFields,
    selectDataFieldsSortableIdsList,
    selectExportFormat,
    selectNumberOfExportRows
} from "@/reducers/workspace/workspaceSelectors";
import {ExportPreview} from "@/components/Exporter/src/ExportPreview";
import {ExportProcessStage} from "@/constants/enums";
import {ExportProgressDash} from "@/components/Exporter/src/ExportProgressDash";
import {batchGenerateData} from "@/utils/generatorUtils";
import {GenerateDataBatchCompletedCallbackResponse} from "@/types/generator";

export const ExportModal: React.FunctionComponent = () => {
    const dispatch = useDispatch();

    // state
    const [totalNumOfRowsGenerated, setTotalNumOfRowsGenerated] = React.useState(0);
    const [timeElapsed, setTimeElapsed] = React.useState(0);

    // selectors
    const visible = useSelector(selectShowExportModal);
    const estimatedSize = useSelector(selectEstimatedFileSize);
    const format = useSelector(selectExportFormat);
    const exportFileName = useSelector(selectExportFileName);
    const exportNumOfRows = useSelector(selectNumberOfExportRows);
    const exportProcessStage = useSelector(selectExportProcessStage);
    const exportRows = useSelector(selectNumberOfExportRows);
    const sparkLineData = useSelector(selectSparkLineData);
    const sortableIdList = useSelector(selectDataFieldsSortableIdsList);
    const dataFields = useSelector(selectDataFields);

    // render
    const renderModalContent = () => {
        switch (exportProcessStage) {
            case ExportProcessStage.PREVIEW:
                return <ExportPreview exportNumOfRows={exportNumOfRows}
                                      exportFileName={exportFileName}
                                      estimatedSize={estimatedSize}
                                      format={format}/>
            case ExportProcessStage.GENERATING:
                return <ExportProgressDash currentExportedRows={totalNumOfRowsGenerated}
                                           exportRows={exportRows}
                                           sparkLineData={sparkLineData}
                                           timeElapsed={timeElapsed}/>
        }
    }

    // action
    const onCloseModal = () => {
        dispatch(doSetShowExportModal(false));
    }

    // generate
    const onGenerate = () => {
        dispatch(doSetExportProcessStage(ExportProcessStage.GENERATING));

            batchGenerateData(dataFields, sortableIdList, 9999999999999999999, onBatchCompleteCallback);
    }

    const onBatchCompleteCallback = async (data:GenerateDataBatchCompletedCallbackResponse) => {
        // setTimeElapsed(data.totalTimeElapsed);
        // setTotalNumOfRowsGenerated(data.totalNumOfRowsGenerated);
        dispatch(doOnBatchComplete(data))
    }

    // render
    const renderModalFooter = () => {
        switch (exportProcessStage) {
            case ExportProcessStage.PREVIEW:
                return <>
                    <Button onClick={onCloseModal}>
                        <FormattedMessage id={'export.modal.cancel.button.text'}/>
                    </Button>
                    <Button theme={'solid'} onClick={onGenerate}>
                        <FormattedMessage id={'export.modal.generate.button.text'}/>
                    </Button>
                </>
            case ExportProcessStage.GENERATING:
                return <>
                    <Button onClick={onCloseModal}>
                        <FormattedMessage id={'export.modal.cancel.button.text'}/>
                    </Button>
                    <Button theme={'solid'}>
                        <FormattedMessage id={'export.modal.generate.button.text'}/>
                    </Button>
                </>
        }
    }

    return (
        <>
            <Modal
                style={{width: '90%', maxWidth: '420px'}}
                visible={visible}
                title={<FormattedMessage id={'export.modal.title'}/>}
                onCancel={onCloseModal}
                footer={renderModalFooter()}
            >
                {renderModalContent()}
            </Modal>
        </>
    )
}