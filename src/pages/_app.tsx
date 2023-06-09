import App, {AppProps} from 'next/app';

// styles
import '@/styles/globals.scss';
import {AppLayout} from "@/components/Layout";
import {LocaleProvider} from '@douyinfe/semi-ui';
import NextNProgress from 'nextjs-progressbar';

// seo
import {DefaultSeo} from "next-seo";
import SEO from '../../next-seo.config.json';

// state management
import {Provider} from "react-redux";
import {store, persist} from "@/store";
import {useRouter} from "next/router";
import {PersistGate} from 'redux-persist/integration/react'

// locales
import {translations} from "@/locale";
import {Locales} from "@/constants/enums";
import {IntlProvider} from "react-intl";
import {Analytics} from '@vercel/analytics/react';

export default function MyApp({Component, pageProps}: AppProps) {
    const {locale} = useRouter();


    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persist}>
                <IntlProvider locale={locale} messages={translations[locale].app} defaultLocale={Locales.EN}>
                    <LocaleProvider locale={translations[locale].semi}>
                        <NextNProgress options={{showSpinner: false}} height={2} color={"var(--semi-color-text-0)"}/>
                        <DefaultSeo {...SEO} />
                        <AppLayout>
                            <Component {...pageProps} />
                        </AppLayout>
                        <Analytics/>
                    </LocaleProvider>
                </IntlProvider>
            </PersistGate>
        </Provider>
    );
}



