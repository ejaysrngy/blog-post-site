import theme from "@/theme";
import Head from "next/head";
import { MainLayout } from "@/components";
import CssBaseline from "@mui/material/CssBaseline";
import createEmotionCache from "@/createEmotionCache";

import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { AuthContextProvider } from "@/components/common";
import { CacheProvider, EmotionCache } from "@emotion/react";

import "./globals.css";

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) => {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title> My Blog Post Site </title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AuthContextProvider>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </AuthContextProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
