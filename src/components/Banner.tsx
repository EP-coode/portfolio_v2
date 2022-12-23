import dynamic from "next/dynamic";
import Image from "next/image";
import React, { Suspense } from "react";

import bannerImage from "../../public/images/TheMoon.webp";
import useMatchMaxWidth from "../hooks/useMatchMaxWidth";

type Props = {
  title: string;
};

const DynamicParticles = dynamic(() => import("./Particles"), {
  suspense: true,
  ssr: false,
});

export default function Banner({ title }: Props) {
  const hideParticles = useMatchMaxWidth("768px");
  return (
    <div className="h-screen relative overflow-hidden bg-black">
      <h1
        className="
          text-center text-white text-5xl xs:text-6xl text-shadow font-bold
          max-w-md p-3 pb-32 z-20
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          pointer-events-none
          md:rotate-[35deg]
      "
      >
        {title}
      </h1>
      <Image
        src={bannerImage}
        className="brightness-90 bg-transparent absolute z-10 pointer-events-none"
        alt="laptop on the desk"
        layout="fill"
        objectFit="cover"
        placeholder="blur"
      />
      <Suspense>
        <div className="w-full h-full absolute z-0">
          {!hideParticles && <DynamicParticles />}
        </div>
      </Suspense>
    </div>
  );
}
