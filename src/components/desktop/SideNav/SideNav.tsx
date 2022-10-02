import Image from "next/image";
import React from "react";

import logo from "../../../../public/images/logo.png"

type Props = {
  children: React.ReactNode;
};

const SideNav = ({ children }: Props) => (
  <nav className="w-40 h-screen sticky top-0 left-0 bg-gray-light flex-grow-0 flex-shrink-0 z-20 flex flex-col">
    <div className="p-4 bg-stone-800">
    <Image
      src={logo}
      objectFit="cover"
      placeholder="blur"
    />
    <h2 className="text-white text-center text-2xl font-mono">
      Ernest Przybył
    </h2>
    </div>
    <nav className="flex-grow flex flex-col justify-around">{children}</nav>
    <div className="bg-purple-400 py-10 px-3 flex justify-around">
      LINKS
    </div>
  </nav>
);

export default SideNav;
