import React, { useRef } from "react";
import useIsInViewport from "../hooks/useIsInViewport";
import useMergedRefs from "../hooks/useMergedRefs";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ children, title }, ref) => {
    const secrionRef = useRef(null);
    const mergedRefs = useMergedRefs(ref, secrionRef);
    const [, wasInViewport] = useIsInViewport(secrionRef);
    console.log(wasInViewport);

    return (
      <section className="max-w-4xl mx-auto" ref={mergedRefs}>
          <h2 className={"text-white text-3xl font-bold"}>{title}</h2>
          <div className="">{children}</div>
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;
