import React from "react";
import {Tooltip} from "@douyinfe/semi-ui";
import {IconHelpCircle, IconHelpCircleStroked, IconInfoCircle} from "@douyinfe/semi-icons";

export interface InfoTooltipProps {
    children: React.ReactNode;
}

export const InfoTooltip: React.FunctionComponent<InfoTooltipProps> = ({children}) => {
    return (
        <Tooltip content={children}>
            <IconHelpCircle size={'small'} style={{marginLeft: 5, color: 'grey'}}/>
        </Tooltip>
    )
}