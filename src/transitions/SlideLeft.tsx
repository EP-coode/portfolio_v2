import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  slidedIn: boolean;
};

export default function SlideLeft({ children, slidedIn }: Props) {
  return (
    <div
      className={classNames(
        "transition-transform duration-700 translate-x-full overflow-hidden",
        {
          "translate-x-0": slidedIn,
        }
      )}
    >
      {children}
    </div>
  );
}
