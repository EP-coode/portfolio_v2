import "../styles/globals.css";
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-gray-dark font-lato text-justify">
      <Component {...pageProps} />
      <Analytics />
    </div>
  );
}

export default MyApp;
