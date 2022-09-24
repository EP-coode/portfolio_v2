import React from "react";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ children, title }, ref) => (
    <section ref={ref}>
      <h2 className="">{title}</h2>
      <div className="">{children}</div>
    </section>
  )
);

Section.displayName = "Section";

export default Section;
