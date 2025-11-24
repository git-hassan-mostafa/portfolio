"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import image from "../../../../utils/assests/firebase.png";
import { ProjectType } from "@/utils/types";
import { useProjects } from "@/utils/Hooks/useProjects";
import { ImagesUrl } from "@/utils/constants";

export default function ProjectsDashboard() {
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

    const f = e?.target?.files?.[0];
    if (f) {
      const url = URL.createObjectURL(f);
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Projects Dashboard</h1>

      <form
        onSubmit={handleAddproject}
        className="bg-white/5 p-6 rounded-lg shadow-md"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="w-40 h-40 rounded-md overflow-hidden bg-gray-800 flex items-center justify-center">
              <Image
                priority
                decoding="async"
                width={160}
                height={160}
                src={photoPreview || image}
                alt="project preview"
                className="object-cover w-full h-full"
              />
            </div>

            <label className="mt-4 w-full text-center">
              <input
                onChange={handleSelectFile}
                type="file"
                className="hidden"
              />
              <span className="inline-block px-4 py-2 bg-sky-600 text-white rounded cursor-pointer text-sm">
                Choose image
              </span>
            </label>
            {fileName && (
              <p className="mt-2 text-sm text-gray-300 truncate w-40">
                {fileName}
              </p>
            )}
          </div>

          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 gap-4">
              <label className="text-sm text-gray-300">Project Title</label>
              <input
                className="w-full p-2 rounded bg-white text-black border border-transparent focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={newProject?.title}
                onChange={(e) =>
                  setNewProject(
                    (prev) =>
                      ({ ...prev, title: e.target.value } as ProjectType)
                  )
                }
                type="text"
                placeholder="My project title"
              />

              <label className="text-sm text-gray-300">Project Link</label>
              <input
                className="w-full p-2 rounded bg-white text-black border border-transparent focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={newProject?.link}
                onChange={(e) =>
                  setNewProject(
                    (prev) => ({ ...prev, link: e.target.value } as ProjectType)
                  )
                }
                type="text"
                placeholder="https://..."
              />

              <label className="text-sm text-gray-300">Description</label>
              <textarea
                className="w-full p-2 rounded bg-white text-black border border-transparent focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={newProject?.description}
                onChange={(e) =>
                  setNewProject(
                    (prev) =>
                      ({ ...prev, description: e.target.value } as ProjectType)
                  )
                }
                placeholder="Short description"
                rows={3}
              />

              <label className="text-sm text-gray-300">
                Skills (comma separated)
              </label>
              <input
                className="w-full p-2 rounded bg-white text-black border border-transparent focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={newProject?.skills}
                onChange={(e) =>
                  setNewProject(
                    (prev) =>
                      ({ ...prev, skills: e.target.value } as ProjectType)
                  )
                }
                type="text"
                placeholder="React, Tailwind, Node"
              />

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 disabled:opacity-60"
                  disabled={projectService.isSaveLoading}
                >
                  {projectService.isSaveLoading ? "Saving..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <section className="mt-8">
        <h2 className="text-xl font-medium mb-4">Existing Projects</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projectService.projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-4 p-4 bg-white/5 rounded shadow-sm"
            >
              <div className="w-20 h-20 rounded overflow-hidden bg-gray-800 flex-shrink-0">
                <Image
                  width={160}
                  height={160}
                  loading="lazy"
                  src={`${ImagesUrl}${project.image}`}
                  alt={project.title}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{project.title}</h3>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-sky-400 hover:underline"
                  >
                    View
                  </a>
                </div>
                <p className="text-sm text-gray-300 truncate">
                  {project.description}
                </p>
                <p className="text-xs text-gray-400 mt-1">{project.skills}</p>
              </div>

              <div>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this project?"
                      )
                    ) {
                      projectService.handleDeleteProject(
                        project.id,
                        project.image as string
                      );
                    }
                  }}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  disabled={projectService.isDeleteLoading}
                >
                  {projectService.isDeleteLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
