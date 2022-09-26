import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  slidedIn: boolean;
};

export default function SlideLeft({ children, slidedIn }: Props) {
  return (
    <div
      className={classNames("transition-all duration-1000", {
        "translate-x-0 opacity-1": slidedIn,
        "translate-x-full opacity-0": !slidedIn,
      })}
    >
      {children}
    </div>
  );
}
