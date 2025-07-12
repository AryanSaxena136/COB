import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import { SensorProvider } from '../context/SensorContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { trackPageView } from '../../lib/analytics';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      trackPageView(url);
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>AquaSense AI - Groundwater Monitoring</title>
        <meta name="description" content="Real-time groundwater monitoring and forecasting for sustainable agriculture" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <AuthProvider>
        <SensorProvider>
          <Component {...pageProps} />
        </SensorProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;