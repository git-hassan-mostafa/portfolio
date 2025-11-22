"use client";
import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import s from "./Projects.module.css";
import ProjectCard from "../ProjectCard/ProjectCard";
import { useProjects } from "@/utils/Hooks/useProjects";

export default function Projects() {
  const { projects, isLoading } = useProjects();
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
          : projects.map((project) => (
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
