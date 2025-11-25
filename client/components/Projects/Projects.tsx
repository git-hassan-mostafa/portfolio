"use client";
import { ProjectType } from "@/utils/types";
import ProjectCard from "../ProjectCard/ProjectCard";
import SectionTitle from "../SectionTitle/SectionTitle";
import s from "./Projects.module.css";
import { useProjects } from "@/utils/Hooks/useProjects";
import { ImagesUrl } from "@/utils/constants";

export default function Projects() {
  const { projects, isLoading } = useProjects();
  return (
    <div className={s["projects"]} id="projects">
      <SectionTitle> Projects </SectionTitle>
      <section className={s["projects-cards"]}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </div>
  );
}
