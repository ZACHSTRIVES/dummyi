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
        <Layout>
            <Header style={{backgroundColor: 'var(--semi-color-bg-1)'}}>
                <NavBar/>
            </Header>
            <Content>
                {children}
            </Content>
            <Footer/>
        </Layout>
    )
}

