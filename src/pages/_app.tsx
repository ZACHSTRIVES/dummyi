// styles
import '@/styles/globals.scss';

import App, {AppProps} from 'next/app';
import {AppLayout} from "@/components/Layout";
import {PersistGate} from 'redux-persist/integration/react'

// seo
import {DefaultSeo} from "next-seo";
import SEO from '../../next-seo.config.json';
import {Provider} from "react-redux";
import {store, persistor} from "@/store";

export default function MyApp({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <DefaultSeo {...SEO} />
                <AppLayout>
                    <Component {...pageProps} />
                </AppLayout>
            </PersistGate>
        </Provider>
    );
}



