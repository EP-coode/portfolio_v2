import React from "react";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function Section({ title, children }: SectionProps) {
  return (
    <section>
      <h1>{title}</h1>
      <div>{children}</div>
    </section>
  );
}
