import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import React from "react";
import { getAllArticles } from "../../src/repository/articles";
import { Article } from "../../src/model/Article";
import { ArticleCard } from "../../src/components/ArticleCard";
import MainContentContainer from "../../src/components/containers/MainContentContainer";

const pageSize = 10;

interface PageParams {
  page: number;
}

interface PageProps {
  articles: Article[];
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  res,
  query,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=604800, stale-while-revalidate=86400"
  );
  // 7 days; 1 day

  const pageNum =
    typeof query["page"] == "string" ? parseInt(query["page"]) || 0 : 0;

  const articles = await getAllArticles(pageSize, pageNum);

  return {
    props: {
      articles,
    },
  };
};

const ArticlePage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ articles }) => {
  return (
    <MainContentContainer>
      <h1 className="text-3xl mb-7">Articles and projects</h1>
      <div>
        {articles.map((article) => (
          <ArticleCard article={article} key={article.slug} />
        ))}
      </div>
    </MainContentContainer>
  );
};

export default ArticlePage;
