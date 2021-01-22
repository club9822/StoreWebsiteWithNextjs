import React, { useEffect, FC } from 'react';
import '../styles/global.css';
import '../styles/tailwind.css';
import { ThemeProvider } from '@/context/Theme.Context';
import { firebaseCloudMessaging } from '@/utils/webPush';
import * as gtag from '@/lib/gtag';
import { useRouter } from "next/router";
import GoogleTagManager from '@/components/GoogleTagManager';

interface IBaseAppProp {
    Component:FC;
    pageProps:any;
}
export default function App(props:IBaseAppProp) {
  const { Component, pageProps } = props;

  const router = useRouter();
  useEffect(() => {
    // https://github.com/vercel/next.js/blob/canary/examples/with-firebase-cloud-messaging/pages/index.js
    firebaseCloudMessaging.init();
  }, []);
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  /**
  *
  */

  return (
    <GoogleTagManager>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </GoogleTagManager>
  );
}
