import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";

import { Article } from "../model/Article";
import { BASE_CONTENT_PATH } from ".";

export const getAllArticles = async (
  limit = 10,
  page = 0
): Promise<Article[]> => {
  try {
    const allArticleFiles = await fs.readdir(`${BASE_CONTENT_PATH}/articles`);
    const startAtFileIndex = Math.min(
      page * limit,
      allArticleFiles.length - 1,
      0
    );
    const articlesDir = allArticleFiles.slice(
      startAtFileIndex,
      Math.max(limit, 1)
    );

    const articles = await Promise.all(
      articlesDir.map(async (fileName) => {
        const { name } = path.parse(fileName);
        const readFile = await fs.readFile(
          `${BASE_CONTENT_PATH}/articles/${fileName}`,
          "utf-8"
        );
        const { data, content } = matter(readFile);
        const article: Article = {
          slug: name,
          date: data.date ?? null,
          tags: data.tags ?? null,
          title: data.title ?? null,
          banner_img_url: data.banner_img_url ?? null,
          mdContent: content,
          teaser: data.teaser ?? null,
        };
        return article;
      })
    );

    return articles;
  } catch (e: any) {
    if (e instanceof Error) {
      const err = new Error(`Failed to load articles: ${e.message}`);
      err.stack = e.stack;
      throw err;
    } else {
      throw e;
    }
  }
};

export const getArticleById = async (
  article_slug: string
): Promise<Article | null> => {
  try {
    const readFile = await fs.readFile(
      `${BASE_CONTENT_PATH}/articles/${article_slug}.md`,
      "utf-8"
    );
    const { data, content } = matter(readFile);
    const article: Article = {
      slug: article_slug,
      date: data.date ?? null,
      tags: data.tags ?? null,
      title: data.title ?? null,
      banner_img_url: data.banner_img_url ?? null,
      mdContent: content,
      teaser: data.teaser ?? null,
    };
    return article;
  } catch (e: any) {
    if (e instanceof Error) {
      const err = new Error(`Failed to load about me section: ${e.message}`);
      err.stack = e.stack;
      throw err;
    } else {
      throw e;
    }
  }
};
