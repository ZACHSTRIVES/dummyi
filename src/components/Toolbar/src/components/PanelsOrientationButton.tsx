import React from "react";
import {Button, Tooltip} from "@douyinfe/semi-ui";
import {IconSidebar} from "@douyinfe/semi-icons";
import {useIntl} from "@/locale";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/types/system";
import {PanelsOrientation} from "@/constants/enums";
import {doSetPanelsOrientation} from "@/reducers/workspace/workspaceActions";


export type PanelsOrientationButtonProps = {
    className?: string;
}

export const PanelsOrientationButton: React.FC<PanelsOrientationButtonProps> = ({...props}) => {
    const intl = useIntl();
    const dispatch = useDispatch();

    // store
    const direction = useSelector((state: RootState) => state.workspace.panelsOrientation);

    // actions
    const handlePanelDirectionChange = () => {
        dispatch(doSetPanelsOrientation(direction === PanelsOrientation.HORIZONTAL ? PanelsOrientation.VERTICAL : PanelsOrientation.HORIZONTAL));
    }

    return (
        <Tooltip
            className={props.className}
            position={'bottom'}
            content={intl.formatMessage(
            {
                id: direction === PanelsOrientation.HORIZONTAL?
                    'toolbar.panelsOrientationButton.tooltip.switchToColumn' :
                    'toolbar.panelsOrientationButton.tooltip.switchToRow'
            })}>
            <Button
                theme={"borderless"}
                type='tertiary'
                onClick={handlePanelDirectionChange}
                icon={
                    <IconSidebar size={'large'} rotate={direction === PanelsOrientation.VERTICAL ? 90 : 0}/>
                }
            />
        </Tooltip>
    )
}