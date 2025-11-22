"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import image from "../../../../../../utils/assests/firebase.png";
import { ProjectType } from "@/utils/types";
import { useProjects } from "@/utils/Hooks/useProjects";

export default function page() {
  const [file, setFile] = React.useState<File | null>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [newProject, setNewProject] = useState<ProjectType>({
    title: "",
    link: "",
    description: "",
    skills: "",
    image: "",
  } as ProjectType);

  const projectService = useProjects();

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setFileName(
        e.target.files[0].name + `${(Math.random() * 100).toFixed(2)}`
      );
    }

    const file = e?.target?.files?.[0];
    if (file) {
      console.log(file);
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  const handleAddproject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await projectService.addProject(
      newProject as ProjectType,
      file as File,
      fileName as string
    );
  };

  return (
    <>
      <form onSubmit={handleAddproject}>
        <Image
          priority
          decoding="async"
          width={100}
          height={100}
          src={photoPreview || image}
          alt={"photo"}
        />{" "}
        <br />
        <input
          onChange={handleSelectFile}
          type="file"
          name=""
          id=""
        /> <br /> <br />
        project title :{" "}
        <input
          className="text-black"
          value={newProject?.title}
          onChange={(e) =>
            setNewProject(
              (prev) => ({ ...prev, title: e.target.value } as ProjectType)
            )
          }
          type="text"
        />{" "}
        <br /> <br />
        project link :{" "}
        <input
          className="text-black"
          value={newProject?.link}
          onChange={(e) =>
            setNewProject(
              (prev) => ({ ...prev, link: e.target.value } as ProjectType)
            )
          }
          type="text"
          name=""
          id=""
        />{" "}
        <br /> <br />
        project description :{" "}
        <textarea
          className="text-black"
          value={newProject?.description}
          onChange={(e) =>
            setNewProject(
              (prev) =>
                ({ ...prev, description: e.target.value } as ProjectType)
            )
          }
          name=""
          id=""
        />{" "}
        <br /> <br />
        project skills :{" "}
        <input
          className="text-black"
          value={newProject?.skills}
          onChange={(e) =>
            setNewProject(
              (prev) => ({ ...prev, skills: e.target.value } as ProjectType)
            )
          }
          type="text"
          name=""
          id=""
        />{" "}
        <br /> <br />
        <button type="submit">
          {projectService.isSaveLoading ? "loading..." : "submit"}
        </button>{" "}
        <br />
      </form>
      <br />
      <br />
      <br />
      {projectService.projects.map((project) => (
        <div key={project.id}>
          <span> {project.title} </span>
          <button
            onClick={() =>
              projectService.handleDeleteProject(
                project.id,
                (project.image as string).split("/images/")[1]
              )
            }
            className="bg-white text-black"
          >
            {" "}
            {projectService.isDeleteLoading ? "loding" : "delete "}
          </button>
        </div>
      ))}
    </>
  );
}
