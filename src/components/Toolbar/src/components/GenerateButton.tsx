import React from "react";
import {Button} from "@douyinfe/semi-ui";
import {IconPlayCircle} from "@douyinfe/semi-icons";
import Styles from "@/components/Toolbar/src/Toolbar.module.css";
import {FormattedMessage} from "@/locale";
import {ComponentSize} from "@/constants/enums";
import {useDispatch} from "react-redux";
import {doSetShowExportModal} from "@/reducers/export/exportActions";

export type GenerateButtonProps = {
    size: ComponentSize;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({...props}) => {
    const {size} = props;
    const dispatch = useDispatch();

    // action
    const openGenerateModal = () => {
        dispatch(doSetShowExportModal(true));
    }

    return (
        <Button
            onClick={openGenerateModal}
            loading={false}
            icon={<IconPlayCircle/>}
            className={Styles.generateButton}
            theme={'solid'}>
            {size === 'large' ? <FormattedMessage id={'toolbar.generateButton.text'}/> : null}
        </Button>
    )
}