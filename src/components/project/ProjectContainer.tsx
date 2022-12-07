import React, { PropsWithChildren } from "react";

export const ProjectContainer = ({ children }: PropsWithChildren) => {
  return <div className="py-10 flex gap-5 flex-wrap justify-evenly">{children}</div>;
};
