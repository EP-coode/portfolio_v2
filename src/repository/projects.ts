import matter from "gray-matter";
import fs from "fs/promises";
import { Project } from "../model/Project";
import { BASE_CONTENT_PATH } from ".";

export const getAllProjects = async () => {
  try {
    const projectsDir = await fs.readdir(`${BASE_CONTENT_PATH}/projects`);

    const projects = await Promise.all(
      projectsDir.map(async (fileName) => {
        const readFile = await fs.readFile(
          `${BASE_CONTENT_PATH}/projects/${fileName}`,
          "utf-8"
        );
        const { data, content } = matter(readFile);
        const project: Project = {
          id: data.id ?? null,
          title: data.title ?? null,
          images: data.images ?? null,
          live_sample_link: data.live_sample_link ?? null,
          repo_link: data.repo_link ?? null,
          teaser: data.teaser ?? null,
          technologies: data.technologies ?? null,
          content,
        };
        return project;
      })
    );

    return projects;
  } catch (e: any) {
    if (e instanceof Error) {
      const err = new Error(`Failed to load projects: ${e.message}`);
      err.stack = e.stack;
      throw err;
    } else {
      throw e;
    }
  }
};
