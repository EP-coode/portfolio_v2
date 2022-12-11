import dynamic from "next/dynamic";
import Image from "next/image";
import React, { Suspense } from "react";

import bannerImage from "../../public/images/banner.webp";
import useMatchMaxWidth from "../hooks/useMatchMaxWidth";

type Props = {
  title: string;
};

const DynamicParticles = dynamic(
  () => import("./Particles"),
  { suspense: true, ssr: false }
);

export default function Banner({ title }: Props) {
  const hideParticles = useMatchMaxWidth("768px");
  return (
    <div className="h-screen relative">
      <h1
        className="
          text-center text-white text-4xl xs:text-6xl text-shadow font-bold
          w-full p-7 pb-32 z-10
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      "
      >
        {title}
      </h1>
      <Image
        src={bannerImage}
        className="brightness-50 md:brightness-[25%] z-0"
        alt="laptop on the desk"
        layout="fill"
        objectFit="cover"
        placeholder="blur"
      />
      <Suspense>{!hideParticles && <DynamicParticles />}</Suspense>
    </div>
  );
}
