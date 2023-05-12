import React from "react";
import {Button} from "@douyinfe/semi-ui";
import {IconPlayCircle } from "@douyinfe/semi-icons";
import Styles from "@/components/Toolbar/src/Toolbar.module.css";
import {useIntl} from "@/locale";
import {ComponentSize} from "@/constents/enums";

export type GenerateButtonProps = {
    size: ComponentSize;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({...props}) => {
    const {size} = props;
    const intl = useIntl();

    return (
        <Button
            loading={false}
            icon={<IconPlayCircle />}
            className={Styles.generateButton}
            style={{width: size === 'large' ? '100px' : '50px'}}
            theme={'solid'}>
            {size === 'large' ? intl.formatMessage({id: 'toolbar.generateButton.text'}) :null }
        </Button>
    )
}