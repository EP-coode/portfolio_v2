import React, { useContext, useEffect, useRef } from "react";
import { SectionContext } from "./TrackableSectionContainer";
import useIsInViewport from "../../hooks/useIsInViewport";

type SectionProps = {
  id: string;
  children: React.ReactNode;
};

export const TrackableSection = ({ children, id }: SectionProps) => {
  const secrionRef = useRef<HTMLElement>(null);
  const [isInViewPort,] = useIsInViewport(secrionRef, "-100px");
  const sectionCtx = useContext(SectionContext);

  useEffect(() => {
    if (isInViewPort) sectionCtx?.onSectionEnter?.(secrionRef);
    else sectionCtx?.onSectionLeave?.(secrionRef);
  }, [isInViewPort]);

  return (
    <section
      className="max-w-4xl mx-auto overflow-visible"
      id={id}
      ref={secrionRef}
    >
      {children}
    </section>
  );
};
