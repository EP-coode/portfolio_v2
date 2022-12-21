import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-gray-dark font-lato text-justify">
      <Head>
        <meta name="author" content="Ernest Przybył"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </div>
  );
}

export default MyApp;
