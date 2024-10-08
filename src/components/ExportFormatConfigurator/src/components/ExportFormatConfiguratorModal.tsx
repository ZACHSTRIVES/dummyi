import React from 'react';
import {Button, Divider, Empty, Modal} from "@douyinfe/semi-ui";
import {FormattedMessage, useIntl} from "@/locale";
import {useDispatch, useSelector} from "react-redux";
import {ExportFormatSelect} from "@/components/ExportFormatConfigurator/src/components/ExportFormatSelect";
import {IllustrationConstruction, IllustrationConstructionDark} from '@douyinfe/semi-illustrations';
import {getFormatterConfigComponentByFormat} from "@/utils/formatterUtils";
import {doUpdateFormatterConfig} from "@/reducers/workspace/workspaceActions";
import {selectExportFormat, selectFormatterConfig} from "@/reducers/workspace/workspaceSelectors";


export type ExportFormatConfiguratorModalProps = {
    open: boolean;
    onClose: () => void;
}

export const ExportFormatConfiguratorModal: React.FC<ExportFormatConfiguratorModalProps> = ({...props}) => {
    const intl = useIntl();
    const {open, onClose} = props;
    const dispatch = useDispatch();

    // store
    const exportFormat = useSelector(selectExportFormat);
    const formatterConfig = useSelector(selectFormatterConfig);

    // action
    const onConfigChange = (config) => {
        dispatch(doUpdateFormatterConfig(config));
    }

    // render
    const renderConfigComponent = () => {
        const ConfigComponent = getFormatterConfigComponentByFormat(exportFormat);
        return ConfigComponent ?
            <ConfigComponent onConfigChange={onConfigChange} config={formatterConfig}/> :
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
            style={{width: '95vw', maxWidth: '500px', height: '550px'}}
            footer={
                <Button onClick={onClose} style={{width: '100px'}}>
                    <FormattedMessage id='export.configurator.modal.confirmButton.text'/>
                </Button>
            }
            onCancel={onClose}>

            <ExportFormatSelect/>

            <Divider style={{marginTop: 24}}/>

            {renderConfigComponent()}

        </Modal>
    )
}