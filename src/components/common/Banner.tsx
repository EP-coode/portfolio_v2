import Image from "next/image";
import React from "react";

import bannerImage from "../../../public/images/banner.webp";

type Props = {
  title: string;
};

export default function Banner({ title }: Props) {
  return (
    <div className="h-screen">
      <h1
        className="
          text-center text-white text-4xl xs:text-6xl text-shadow font-medium
          w-full p-7 pb-32 z-10
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      "
      >
        {title}
      </h1>
      <Image
        src={bannerImage}
        className="brightness-50 z-0"
        alt="laptop on the desk"
        layout="fill"
        objectFit="cover"
        placeholder="blur"
      />
    </div>
  );
}
