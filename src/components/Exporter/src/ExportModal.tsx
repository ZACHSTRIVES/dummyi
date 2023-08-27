import React, {useEffect, useState} from 'react';
import {Button, Modal, Notification, Progress, Spin, Toast, Typography} from "@douyinfe/semi-ui";
import {useDispatch, useSelector} from "react-redux";
import {
    selectCurrentNumOfRowsGenerated,
    selectEstimatedFileSize,
    selectExportFileName,
    selectExportProcessStage,
    selectShowExportModal,
    selectSparkLineData,
    selectExportNotificationId
} from "@/reducers/export/exportSelectors";
import {
    doOnBatchComplete,
    doSetExportNotificationId,
    doSetExportProcessStage,
    doSetShowExportModal,
} from "@/reducers/export/exportActions";
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
import styles from "@/components/Exporter/src/ExportDash.module.scss";
import {IconTickCircle} from "@douyinfe/semi-icons";
import {getFileExtensionByFormat} from "@/utils/formatterUtils";

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
    const exportNumOfRows = useSelector(selectNumberOfExportRows);
    const exportProcessStage = useSelector(selectExportProcessStage);
    const exportRows = useSelector(selectNumberOfExportRows);
    const sparkLineData = useSelector(selectSparkLineData);
    const sortableIdList = useSelector(selectDataFieldsSortableIdsList);
    const dataFields = useSelector(selectDataFields);
    const totalNumOfRowsGenerated = useSelector(selectCurrentNumOfRowsGenerated);

    let percent = totalNumOfRowsGenerated / exportRows;

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
        if (!modalVisible) {
            if (exportProcessStage == ExportProcessStage.GENERATING) {
                Toast.info({
                    id: 'exportNotification',
                    content:
                        <span>
                          <Text>{exportFileName}.{getFileExtensionByFormat(format)}</Text>
                          <Text link style={{marginLeft: 12}} onClick={onOpenModal}>详情</Text>
                        </span>,
                    duration: 0,
                    showClose: false,
                    icon: <Progress percent={percent * 100}
                                    width={20}
                                    type="circle"
                                    stroke={'var(--semi-color-secondary-active)'}
                                    aria-label="progress circle"/>
                })
            } else if (exportProcessStage == ExportProcessStage.COMPLETED) {
                Toast.success(
                    {
                        id: 'exportNotification',
                        content:
                            <span>
                              <Text>{exportFileName}.{getFileExtensionByFormat(format)}</Text>
                              <Text link style={{marginLeft: 12}} onClick={onOpenModal}>详情</Text>
                            </span>,
                        icon: <IconTickCircle/>
                    })
            } else {

            }
        } else {
            Toast.close('exportNotification');
        }
    }, [exportProcessStage, modalVisible, percent, exportFileName, format]);

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

    const onOpenModal = () => {
        dispatch(doSetShowExportModal(true));
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