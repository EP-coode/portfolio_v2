import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import React from "react";
import { Article } from "../../src/model/Article";
import { getAllArticles, getArticleById } from "../../src/repository/articles";

interface ArticlePageProps {
  article: Article;
}

export const getStaticProps: GetStaticProps<
  ArticlePageProps,
  { article_slug: string }
> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const { article_slug } = params;
  let article: Article | null;

  try {
    article = await getArticleById(article_slug);
  } catch (e) {
    return {
      notFound: true,
    };
  }

  if (!article) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await getAllArticles()).map((a) => ({
    params: { article_slug: a.slug },
    locale: "en",
  }));
  return {
    paths,
    fallback: false,
  };
};

const ArticlePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  article,
}) => {
  const router = useRouter();
  const { article_slug } = router.query;

  return <div>ArticlePage - {article_slug}</div>;
};

export default ArticlePage;
