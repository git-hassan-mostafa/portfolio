"use client";
import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import s from "./Projects.module.css";
import ProjectCard from "../ProjectCard/ProjectCard";
import { useAppoloFetch } from "@/utils/Applo";
import image from "../../utils/assests/cocktail.jpg";
import { StaticImageData } from "next/image";
import { GQL_GET_PROJECTS } from "@/utils/queries";
import { ProjectsType } from "@/utils/types";

export default function Projects() {
  const { data, isLoading } = useAppoloFetch<ProjectsType>(GQL_GET_PROJECTS);
  return (
    <div className={s["projects"]} id="projects">
      <SectionTitle> Projects </SectionTitle>
      <section className={s["projects-cards"]}>
        {isLoading
          ? "hassan"
              .split("")
              .map((_, i) => (
                <ProjectCard
                  key={i}
                  loader
                  id={""}
                  title={""}
                  link={""}
                  image={""}
                  skills={""}
                  description={""}
                />
              ))
          : data?.data.projects.map((project) => (
              <ProjectCard
                id={project.id}
                title={project.title}
                link={project.link}
                image={`${process.env.PROJECT_URL}/storage/v1/object/public/images/${project.image}`}
                skills={project.skills}
                key={project.id}
                description={project.description}
              />
            ))}
      </section>
    </div>
  );
}
