import React from "react";
import { Article } from "../model/Article";
import Link from "next/link";
import Image from "next/image";

type Props = {
  article: Article;
};

export const ArticleCard = ({ article }: Props) => {
  return (
    <div className="card bg-base-300 shadow-xl w-full">
      <figure className="w-full basis-52 shrink-0 relative cursor-pointer">
        <Link href={`/article/${article.slug}`}>
          <Image src={article.banner_img_url} layout="fill" objectFit="cover" />
        </Link>
      </figure>
      <div className="card-body basis-48 p-5 relative">
        <div className="badge text-gray-400 p-3 badge-md absolute top-0 right-5 -translate-y-1/2">
          {new Date(article.date).toLocaleDateString("en-EN", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
        <h2 className="card-title text-2xl hover:text-white cursor-pointer">
          {article.title}
        </h2>
        <div className="flex gap-1.5 flex-wrap mt-2">
          {article.tags.map((tag) => (
            <div className="badge badge-md badge-accent" key={tag}>
              {tag}
            </div>
          ))}
        </div>
        <p className="mt-3">{article.teaser} ...</p>
      </div>
    </div>
  );
};
