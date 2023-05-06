import React, {FunctionComponent} from "react";
import {Layout} from "@douyinfe/semi-ui";
import {IconTerminal} from "@douyinfe/semi-icons";


export type FooterProps = {}

export const Footer: FunctionComponent<FooterProps> = () => {
    const {Footer} = Layout;
    return (
        <Footer
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
                    <span style={{marginRight: '24px'}}>GitHub</span>
                    <span>About</span>
                </span>
        </Footer>
    )
}