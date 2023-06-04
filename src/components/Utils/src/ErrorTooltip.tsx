import React from "react";
import {Popover} from "@douyinfe/semi-ui";
import {isNullOrWhiteSpace} from "@/utils/stringUtils";

export interface ErrorTooltipProps {
    message: string;
    children: React.ReactNode;
}

export const ErrorTooltip: React.FunctionComponent<ErrorTooltipProps> = ({...props}) => {
    const {message, children} = props;
    return (
        <Popover
            style={{
                backgroundColor: 'rgba(255,0,0,0.50)',
                padding: 6,
                color: 'white',
            }}
            visible={!isNullOrWhiteSpace(message)}
            trigger={'custom'}
            content={message}
            showArrow={true}
        >
            {children}
        </Popover>
    )
}