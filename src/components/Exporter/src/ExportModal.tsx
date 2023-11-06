import React, {useEffect, useState} from 'react';
import {Button, Modal, Progress, Toast, Typography} from "@douyinfe/semi-ui";
import {useDispatch, useSelector} from "react-redux";
import {
    selectCurrentNumOfRowsGenerated,
    selectEstimatedFileSize,
    selectExportFileName,
    selectExportProcessStage,
    selectShowExportModal,
    selectSparkLineData,
} from "@/reducers/export/exportSelectors";
import {
    doOnBatchComplete,
    doSetExportProcessStage,
    doSetShowExportModal,
} from "@/reducers/export/exportActions";
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
import {IconExpand, IconTickCircle} from "@douyinfe/semi-icons";
import {getFileExtensionByFormat} from "@/utils/formatterUtils";
import {FormattedMessage} from "@/locale";

export const ExportModal: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const {Text} = Typography;

    // state
    const [totalTimerSeconds, setTotalTimerSeconds] = useState(0);

    // selectors
    const modalVisible = useSelector(selectShowExportModal);
    const estimatedSize = useSelector(selectEstimatedFileSize);
    const format = useSelector(selectExportFormat);
    const exportFileName = useSelector(selectExportFileName);
    const numOfExportRows = useSelector(selectNumberOfExportRows);
    const exportProcessStage = useSelector(selectExportProcessStage);
    const sparkLineData = useSelector(selectSparkLineData);
    const sortableIdList = useSelector(selectDataFieldsSortableIdsList);
    const dataFields = useSelector(selectDataFields);
    const totalNumOfRowsGenerated = useSelector(selectCurrentNumOfRowsGenerated);

    let percent = totalNumOfRowsGenerated / numOfExportRows;

    // effects
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

    useEffect(() => {
        const generateExportToast = () => (
            <span>
            <Text>{exportFileName}.{getFileExtensionByFormat(format)}</Text>
            <Text link style={{marginLeft: 12}} onClick={onOpenModal}>
                <IconExpand size={'small'}/>
            </Text>
        </span>
        );

        const EXPORT_TOAST_ID = 'EXPORT_TOAST';

        if (!modalVisible) {
            if (exportProcessStage === ExportProcessStage.GENERATING) {
                Toast.info({
                    id: EXPORT_TOAST_ID,
                    content: generateExportToast(),
                    duration: 0,
                    showClose: false,
                    icon: (
                        <Progress
                            percent={percent * 100}
                            width={20}
                            type="circle"
                            stroke={'var(--semi-color-secondary-active)'}
                            aria-label="progress circle"
                        />
                    ),
                });
            } else if (exportProcessStage === ExportProcessStage.COMPLETED) {
                Toast.success({
                    id: EXPORT_TOAST_ID,
                    content: generateExportToast(),
                    icon: <IconTickCircle/>,
                });
            } else {
                // Handle other cases if needed
            }
        } else {
            Toast.close(EXPORT_TOAST_ID);
        }
    }, [exportProcessStage, modalVisible, percent, exportFileName, format]);

    // render
    const renderModalContent = () => {
        if (exportProcessStage == ExportProcessStage.PREVIEW) {
            return <ExportPreview exportNumOfRows={numOfExportRows}
                                  exportFileName={exportFileName}
                                  estimatedSize={estimatedSize}
                                  format={format}/>
        } else {
            return <ExportDash exportStage={exportProcessStage}
                               currentExportedRows={totalNumOfRowsGenerated}
                               exportRows={numOfExportRows}
                               sparkLineData={sparkLineData}
                               timeElapsed={totalTimerSeconds}/>
        }
    }

    // action
    const onCloseModal = () => {
        dispatch(doSetShowExportModal(false));
    }

    const onOpenModal = () => {
        dispatch(doSetShowExportModal(true));
    }

    // generate
    const onGenerate = async () => {
        dispatch(doSetExportProcessStage(ExportProcessStage.GENERATING));
        await batchGenerateData(dataFields, sortableIdList, numOfExportRows, onBatchCompleteCallback);
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
                        <FormattedMessage id={'export.modal.hide.button.text'}/>
                    </Button>
                    <Button>
                        <FormattedMessage id={'export.modal.terminate.button.text'}/>
                    </Button>
                </>

            case ExportProcessStage.COMPLETED:
                return <>
                    <Button onClick={onCloseModal}>
                        <FormattedMessage id={'export.modal.cancel.button.text'}/>
                    </Button>
                </>
        }
    }

    return (
        <>
            <Modal
                style={{width: '90%', maxWidth: '460px'}}
                className={'no-select-area'}
                visible={modalVisible}
                title={<FormattedMessage id={'export.modal.title'}/>}
                onCancel={onCloseModal}
                footer={renderModalFooter()}
            >
                {renderModalContent()}
            </Modal>
        </>
    )
}