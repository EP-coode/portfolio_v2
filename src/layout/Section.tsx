import React, { useContext, useEffect, useRef } from "react";
import { SectionContext } from "../components/context/SectionInViewContext";
import useIsInViewport from "../hooks/useIsInViewport";
import SlideLeft from "../transitions/SlideLeft";

type SectionProps = {
  title: string;
  name: string;
  children: React.ReactNode;
};

const Section = ({ children, title, name }: SectionProps) => {
  const secrionRef = useRef<HTMLElement>(null);
  const [isInViewPort, wasInViewport] = useIsInViewport(secrionRef, "-100px");
  const sectionCtx = useContext(SectionContext);

  useEffect(() => {
    if (isInViewPort) sectionCtx?.onSectionEnter?.(secrionRef);
    else sectionCtx?.onSectionLeave?.(secrionRef);
  }, [isInViewPort]);

  return (
    <section
      className="max-w-4xl mx-auto overflow-visible"
      id={name}
      ref={secrionRef}
    >
      <SlideLeft slidedIn={wasInViewport}>
        <h2 className={"text-white text-3xl font-bold"}>{title}</h2>
        <div className="">{children}</div>
      </SlideLeft>
    </section>
  );
};

Section.displayName = "Section";

export default Section;
