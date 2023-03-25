import React from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { TimelineEntry } from "./TimelineEntry";

export type TimeLineEntry = {
  id: number;
  timeLabel: string;
  title: string;
  link: {
    label: string;
    link?: string;
  };
  description: string;
};

export const TimeLine = ({ entries }: { entries: TimeLineEntry[] }) => {
  const isSmallDevice = useMediaQuery("sm");

  return (
    <ul
      className={`relative 
      before:absolute before:left-3 sm:before:left-1/2 before:-translate-x-1/2 sm:before:-translate-x-1/2 before:top-0 before:bg-base-200 
      before:w-1 before:h-full before:bg-gradient-to-b  before:from-green-400  before:to-blue-500`}
    >
      {entries.map((e, i) => (
        <TimelineEntry
          entry={e}
          key={e.id}
          align={!isSmallDevice || i % 2 == 0 ? "right" : "left"}
        />
      ))}
    </ul>
  );
};
