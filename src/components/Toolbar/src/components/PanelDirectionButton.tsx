import React from "react";
import {Button} from "@douyinfe/semi-ui";
import {IconSidebar} from "@douyinfe/semi-icons";


export type PanelDirectionButtonProps = {}

export const PanelDirectionButton: React.FC<PanelDirectionButtonProps> = () => {
    return (
        <Button theme={"borderless"} type='tertiary' icon={<IconSidebar size={'large'}/>}/>
    )
}