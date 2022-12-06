import classNames from "classnames";
import React, { PropsWithChildren, useRef } from "react";
import useIsInViewport from "../hooks/useIsInViewport";

export const SlideLeft = ({ children }: PropsWithChildren) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, wasInViewport] = useIsInViewport(containerRef, "0px 0px -100px");

  return (
    <div className="w-full h-full overflow-visible" ref={containerRef}>
      <div
        className={classNames("transition-all duration-1000", {
          "translate-x-0 opacity-1": wasInViewport,
          "translate-x-full opacity-0": !wasInViewport,
        })}
      >
        {children}
      </div>
    </div>
  );
};
