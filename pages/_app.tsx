import MainLayout from "@/components/Layout";
import { AppProps } from "next/app";

import { createEmotionSsrAdvancedApproach } from "tss-react/next/pagesDir";

const {
    augmentDocumentWithEmotionCache,
    withAppEmotionCache
} = createEmotionSsrAdvancedApproach({ key: "css" });

const MyApp = ({Component, pageProps}: AppProps) => {
    return <MainLayout>
        <Component {...pageProps} />
    </MainLayout>
}

export { augmentDocumentWithEmotionCache };

export default withAppEmotionCache(MyApp);