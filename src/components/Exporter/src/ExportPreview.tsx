import React from 'react';
import {ComponentSize, ExportFormat} from "@/constants/enums";
import style from "@/components/Exporter/src/ExportModal.module.scss";
import {FormattedMessage, useIntl} from "@/locale";
import {NumbOfRowInput} from "@/components/Toolbar/src/components/NumOfRowInput";
import {ExportFormatConfigurator} from "@/components/ExportFormatConfigurator";
import {OptionsInput} from "@/components/Utils";
import {getFileExtensionByFormat} from "@/utils/formatterUtils";
import {Divider, Typography} from "@douyinfe/semi-ui";
import {doSetExportFileName} from "@/reducers/export/exportActions";
import {useDispatch} from "react-redux";
import {isNullOrWhiteSpace} from "@/utils/stringUtils";
import {isNullOrUndefined} from "@/utils/typeUtils";

export interface ExportPreviewProps {
    exportNumOfRows: number;
    exportFileName: string;
    estimatedSize: number;
    format: ExportFormat;
}

export const ExportPreview: React.FunctionComponent<ExportPreviewProps> = ({...props}) => {
    const {exportFileName, estimatedSize, format, exportNumOfRows} = props;
    const {Numeral} = Typography;
    const dispatch = useDispatch();
    const intl = useIntl();

    // actions
    const onChangeExportFileName = (value: string) => {
        dispatch(doSetExportFileName(value));
    }

    // error validation
    const [errorMessages, setErrorMessages] = React.useState({
        exportNumOfRows: '',
        exportFileName: '',
    });

    React.useEffect(() => {
        const newErrorMessages = {...errorMessages};
        if (isNullOrWhiteSpace(exportFileName)) {
            newErrorMessages.exportFileName = intl.formatMessage({id: 'export.modal.exportFileName.empty'});
        } else {
            newErrorMessages.exportFileName = '';
        }

        if (isNullOrUndefined(exportNumOfRows)) {
            newErrorMessages.exportNumOfRows = intl.formatMessage({id: 'export.modal.exportNumOfRows.empty'});
        } else {
            newErrorMessages.exportNumOfRows = '';
        }

        setErrorMessages(newErrorMessages);
    }, [exportFileName, exportNumOfRows]);

    return (
        <div>
            <div className={style.exportModal__inputs}>
                <div className="generatorConfig_column">
                    <div className='generatorConfig_column__label'>
                        <FormattedMessage id={'export.modal.exportNumOfRows.label'}/>
                    </div>
                    <NumbOfRowInput size={ComponentSize.LARGE} errorMessage={errorMessages.exportNumOfRows}/>
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
                value={exportFileName}
                errorMessage={errorMessages.exportFileName}
                suffix={`.${getFileExtensionByFormat(format)}`}
                onChange={onChangeExportFileName}
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
        </div>
    );
}