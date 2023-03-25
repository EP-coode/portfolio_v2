import React, { PropsWithChildren } from "react";
import { SlideIn } from "../transitions/SlideIn";

export const Section = ({
  children,
  title,
  className,
}: PropsWithChildren & { title: string; className?: string }) => {
  return (
    <SlideIn>
      <section className={`my-10 ${className}`}>
        <h2 className="text-white text-3xl font-bold">{title}</h2>
        <div>{children}</div>
      </section>
    </SlideIn>
  );
};
