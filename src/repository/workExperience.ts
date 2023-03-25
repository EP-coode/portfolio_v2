import matter from "gray-matter";
import fs from "fs/promises";
import { WorkExperienceEntry } from "../model/WorkExperienceEntry";

export const getAllWorkExperienceEntries = async (): Promise<
  WorkExperienceEntry[]
> => {
  try {
    const workExpDir = await fs.readdir("content/work_experience");

    const workExpEntries = await Promise.all(
      workExpDir.map(async (fileName) => {
        const readFile = await fs.readFile(
          `content/work_experience/${fileName}`,
          "utf-8"
        );
        const { data, content } = matter(readFile);
        const entry: WorkExperienceEntry = {
          company_icon_url: data.company_icon_url ?? null,
          company_link: data.company_link ?? null,
          company: data.company ?? null,
          from: data.from ?? null,
          position: data.position ?? null,
          to: data.to ?? null,
          description: content,
        };
        return entry;
      })
    );

    // inefficient sorting
    return workExpEntries.sort((e1, e2) =>
      new Date(e1.from) < new Date(e2.from) ? 1 : -1
    );
  } catch (e: any) {
    if (e instanceof Error) {
      const err = new Error(
        `Failed to load work experience entries: ${e.message}`
      );
      err.stack = e.stack;
      throw err;
    } else {
      throw e;
    }
  }
};
