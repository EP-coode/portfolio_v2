import React, { PropsWithChildren } from "react";

const MainContentContainer = ({ children }: PropsWithChildren) => {
  return <div className="max-w-4xl mx-auto p-7">{children}</div>;
};

export default MainContentContainer;
