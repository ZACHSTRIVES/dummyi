import React from "react";
import {Button, Toast, Tooltip} from "@douyinfe/semi-ui";
import {IconCopy} from "@douyinfe/semi-icons";
import {FormattedMessage, useIntl} from "@/locale";
import {useSelector} from "react-redux";
import {selectPreviewFormattedData} from "@/reducers/workspace/workspaceSelectors";

export type CopyToClipboardButtonProps = {}

export const CopyToClipboardButton: React.FunctionComponent<CopyToClipboardButtonProps> = ({...props}) => {
    const intl = useIntl();

    // store
    const previewFormattedData = useSelector(selectPreviewFormattedData);

    // actions
    const copyToClipboard = () => {
        navigator.clipboard.writeText(previewFormattedData).then(() => {
            Toast.success(intl.formatMessage({id: "preview.setting.copyToClipboard.notification.content"}));
        });
    }

    return (
        <Tooltip
            position={'bottom'}
            trigger={'hover'}
            content={<FormattedMessage id={"preview.setting.copyToClipboard.tooltip"}/>}
        >
            <Button
                onClick={copyToClipboard}
                theme={'borderless'}
                type={'tertiary'}
                icon={<IconCopy size={'extra-large'}/>}
            />
        </Tooltip>
    )
}
