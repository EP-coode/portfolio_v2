import { Technology } from "./Technology";

export interface Project {
  id: string;
  title: string;
  images: string[];
  technologies: Technology[];
  teaser: string;
  repo_link: string;
  live_sample_link: string;
  content: string;
}
