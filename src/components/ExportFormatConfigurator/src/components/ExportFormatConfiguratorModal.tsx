import React, {useCallback} from 'react';
import {Typography, Modal, Select} from "@douyinfe/semi-ui";
import {useIntl} from "@/locale";
import {getFormattersGroupedByCategory} from "@/utils/categoriesUtils";
import {formatters} from "@/core/formatters";
import {Formatter} from "@/types/formatter";
import {useSelector} from "react-redux";
import {Store} from "@/types/system";
import Image from "next/image";
import {ExportFormatSelect} from "@/components/ExportFormatConfigurator/src/components/ExportFormatSelect";


export type ExportFormatConfiguratorModalProps = {
    open: boolean;
    onClose: () => void;
}

export const ExportFormatConfiguratorModal: React.FC<ExportFormatConfiguratorModalProps> = ({...props}) => {
    const intl = useIntl();
    const {open, onClose} = props;

    // store
    const exportType = useSelector((state: Store) => state.exporter.exportType);
    const colorMode = useSelector((state: Store) => state.app.colorMode);

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