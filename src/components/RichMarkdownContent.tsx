import classNames from "classnames";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
  className?: string;
}

export const RichMarkdownContent: FC<Props> = ({ content, className }) => {
  return (
    <div className={`prose prose-white mx-auto max-w-none ${className ?? ""}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // Allows us to have embedded HTML tags in our markdown
        linkTarget="_blank" // Append target _blank to links so they open in new tab/window
        components={{
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={
                  { ...atomDark, margin: "0 0 0 0", padding: "0 0 0 0" } as any
                }
                language={match[1]}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code {...props}>{children}</code>
            );
          },
          pre: ({ node, children, className, ...props }) => (
            <pre className="not-prose p-0 bg-transparent" {...props}>
              {children}
            </pre>
          ),
          input: ({ node, children, className, ...props }) => (
            <input
              className="checkbox checkbox-sm my-0 mx-2 inline-block"
              {...props}
            >
              {children}
            </input>
          ),
          ul: ({ node, children, className, ...props }) => (
            <ul
              className={classNames({
                "list-none": className == "contains-task-list",
                "list-disc": className != "contains-task-list",
              })}
              {...props}
            >
              {children}
            </ul>
          ),
          img: ({ node, children, className, ...props }) => (
            <img
              {...props}
              className="min-h-32 lg:min-h-64 object-contain mx-auto"
            ></img>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
