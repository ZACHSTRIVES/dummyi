// styles
import App, {AppProps} from 'next/app';
import {AppLayout} from "@/components/Layout";
import '@/styles/globals.scss';
import {DefaultSeo} from "next-seo";
import SEO from '../../next-seo.config.json';

export default function MyApp({Component, pageProps}: AppProps) {
    return (
        <AppLayout>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
        </AppLayout>
    );
}



