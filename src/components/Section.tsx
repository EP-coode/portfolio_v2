import React, { PropsWithChildren, useRef } from "react";
import useIsInViewport from "../hooks/useIsInViewport";
import { SlideLeft } from "../transitions/SlideLeft";

export const Section = ({
  children,
  title,
}: PropsWithChildren & { title: string }) => {
  const contenRef = useRef<HTMLDivElement>(null);
  const [, wasInViewport] = useIsInViewport(contenRef, "0px 0px -100px");

  return (
    <SlideLeft slidedIn={wasInViewport} ref={contenRef}>
      <h2 className="text-white text-3xl font-bold">{title}</h2>
      <div>
        {children}
      </div>
    </SlideLeft>
  );
};
