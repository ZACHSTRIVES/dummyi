import React from "react";
import {Button, Tooltip} from "@douyinfe/semi-ui";
import {IconDelete} from "@douyinfe/semi-icons";
import {useIntl} from "@/locale";

export type EmptyPageButtonProps = {
    onClick?: () => void;
}

export const EmptyPageButton: React.FC<EmptyPageButtonProps> = ({...props}) => {
    const intl = useIntl();

    return (
        <>
            <Tooltip
                position={'bottom'}
                content={intl.formatMessage(
                    {id: "toolbar.emptyPageButton.tooltip"}
                )}>

                <Button
                    theme={"borderless"}
                    type='tertiary'
                    icon={<IconDelete size={'large'}/>}
                    onClick={props.onClick}
                />

            </Tooltip>
        </>
    )
}