import React from "react";
import {NavBar, Footer, Content} from "./components";
import Head from "next/head";
import {Layout} from "@douyinfe/semi-ui";

export type LayoutProps = {
    children: React.ReactNode
}

export const AppLayout: React.FC<LayoutProps> = ({children}) => {
    const {Header} = Layout;
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/favicon.png" />
            </Head>
        <Layout className="h-screen">
            <Header className="sticky top-0 z-1" style={{backgroundColor: 'var(--semi-color-bg-1)'}}>
                <NavBar/>
            </Header>
            <Content className="grow overflow-hidden">
                {children}
            </Content>
            <Footer className="sticky bottom-0 z-1"/>
        </Layout>
        </>
    )
}

