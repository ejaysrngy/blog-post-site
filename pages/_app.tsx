import MainLayout from "@/components/Layout";
import Head from 'next/head';

import { ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import theme from "@/theme";
import { AppProps } from "next/app";

import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from "@/createEmotionCache";

import "./globals.css";

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = ({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) => {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
