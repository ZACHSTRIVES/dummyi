import React from "react";
import {Button, Notification, Tooltip} from "@douyinfe/semi-ui";
import {IconCopy} from "@douyinfe/semi-icons";
import {useIntl} from "@/locale";
import {useSelector} from "react-redux";
import {Store} from "@/types/system";

export type CopyToClipboardButtonProps = {}

export const CopyToClipboardButton: React.FunctionComponent<CopyToClipboardButtonProps> = ({...props}) => {
    const intl = useIntl();

    // store
    const rawViewContent = useSelector((state: Store) => state.preview.rawViewContent);

    // actions
    const copyToClipboard = () => {
        const input = document.createElement('textarea');
        input.value = rawViewContent;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        Notification.success({
            title: intl.formatMessage({id: "preview.setting.copyToClipboard.notification.success"}),
            content: intl.formatMessage({id: "preview.setting.copyToClipboard.notification.content"}),
        })
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
