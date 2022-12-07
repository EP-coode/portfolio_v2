import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Project } from "../../model/Project";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

type Props = {
  project: Project;
};

export const ProjectCard = ({ project }: Props) => {
  return (
    <div className="flex flex-col relative max-w-xl min-h-[20rem] flex-grow basis-96 bg-base-200 shadow-xl bg-opacity-75 rounded-md overflow-hidden">
      {project.images[0] && (
        <figure className="-z-10 absolute w-full h-full">
          <Image
            src={project.images[0]}
            layout="fill"
            objectFit="contain"
            loading="lazy"
          />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">{project.title}</h2>
        <div className="flex-grow">
          {project.technologies && (
            <div className="flex gap-1 my-2 flex-wrap">
              {project.technologies.map((tech) => (
                <span className="badge badge-accent" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          )}
          <p> {project.teaser}</p>
        </div>
        <div className="card-actions justify-end mt-10">
          {project.live_sample_link && (
            <Link href={project.live_sample_link}>
              <a className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faPlay} className="h-3/4 mr-2" />
                live sample
              </a>
            </Link>
          )}
          {project.repo_link && (
            <Link href={project.repo_link}>
              <a className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} className="h-3/4 mr-2" />
                repository
              </a>
            </Link>
          )}
          {/* <a className="btn btn-primary btn-sm">
            <FontAwesomeIcon icon={faArrowRight} className="h-3/4 mr-2" />
            more
          </a> */}
        </div>
      </div>
    </div>
  );
};
