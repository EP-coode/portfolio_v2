import { FC } from "react";
import md from "markdown-it";

interface Props {
  content: string;
  className?: string;
}

export const MarkdownSection: FC<Props> = ({ content, className }) => {
  return (
    <div className={`prose prose-white mx-auto max-w-none ${className ?? ""}`}>
      <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
    </div>
  );
};
