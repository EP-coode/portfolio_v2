import React, { useEffect, useState } from "react";

export default function useIsInViewport(
  ref: React.RefObject<HTMLElement>,
  rootMargin = "0px"
) {
  const [isInViewport, setIsInViewport] = useState(false);
  const [wasInViewport, setWasInViewport] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isInViewport != entry.isIntersecting) {
          setIsInViewport(entry.isIntersecting);
        }
        if (entry.isIntersecting && !wasInViewport) setWasInViewport(true);
      },
      {
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin, isInViewport, wasInViewport]);

  return [isInViewport, wasInViewport];
}
