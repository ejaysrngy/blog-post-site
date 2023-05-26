import MainLayout from "@/components/Layout";
import { AppProps } from "next/app";
import './globals.css'

const MyApp = ({Component, pageProps}: AppProps) => {
    return <MainLayout>
        <Component {...pageProps} />
    </MainLayout>
}

export default MyApp;