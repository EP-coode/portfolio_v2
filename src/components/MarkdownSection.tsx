import { FC } from "react";
import ReactMarkdown from "react-markdown";
//import remarkGfm from "remark-gfm";

interface Props {
  content: string;
  className?: string;
}

export const MarkdownSection: FC<Props> = ({ content, className }) => {
  return (
    <div className={`prose prose-white mx-auto max-w-none ${className ?? ""}`}>
      <ReactMarkdown
        //remarkPlugins={[remarkGfm]} // Allows us to have embedded HTML tags in our markdown
        linkTarget="_blank" // Append target _blank to links so they open in new tab/window
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
