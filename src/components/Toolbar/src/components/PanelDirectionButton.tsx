import React from "react";
import {Button, Tooltip} from "@douyinfe/semi-ui";
import {IconSidebar} from "@douyinfe/semi-icons";
import {useIntl} from "@/locale";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "@/types/system";
import {PanelsDirection} from "@/constents/enums";
import {doSetPanelsDirection} from "@/reducers/workplace/workplaceActions";


export type PanelDirectionButtonProps = {}

export const PanelDirectionButton: React.FC<PanelDirectionButtonProps> = () => {
    const intl = useIntl();
    const dispatch = useDispatch();

    // store
    const direction = useSelector((state: Store) => state.workplace.panelsDirection);

    // actions
    const handlePanelDirectionChange = () => {
        dispatch(doSetPanelsDirection(direction === PanelsDirection.COLUMN ? PanelsDirection.ROW : PanelsDirection.COLUMN));
    }

    return (
        <Tooltip
            position={'bottom'}
            content={intl.formatMessage(
            {
                id: direction === PanelsDirection.ROW ?
                    'toolbar.panelDirectionButton.tooltip.switchToColumn' :
                    'toolbar.panelDirectionButton.tooltip.switchToRow'
            })}>
            <Button
                theme={"borderless"}
                type='tertiary'
                onClick={handlePanelDirectionChange}
                icon={
                    <IconSidebar size={'large'} rotate={direction === PanelsDirection.COLUMN ? 90 : 0}/>
                }
            />
        </Tooltip>
    )
}