import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import { MainLayout } from "../src/layout/MainLayout";
import { useState } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const [activeActionId, setActiveActionId] = useState("");

  return (
    <div className="bg-gray-dark font-lato text-justify">
      <Head>
        <meta name="author" content="Ernest Przybył"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout activeActionId={activeActionId}>
        <Component {...pageProps} setActiveActionId={setActiveActionId} />
      </MainLayout>
      <Analytics />
    </div>
  );
}

export default MyApp;
