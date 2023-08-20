import React, {useEffect, useState} from 'react';
import {Button, Modal} from "@douyinfe/semi-ui";
import {useDispatch, useSelector} from "react-redux";
import {
    selectCurrentNumOfRowsGenerated,
    selectEstimatedFileSize,
    selectExportFileName,
    selectExportProcessStage,
    selectShowExportModal,
    selectSparkLineData,
    selectTimeElapsed
} from "@/reducers/export/exportSelectors";
import {doOnBatchComplete, doSetExportProcessStage, doSetShowExportModal,} from "@/reducers/export/exportActions";
import {FormattedMessage} from "@/locale";
import {
    selectDataFields,
    selectDataFieldsSortableIdsList,
    selectExportFormat,
    selectNumberOfExportRows
} from "@/reducers/workspace/workspaceSelectors";
import {ExportPreview} from "@/components/Exporter/src/ExportPreview";
import {ExportProcessStage} from "@/constants/enums";
import {ExportDash} from "@/components/Exporter/src/ExportDash";
import {batchGenerateData} from "@/utils/generatorUtils";
import {GenerateDataBatchCompletedCallbackResponse} from "@/types/generator";

export const ExportModal: React.FunctionComponent = () => {
    const dispatch = useDispatch();

    // state
    const [totalTimerSeconds, setTotalTimerSeconds] = useState(0);

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
    const totalNumOfRowsGenerated = useSelector(selectCurrentNumOfRowsGenerated);
    const timeElapsed = useSelector(selectTimeElapsed);

    // effect
    useEffect(() => {
        let interval = null;

        if (exportProcessStage == ExportProcessStage.GENERATING) {
            interval = setInterval(() => {
                setTotalTimerSeconds((prevTotalSeconds) => prevTotalSeconds + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [exportProcessStage]);

    // render
    const renderModalContent = () => {
        if (exportProcessStage == ExportProcessStage.PREVIEW) {
            return <ExportPreview exportNumOfRows={exportNumOfRows}
                                  exportFileName={exportFileName}
                                  estimatedSize={estimatedSize}
                                  format={format}/>
        } else {
            return <ExportDash currentExportedRows={totalNumOfRowsGenerated}
                               exportRows={exportRows}
                               sparkLineData={sparkLineData}
                               timeElapsed={totalTimerSeconds}/>
        }
    }

    // action
    const onCloseModal = () => {
        dispatch(doSetShowExportModal(false));
    }

    // generate
    const onGenerate = async () => {
        dispatch(doSetExportProcessStage(ExportProcessStage.GENERATING));
        await batchGenerateData(dataFields, sortableIdList, exportRows, onBatchCompleteCallback);
        dispatch(doSetExportProcessStage(ExportProcessStage.COMPLETED));
    }

    const onBatchCompleteCallback = async (data: GenerateDataBatchCompletedCallbackResponse) => {
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
                style={{width: '90%', maxWidth: '460px'}}
                className={'no-select-area'}
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