import React, { useRef } from "react";
import useIsInViewport from "../hooks/useIsInViewport";
import useMergedRefs from "../hooks/useMergedRefs";
import SlideLeft from "../transitions/SlideLeft";

type SectionProps = {
  title: string;
  name: string;
  children: React.ReactNode;
};

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ children, title, name }, ref) => {
    const secrionRef = useRef(null);
    const mergedRefs = useMergedRefs(ref, secrionRef);
    const [, wasInViewport] = useIsInViewport(secrionRef, "-100px");

    return (
      <section
        className="max-w-4xl mx-auto overflow-visible"
        id={name}
        ref={mergedRefs}
      >
        <SlideLeft slidedIn={wasInViewport}>
          <h2 className={"text-white text-3xl font-bold"}>{title}</h2>
          <div className="">{children}</div>
        </SlideLeft>
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;
