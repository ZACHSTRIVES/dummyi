import React from "react";
import {Button, Tooltip} from "@douyinfe/semi-ui";
import {IconGithubLogo} from "@douyinfe/semi-icons";
import {GITHUB_URL} from "@/constants/links";

export type GithubButtonProps = {
    size: 'large' | 'extra-large'
}

export const GithubButton:React.FunctionComponent<GithubButtonProps> = ({...props}) => {
    const handleGithubButtonClick = () => {
        window.open(GITHUB_URL);
    }
    return (
        <Tooltip content={'Github'}>
            <Button
                theme="borderless"
                icon={<IconGithubLogo size={props.size}/>}
                onClick={handleGithubButtonClick}
                className="text-2"/>
        </Tooltip>
    )
}

