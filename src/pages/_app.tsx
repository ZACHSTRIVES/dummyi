// styles
import App, {AppProps} from 'next/app';
import {AppLayout} from "@/components/Layout";
import '@/styles/globals.scss';

export default function MyApp({Component, pageProps}: AppProps) {
    return <AppLayout>
        <Component {...pageProps} />
    </AppLayout>;
}



