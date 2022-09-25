import { FC } from "react";
import md from "markdown-it";

interface Props {
  content: string;
}

export const MarkdownSection: FC<Props> = ({ content }) => {
  return (
    <div className="prose prose-white prose-lg mx-auto">
      <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
    </div>
  );
};
