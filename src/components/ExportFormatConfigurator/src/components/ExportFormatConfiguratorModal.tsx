import React from 'react';
import {Modal} from "@douyinfe/semi-ui";
import {useIntl} from "@/locale";
import {useSelector} from "react-redux";
import {Store} from "@/types/system";
import {ExportFormatSelect} from "@/components/ExportFormatConfigurator/src/components/ExportFormatSelect";


export type ExportFormatConfiguratorModalProps = {
    open: boolean;
    onClose: () => void;
}

export const ExportFormatConfiguratorModal: React.FC<ExportFormatConfiguratorModalProps> = ({...props}) => {
    const intl = useIntl();
    const {open, onClose} = props;

    return (
        <Modal
            visible={open}
            title={intl.formatMessage({id: 'export.configurator.modal.title'})}
            style={{width: '95vw', maxWidth: '500px'}}
            onCancel={onClose}
        >
            <ExportFormatSelect/>
        </Modal>
    )
}