import React, { useContext, useEffect, useRef } from "react";
import { SectionContext } from "./TrackableSectionContainer";

type SectionProps = {
  id: string;
  children: React.ReactNode;
};

export const TrackableSection = ({ children, id }: SectionProps) => {
  const secrionRef = useRef<HTMLElement>(null);
  const sectionCtx = useContext(SectionContext);

  useEffect(() => {
    sectionCtx?.registerSection(id, secrionRef);
  }, [secrionRef, sectionCtx?.registerSection]);

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
