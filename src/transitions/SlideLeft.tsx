import classNames from "classnames";
import React, { forwardRef } from "react";

type Props = {
  children: React.ReactNode;
  slidedIn: boolean;
};

export const SlideLeft = forwardRef<HTMLDivElement, Props>(
  ({ children, slidedIn }, ref) => {
    return (
      <div className="w-full h-full overflow-visible" ref={ref}>
        <div
          className={classNames("transition-all duration-1000", {
            "translate-x-0 opacity-1": slidedIn,
            "translate-x-full opacity-0": !slidedIn,
          })}
        >
          {children}
        </div>
      </div>
    );
  }
);

SlideLeft.displayName = "SlideLeft";
