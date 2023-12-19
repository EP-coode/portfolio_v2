import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import React from "react";
import { Article } from "../../../src/model/Article";
import {
  extractUniqueTagsFromArticles,
  getAllArticles,
} from "../../../src/repository/articles";
import classNames from "classnames";
import Link from "next/link";
import { ArticleCard } from "../../../src/components/ArticleCard";
import MainContentContainer from "../../../src/components/containers/MainContentContainer";

const pageSize = 10;

const allPseudocategoryName = "all";

interface PageProps {
  articles: Article[];
  page_number: number;
  total_pages: number;
  tags: { [key: string]: number };
  current_tag?: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getAllArticles();
  const articlesCount = extractUniqueTagsFromArticles(articles);

  const paths = [];

  for (const [category, number_of_articles] of Object.entries(articlesCount)) {
    const pagesCount =
      Math.floor(number_of_articles / pageSize) +
      (number_of_articles % pageSize > 0 ? 1 : 0);

    for (let p = 0; p < pagesCount; p++) {
      paths.push({ params: { page_number: p.toString(), category } });
    }
  }

  const pagesCount =
    Math.floor(articles.length / pageSize) +
    (articles.length % pageSize > 0 ? 1 : 0);

  for (let p = 0; p < pagesCount; p++) {
    paths.push({
      params: { page_number: p.toString(), category: allPseudocategoryName },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PageProps,
  { page_number: string; category: string }
> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const { page_number: raw_page_num, category } = params;
  const page_number = Math.max(0, parseInt(raw_page_num) || 0);
  let articles: Article[];
  let total_pages: number;
  let tags: { [key: string]: number };

  try {
    const _articles = await getAllArticles();
    const allArticles = await getAllArticles();

    if (category != allPseudocategoryName)
      articles = _articles
        .filter((article) => article.tags.includes(category))
        .slice(page_number * pageSize, (page_number + 1) * pageSize);
    else
      articles = _articles.slice(
        page_number * pageSize,
        (page_number + 1) * pageSize
      );

    const count = extractUniqueTagsFromArticles(allArticles);
    const current_count =
      category === allPseudocategoryName ? _articles.length : count[category];

    total_pages =
      Math.floor(current_count / pageSize) +
      (current_count % pageSize > 0 ? 1 : 0);

    tags = { all: _articles.length, ...count };
  } catch (e) {
    return {
      notFound: true,
    };
  }

  if (!articles) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      articles,
      page_number,
      total_pages,
      tags,
      current_tag: category ?? "all",
    },
  };
};

const ArticlePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  articles,
  page_number,
  total_pages,
  tags,
  current_tag,
}) => {
  return (
    <MainContentContainer>
      <h1 className="text-3xl mb-7">Blog</h1>
      <div className="mb-10">
        <h3>Filter posts</h3>
        <div className="flex gap-1.5 flex-wrap my-3">
          {Object.entries(tags).map(([tag, number_of_articles]) => (
            <Link
              href={`/articles/${tag}/0`}
              className={classNames({
                "pointer-events-none": tag === current_tag,
              })}
              key={tag}
            >
              <button
                className={classNames(
                  { "btn-active": tag === current_tag },
                  "btn btn-sm btn-outline btn-secondary"
                )}
              >
                {tag} <span className="ml-1.5 font-thin">({number_of_articles})</span>
              </button>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex gap-6 flex-row flex-wrap justify-center align-top">
        {articles.map((article: Article) => (
          <div className="basis-80 max-w-xl grow" key={article.slug}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
      <div className="w-full mt-10 flex align-middle justify-center">
        <div className="btn-group">
          <Link href={`/articles/${current_tag}/${page_number - 1}`}>
            <button
              className={classNames("btn", {
                "btn-disabled": page_number <= 0,
              })}
            >
              «
            </button>
          </Link>
          <div className="inline-flex h-full p-3">Page {page_number + 1}</div>
          <Link href={`/articles/${current_tag}/${page_number + 1}`}>
            <button
              className={classNames("btn", {
                "btn-disabled": total_pages <= page_number + 1,
              })}
            >
              »
            </button>
          </Link>
        </div>
      </div>
    </MainContentContainer>
  );
};

export default ArticlePage;
