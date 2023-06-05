import React from "react";
import {Button, Tooltip} from "@douyinfe/semi-ui";
import {IconRefresh} from "@douyinfe/semi-icons";
import {useIntl} from "@/locale";
import {useDispatch} from "react-redux";
import {doGeneratePreviewData} from "@/reducers/workspace/workspaceActions";

export type RegeneratePreviewButtonProps = {

}

export const RegeneratePreviewButton: React.FunctionComponent<RegeneratePreviewButtonProps> = ({...props}) => {
    const intl = useIntl();
    const dispatch = useDispatch();

    // actions
    const handleRegeneratePreview = () => {
        dispatch(doGeneratePreviewData());
    }

    return (
        <Tooltip
            position={'bottom'}
            trigger={'hover'}
            content={intl.formatMessage({id:"preview.setting.regenerateButton.tooltip"})}
        >
            <Button onClick={handleRegeneratePreview} theme={'borderless'} type={'tertiary'} icon={<IconRefresh size={'extra-large'}/>} />
        </Tooltip>
    )
}


