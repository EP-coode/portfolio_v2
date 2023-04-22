import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import React from "react";
import { Article } from "../../../src/model/Article";
import {
  getAllArticles,
  getArticlesCount,
} from "../../../src/repository/articles";
import { ArticleCard } from "../../../src/components/ArticleCard";
import MainContentContainer from "../../../src/components/containers/MainContentContainer";
import classNames from "classnames";
import Link from "next/link";

interface PageProps {
  articles: Article[];
  page_number: number;
  total_pages: number;
}

const pageSize = 2;

export const getStaticPaths: GetStaticPaths = async () => {
  const articlesCount = await getArticlesCount();
  const pagesCount =
    Math.floor(articlesCount / pageSize) +
    (articlesCount % pageSize > 0 ? 1 : 0);

  const paths = new Array(pagesCount);

  for (let p = 0; p < pagesCount; p++) {
    paths.push({ params: { page_number: p.toString() } });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PageProps,
  { page_number: string }
> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const { page_number: raw_page_num } = params;
  const page_number = Math.max(0, parseInt(raw_page_num) || 0);
  let articles: Article[];
  let total_pages: number;

  try {
    const [_articles, _count] = await Promise.all([
      getAllArticles(page_number, pageSize),
      getArticlesCount(),
    ]);
    articles = _articles;
    total_pages =
      Math.floor(_count / pageSize) + (_count % pageSize > 0 ? 1 : 0);
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
    },
  };
};

const ArticlePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  articles,
  page_number,
  total_pages,
}) => {
  return (
    <MainContentContainer>
      <h1 className="text-3xl mb-7">Articles</h1>
      <div className="min-h-screen flex gap-6 flex-col">
        {articles.map((article) => (
          <ArticleCard article={article} key={article.slug} />
        ))}
      </div>
      <div className="w-full mt-10 flex align-middle justify-center">
        <div className="btn-group">
          <Link href={`/articles/page/${page_number - 1}`}>
            <button
              className={classNames("btn", {
                "btn-disabled": page_number <= 0,
              })}
            >
              «
            </button>
          </Link>
          <div className="inline-flex h-full p-3">Page {page_number + 1}</div>
          <Link href={`/articles/page/${page_number + 1}`}>
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
