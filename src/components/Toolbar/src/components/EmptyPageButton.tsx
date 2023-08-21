import React from "react";
import {Button, Tooltip} from "@douyinfe/semi-ui";
import {IconDelete} from "@douyinfe/semi-icons";
import {useIntl} from "@/locale";
import {useDispatch} from "react-redux";
import {doEmptyWorkspace} from "@/reducers/workspace/workspaceActions";



export type EmptyPageButtonProps = {
    onClick?: () => void;
}

export const EmptyPageButton: React.FC<EmptyPageButtonProps> = ({...props}) => {
    const intl = useIntl();
    const dispatch = useDispatch();

    // actions
    const handleEmptyPage = () => {
        dispatch(doEmptyWorkspace());
    }

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
                    onClick={handleEmptyPage}
                />

            </Tooltip>
        </>
    )
}