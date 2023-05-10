import App, {AppProps} from 'next/app';

// styles
import '@/styles/globals.scss';
import {AppLayout} from "@/components/Layout";
import {ConfigProvider} from '@douyinfe/semi-ui';

// seo
import {DefaultSeo} from "next-seo";
import SEO from '../../next-seo.config.json';

// state management
import {Provider} from "react-redux";
import {store, persistor} from "@/store";
import {useRouter} from "next/router";
import {PersistGate} from 'redux-persist/integration/react'

// i18n
import {translations} from "@/locale";
import {Locales} from "@/constents/enums";
import {IntlProvider} from "react-intl";

export default function MyApp({Component, pageProps}: AppProps) {
    const {locale} = useRouter();
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <IntlProvider locale={locale} messages={translations[locale].app} defaultLocale={Locales.EN}>
                    <ConfigProvider locale={translations[locale].semi}>
                        <DefaultSeo {...SEO} />
                        <AppLayout>
                            <Component {...pageProps} />
                        </AppLayout>
                    </ConfigProvider>
                </IntlProvider>
            </PersistGate>
        </Provider>
    );
}



