import classNames from "classnames";
import React from "react";
import { MarkdownSection } from "../MarkdownSection";
import { TimeLineEntry } from "./TimeLine";

type Props = {
  entry: TimeLineEntry;
  align: "left" | "right";
};

export const TimelineEntry = ({ entry, align }: Props) => {
  return (
    <li className="relative ">
      <div
        className={classNames(
          `w-full flex flex-col gap-2 flex-wrap sm:w-1/2 px-10 py-3
          before:w-6 before:h-6 before:absolute before:bg-cyan-500 before:left-0 sm:before:left-1/2 sm:before:-translate-x-1/2
          before:rounded-xl before:border-solid before:border-4 before:border-base-100
          `,
          {
            "ml-auto mr-0 items-start": align == "right",
            "ml-0 mr-auto items-end": align == "left",
          }
        )}
      >
        <span className="badge badge-md p-4">{entry.timeLabel}</span>
        <h3 className="text-lg shrink-1">{entry.title}</h3>

        <a
          className="btn btn-accent btn-xs h-fit normal-case"
          href={entry.link.link ?? ""}
          aria-disabled={!entry.link.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {entry.link.label}
        </a>
        <MarkdownSection
          content={entry.description}
          className="prose-sm"
        ></MarkdownSection>
      </div>
    </li>
  );
};
