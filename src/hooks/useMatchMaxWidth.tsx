import { useEffect, useState } from "react";

const useMatchMaxWidth = (maxWidth: string) => {
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    if (!window) return;

    const onWindowResize = () => {
      const { matches } = window.matchMedia(`(max-width:${maxWidth} )`);
      setIsMatching(matches);
    };

    onWindowResize();

    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, [maxWidth]);

  return isMatching;
};

export default useMatchMaxWidth;
