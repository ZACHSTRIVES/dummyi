import React from "react";
import {Button, Tooltip} from "@douyinfe/semi-ui";
import {IconRefresh} from "@douyinfe/semi-icons";
import {useIntl} from "@/locale";

export type RegeneratePreviewButtonProps = {

}

export const RegeneratePreviewButton: React.FunctionComponent<RegeneratePreviewButtonProps> = ({...props}) => {
    const intl = useIntl();


    return (
        <Tooltip
            position={'bottom'}
            trigger={'hover'}
            content={intl.formatMessage({id:"preview.setting.regenerateButton.tooltip"})}
        >
            <Button theme={'borderless'} type={'tertiary'} icon={<IconRefresh size={'extra-large'}/>} />
        </Tooltip>
    )
}


