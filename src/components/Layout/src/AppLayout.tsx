import React from "react";
import {NavBar, Footer, Content} from "./components";
import {Breadcrumb, Layout, Skeleton} from "@douyinfe/semi-ui";
import {IconTerminal} from "@douyinfe/semi-icons";

export type LayoutProps = {
    children: React.ReactNode
}

export const AppLayout: React.FC<LayoutProps> = ({children}) => {
    const {Header} = Layout;
    return (
        <Layout className="h-screen">
            <Header className="sticky top-0 z-1" style={{backgroundColor: 'var(--semi-color-bg-1)'}}>
                <NavBar/>
            </Header>
            <Content className="grow overflow-auto">
                {children}
            </Content>
            <Footer className="sticky bottom-0 z-1"/>
        </Layout>
    )
}

