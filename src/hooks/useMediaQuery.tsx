import { useState, useEffect } from "react";

// must stay in sync manualy with tailwind
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export const useMediaQuery = (breakpoint: keyof typeof breakpoints) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query = `(min-width: ${breakpoints[breakpoint]})`;
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, breakpoint]);

  return matches;
};
