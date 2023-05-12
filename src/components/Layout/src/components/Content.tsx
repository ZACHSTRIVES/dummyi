import {Breadcrumb, Layout, Skeleton} from "@douyinfe/semi-ui";
import React, {FunctionComponent} from "react";

export type ContentProps = {
    children: React.ReactNode,
    className?: string
}

export const Content: FunctionComponent<ContentProps> = ({children, className}) => {
    const {Content} = Layout;
    return (
        <Content
            className={className}
            style={{
                padding: '24px',
                backgroundColor: 'var(--semi-color-bg-0)',
            }}
        >
                {children}
        </Content>
    )
}