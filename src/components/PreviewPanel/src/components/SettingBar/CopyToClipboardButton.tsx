import React from "react";
import {Button, Toast, Tooltip} from "@douyinfe/semi-ui";
import {IconCopy} from "@douyinfe/semi-icons";
import {useIntl} from "@/locale";
import {useSelector} from "react-redux";
import {selectPreviewFormattedData} from "@/reducers/workspace/workspaceSelectors";

export type CopyToClipboardButtonProps = {}

export const CopyToClipboardButton: React.FunctionComponent<CopyToClipboardButtonProps> = ({...props}) => {
    const intl = useIntl();

    // store
    const previewFormattedData = useSelector(selectPreviewFormattedData);

    // actions
    const copyToClipboard = () => {
        const input = document.createElement('textarea');
        input.value = previewFormattedData;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        Toast.success(intl.formatMessage({id: "preview.setting.copyToClipboard.notification.content"}));
    }

    return (
        <Tooltip
            position={'bottom'}
            trigger={'hover'}
            content={intl.formatMessage({id: "preview.setting.copyToClipboard.tooltip"})}
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
