import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-gray-dark font-lato text-justify">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
