import { useEffect, useState } from "react";

export default function useScrollPrgores(): number | undefined {
  const [pageProgres, setPageProgres] = useState(0);

  useEffect(() => {
    const onWindowScroll = () => {
      const scroolTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      const progress =
        (scroolTop / (document.body.scrollHeight - window.innerHeight)) * 100;

      setPageProgres(progress);
    };

    window.addEventListener("scroll", onWindowScroll);
    return () => {
      window.removeEventListener("scroll", onWindowScroll);
    };
  }, []);

  return pageProgres;
}
