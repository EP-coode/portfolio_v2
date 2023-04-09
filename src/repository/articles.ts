import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";

import { Article } from "../model/Article";

export const getAllArticles = async (): Promise<Article[]> => {
  try {
    const articlesDir = await fs.readdir("content/articles");

    const articles = await Promise.all(
      articlesDir.map(async (fileName) => {
        const { name } = path.parse(fileName);
        const readFile = await fs.readFile(
          `content/articles/${fileName}`,
          "utf-8"
        );
        const { data, content } = matter(readFile);
        const article: Article = {
          slug: name,
          date: data.date ?? null,
          tags: data.tags ?? null,
          title: data.title ?? null,
          mdContent: content,
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
      `content/articles/${article_slug}.md`,
      "utf-8"
    );
    const { data, content } = matter(readFile);
    const article: Article = {
      slug: article_slug,
      date: data.date ?? null,
      tags: data.tags ?? null,
      title: data.title ?? null,
      mdContent: content,
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
