import React from "react";
import {Button} from "@douyinfe/semi-ui";
import {IconSave} from "@douyinfe/semi-icons";
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
            icon={<IconSave/>}
            className={Styles.generateButton}
            style={{width: size === 'large' ? '100px' : null}}
            theme={'solid'}>
            {intl.formatMessage({id: 'toolbar.generateButton.text'})}
        </Button>
    )
}