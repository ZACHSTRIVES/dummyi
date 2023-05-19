import React from 'react';
import {Button, Empty, Modal, Typography} from "@douyinfe/semi-ui";
import {useIntl} from "@/locale";
import {useSelector} from "react-redux";
import {Store} from "@/types/system";
import {ExportFormatSelect} from "@/components/ExportFormatConfigurator/src/components/ExportFormatSelect";
import styles from './ExportFormatConfiguratorModal.module.css';
import {IllustrationConstruction, IllustrationConstructionDark} from '@douyinfe/semi-illustrations';
import {getFormatterConfigComponentByFormat} from "@/utils/exporterUtils";

export type ExportFormatConfiguratorModalProps = {
    open: boolean;
    onClose: () => void;
}

export const ExportFormatConfiguratorModal: React.FC<ExportFormatConfiguratorModalProps> = ({...props}) => {
    const intl = useIntl();
    const {open, onClose} = props;
    const {Text} = Typography;

    // store
    const exportFormat = useSelector((state: Store) => state.exporter.exportFormat);

    // render
    const renderConfigComponent = () => {
        const ConfigComponent = getFormatterConfigComponentByFormat(exportFormat);
        return ConfigComponent ?
            <ConfigComponent/> :
            <Empty
                style={{marginTop: 20}}
                image={<IllustrationConstruction style={{width: 150, height: 150}}/>}
                darkModeImage={<IllustrationConstructionDark style={{width: 150, height: 150}}/>}
                description={intl.formatMessage({id: 'export.configurator.config.empty'})}
            />
    }

    return (
        <Modal
            visible={open}
            title={intl.formatMessage({id: 'export.configurator.modal.title'})}
            style={{width: '95vw', maxWidth: '500px', height: '500px'}}
            footer={<Button onClick={onClose}
                            style={{width: '100px'}}>{intl.formatMessage({id: 'export.configurator.modal.closeButton.text'})}</Button>}
            onCancel={onClose}
        >
            <ExportFormatSelect/>

            <div className={styles.configurationsLabel}>
                <Text>{intl.formatMessage({id: 'export.configurator.config.label'})}</Text>
            </div>

            {renderConfigComponent()}

        </Modal>
    )
}