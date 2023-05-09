import React, {FunctionComponent} from "react";
import {Layout} from "@douyinfe/semi-ui";
import {IconTerminal} from "@douyinfe/semi-icons";
import {Typography} from '@douyinfe/semi-ui';
import {IconGithubLogo} from '@douyinfe/semi-icons';

export type FooterProps = {
    className?: string;
}

export const Footer: FunctionComponent<FooterProps> = ({className}) => {
    const {Footer} = Layout;
    const {Text} = Typography;

    return (
        <Footer
            className={className}
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '20px',
                color: 'var(--semi-color-text-2)',
                backgroundColor: 'rgba(var(--semi-grey-0), 1)',
            }}
        >
                <span
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <IconTerminal size="large" style={{marginRight: '8px'}}/>
                    <span>Mockdata.co.nz </span>
                </span>

            <span>
                    <Text link={{href: 'https://github.com/ZACHSTRIVES/mockdata.co.nz'}} style={{marginRight: '24px'}}
                          underline>
                        Github
                    </Text>
                    <Text link={{href: '/about'}} underline>
                        About
                    </Text>
                </span>
        </Footer>
    )
}