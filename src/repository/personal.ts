import fs from "fs/promises";
import matter from "gray-matter";

export const getAboutMeSection = async () => {
  try {
    const readFile = await fs.readFile(`content/aboutme.md`, "utf-8");
    const { data, content } = matter(readFile);
    const aboutMeSection = {
      data: data as { title: string },
      content,
    };
    return aboutMeSection;
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
