import React from "react";
import {Button, Tooltip} from "@douyinfe/semi-ui";
import {IconGithubLogo} from "@douyinfe/semi-icons";

export type GithubButtonProps = {
    size: 'large' | 'extra-large'
}

export const GithubButton:React.FunctionComponent<GithubButtonProps> = ({...props}) => {
    const handleGithubButtonClick = () => {
        window.open('https://github.com/ZACHSTRIVES/mockdata.co.nz');
    }
    return (
        <Tooltip content={'Github'}>
            <Button
                theme="borderless"
                icon={<IconGithubLogo size={props.size}/>}
                onClick={handleGithubButtonClick}
                style={{
                    color: 'var(--semi-color-text-2)',
                    marginRight: '6px'
                }}/>
        </Tooltip>
    )
}

