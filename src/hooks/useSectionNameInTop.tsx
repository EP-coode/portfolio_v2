import React, { useEffect, useState } from "react";

const useSectionNameInTop = (
  sectionReferences: Array<React.MutableRefObject<HTMLElement | null>>,
  rootMargin = "0px"
) => {
  const [topViewSectionName, setTopViewSectionName] = useState<string | null>(
    null
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const bestEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entry) => entry.boundingClientRect.top)
          .reverse()[0];

        if (bestEntry?.target.id !== topViewSectionName) {
          setTopViewSectionName(bestEntry?.target.id);
        }
      },
      {
        rootMargin,
      }
    );

    sectionReferences.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionReferences, rootMargin, setTopViewSectionName]);

  return topViewSectionName;
};

export default useSectionNameInTop;
