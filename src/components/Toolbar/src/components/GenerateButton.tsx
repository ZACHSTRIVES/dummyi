import React from "react";
import {Button} from "@douyinfe/semi-ui";
import {IconSave} from "@douyinfe/semi-icons";
import Styles from "@/components/Toolbar/src/Toolbar.module.css";
import {useIntl} from "@/locale";

export type GenerateButtonProps = {}

export const GenerateButton: React.FC<GenerateButtonProps> = () => {
    const intl = useIntl();

    return (
        <Button
            loading={false}
            icon={<IconSave/>}
            className={Styles.generateButton}
            theme={'solid'}>
            {intl.formatMessage({id: 'toolbar.generateButton.text'})}
        </Button>
    )
}