import React from 'react';
import {Descriptions, Divider, Modal, Typography} from "@douyinfe/semi-ui";
import {NumbOfRowInput} from "@/components/Toolbar/src/components/NumOfRowInput";
import {useDispatch, useSelector} from "react-redux";
import {selectEstimatedFileSize, selectShowExportModal} from "@/reducers/export/exportSelectors";
import {doSetShowExportModal} from "@/reducers/export/exportActions";
import {ComponentSize} from "@/constants/enums";
import {ExportFormatConfigurator} from "@/components/ExportFormatConfigurator";
import style from './ExportModal.module.scss';
import {FormattedMessage} from "@/locale";
import {OptionsInput} from "@/components/Utils";


export interface ExportModalProps {

}

export const ExportModal: React.FunctionComponent<ExportModalProps> = () => {
    const dispatch = useDispatch();
    const {Numeral} = Typography;

    // state
    const visible = useSelector(selectShowExportModal);
    const estimatedSize = useSelector(selectEstimatedFileSize);

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
            <div className={style.exportModal__inputs}>
                <div className="generatorConfig_column">
                    <div className='generatorConfig_column__label'>
                        <FormattedMessage id={'export.modal.exportNumOfRows.label'}/>
                    </div>
                    <NumbOfRowInput size={ComponentSize.LARGE}/>
                </div>
                <div className="generatorConfig_column">
                    <div className='generatorConfig_column__label'>
                        <FormattedMessage id={'export.modal.exportFormat.label'}/>
                    </div>
                    <ExportFormatConfigurator/>
                </div>
            </div>

            <OptionsInput
                label={<FormattedMessage id={'export.modal.exportFileName.label'}/>}
                value={'exportFileName'}
                onChange={() => {
                }}
                style={{width: '260px'}}
            />

            <Divider margin={22}/>

            <div className="generatorConfig_column">
                <div className='generatorConfig_column__label'>
                    <FormattedMessage id={'export.modal.estimatedSize.label'}/>
                </div>
                <div className={style.exportModal__estimated_number}>
                    <Numeral rule={'bytes-decimal'} precision={2}>
                        {estimatedSize}
                    </Numeral>
                </div>
            </div>


            {/*<ExportProgressDash/>*/}
        </Modal>
    )
}