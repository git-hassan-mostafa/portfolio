import { ImagesUrl } from "@/utils/constants";
import { ProjectType } from "@/utils/types";
import Image from "next/image";
import React, { useState } from "react";
import s from "./ProjectCard.module.css";
import Navigate from "../SVG/Navigate";
import ExpandCollapse from "../SVG/ExpandCollapse";

type ProjectCardProps = {
  project: ProjectType;
  loader?: boolean;
};

const MAX_LENGTH_DESCRIPTION = 200;

export default function ProjectCard({ project, loader }: ProjectCardProps) {
  // Card expanded / collapsed
  const [cardExpanded, setCardExpanded] = useState(false);

  return (
    <article
      className="
        w-full
        shadow-sm backdrop-blur-sm
        hover:shadow-lg hover:-translate-y-0.5
        transition-all duration-200
        background-dark-color article-container
      "
    >
      <div className={`px-4 p-2 ${cardExpanded && "pb-6"}`}>
        {/* Header: Icon + Title + Actions */}
        <header className="flex items-center gap-4">
          <div
            className={`flex ${
              cardExpanded ? "h-16 w-16" : "h-12 w-12"
            } items-center justify-center text-2xl`}
          >
            <Image
              width={160}
              height={160}
              src={`${ImagesUrl}${project.image}`}
              alt={project.title}
            />
          </div>

          <div className="flex flex-1 items-center justify-between gap-4">
            <div className="flex flex-col">
              <h3 className="text-lg sm:text-xl font-semibold color-secondary-text-color">
                {project.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {/* Navigation icon to project link */}
              {project.link && (
                <a
                  title="Navigate to Link"
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center justify-center
                    rounded-full p-2
                    background-secondary-color color-secondary-text-color
                    hover:opacity-90 transition
                  "
                  aria-label="Open project"
                >
                  <Navigate />
                </a>
              )}

              <button
                type="button"
                title={cardExpanded ? "Collapse" : "Expand"}
                onClick={() => setCardExpanded((prev) => !prev)}
                className="
                  inline-flex items-center justify-center
                  rounded-full p-2
                  background-secondary-color color-secondary-text-color
                  hover:opacity-90 transition
                "
                aria-label={
                  cardExpanded ? "Collapse project" : "Expand project"
                }
              >
                {/* Chevron icon */}
                <ExpandCollapse cardExpanded={cardExpanded} />
              </button>
            </div>
          </div>
        </header>

        {/* Expanded content */}
        {cardExpanded && (
          <>
            {/* Description */}
            <div
              dangerouslySetInnerHTML={{ __html: project.description }}
              className="pl-8 mt-4 text-sm color-main-text-color leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1"
            ></div>

            {/* Technologies */}
            <div className="mt-4 pl-8">
              <ul className="flex flex-wrap gap-2">
                {project.skills.split(",").map((tech) => (
                  <li
                    key={tech}
                    className="
                      inline-flex items-center
                      rounded-full
                      px-3 py-1 text-xs font-medium
                      background-secondary-color color-secondary-text-color
                    "
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
