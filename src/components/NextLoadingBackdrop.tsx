import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

const NextLoadingBackdrop = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStartLoading = (url: string) =>
      url !== router.asPath && setIsLoading(true);

    const handleLoadingComplete = (url: string) =>
      url === router.asPath && setIsLoading(false);

    router.events.on("routeChangeStart", handleStartLoading);
    router.events.on("routeChangeComplete", handleLoadingComplete);
    router.events.on("routeChangeError", handleLoadingComplete);

    return () => {
      router.events.off("routeChangeStart", handleStartLoading);
      router.events.off("routeChangeComplete", handleLoadingComplete);
      router.events.off("routeChangeError", handleLoadingComplete);
    };
  }, [router]);

  return isLoading ? (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black flex justify-center items-center bg-opacity-50">
      <Spinner />
    </div>
  ) : null;
};

export default NextLoadingBackdrop;
