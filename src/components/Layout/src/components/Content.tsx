import {Breadcrumb, Layout, Skeleton} from "@douyinfe/semi-ui";
import React, {FunctionComponent} from "react";

export type ContentProps = {
    children: React.ReactNode
}

export const Content: FunctionComponent<ContentProps> = ({children}) => {
    const {Content} = Layout;
    return (
        <Content
            style={{
                padding: '24px',
                backgroundColor: 'var(--semi-color-bg-0)',
            }}
        >
            <div
                style={{
                    borderRadius: '10px',
                    border: '1px solid var(--semi-color-border)',
                    height: '376px',
                    padding: '32px',
                }}
            >
                {children}
            </div>
        </Content>
    )
}