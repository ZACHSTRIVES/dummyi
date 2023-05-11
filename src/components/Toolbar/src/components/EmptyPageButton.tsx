import React from "react";
import {Button} from "@douyinfe/semi-ui";
import {IconDelete} from "@douyinfe/semi-icons";


export type EmptyPageButtonProps = {}

export const EmptyPageButton: React.FC<EmptyPageButtonProps> = () => {
    return (
        <Button theme={"borderless"} type='tertiary' icon={<IconDelete size={'large'}/>}/>
    )
}