import React from "react";

type Props = {
  children: React.ReactNode;
};

const SideNav = ({ children }: Props) => (
  <div>
    <nav>{children}</nav>
  </div>
);

export default SideNav;
