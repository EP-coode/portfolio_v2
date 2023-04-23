import React from "react";
import { Article } from "../model/Article";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";

type Props = {
  article: Article;
};

export const ArticleCard = ({ article }: Props) => {
  return (
    <div className="card lg:card-side bg-base-300 shadow-xl h-128 lg:h-96">
      <figure className="w-full h-1/2 lg:w-1/2 lg:h-full relative">
        <Image src={article.banner_img_url} layout="fill" objectFit="cover" />
      </figure>
      <div className="card-body basis-1/2 p-5 relative">
        <div className="badge text-gray-400 p-3 badge-md absolute top-0 right-5 -translate-y-1/2">
          {new Date(article.date).toLocaleDateString("en-EN", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
        <h2 className="card-title">{article.title}</h2>
        <div className="flex gap-1.5 flex-wrap">
          {article.tags.map((tag) => (
            <div className="badge badge-md badge-accent" key={tag}>
              {tag}
            </div>
          ))}
        </div>
        <p className="mt-3">{article.teaser} ...</p>
        <div className="card-actions justify-end">
          <Link href={`/articles/${article.slug}`}>
            <button className="btn gap-2">
              read more
              <FontAwesomeIcon icon={faArrowRight} className="h-1/2" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
