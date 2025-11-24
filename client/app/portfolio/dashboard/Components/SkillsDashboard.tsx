"use client";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import image from "../../../../utils/assests/firebase.png";
import { SkillType } from "@/utils/types";
import { useKills } from "@/utils/Hooks/useSkills";
import { ImagesUrl } from "@/utils/constants";

export default function SkillsDashboard() {
  const [newSkill, setNewSkill] = useState<SkillType>({
    title: "",
    percentage: 0,
    image: "",
  } as SkillType);
  const [file, setFile] = React.useState<File | null>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const skillService = useKills();

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

  const handleAddSkill = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await skillService.handleAddSkill(
      newSkill as SkillType,
      file as File,
      fileName as string
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Skills Dashboard</h1>

      <form
        onSubmit={handleAddSkill}
        className="bg-white/5 p-5 rounded-lg shadow-md"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="w-32 h-32 rounded-md overflow-hidden bg-gray-800 flex items-center justify-center">
              <Image
                priority
                decoding="async"
                width={128}
                height={128}
                src={photoPreview || image}
                alt="skill preview"
                className="object-cover w-full h-full"
              />
            </div>

            <label className="mt-4 w-full text-center">
              <input
                onChange={handleSelectFile}
                type="file"
                className="hidden"
              />
              <span className="inline-block px-3 py-2 bg-sky-600 text-white rounded cursor-pointer text-sm">
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
              <label className="text-sm text-gray-300">Skill Name</label>
              <input
                className="w-full p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={newSkill.title}
                onChange={(e) =>
                  setNewSkill((prev) => ({ ...prev, title: e.target.value }))
                }
                type="text"
                placeholder="e.g. React"
              />

              <label className="text-sm text-gray-300">Percentage</label>
              <input
                className="w-full p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={newSkill.percentage}
                onChange={(e) =>
                  setNewSkill((prev) => ({
                    ...prev,
                    percentage: Number(e.target.value),
                  }))
                }
                type="number"
                min={0}
                max={100}
                placeholder="0 - 100"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 disabled:opacity-60"
                  disabled={skillService.isSaveLoading}
                >
                  {skillService.isSaveLoading ? "Saving..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <section className="mt-8">
        <h2 className="text-xl font-medium mb-4">Existing Skills</h2>

        {skillService.isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillService.skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center gap-4 p-3 bg-white/5 rounded"
              >
                <div className="w-14 h-14 rounded overflow-hidden bg-gray-800 flex-shrink-0">
                  <Image
                    width={160}
                    height={160}
                    loading="lazy"
                    src={`${ImagesUrl}${skill.image}`}
                    alt={skill.title}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{skill.title}</h3>
                    <span className="text-sm text-gray-400">
                      {skill.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded mt-2 overflow-hidden">
                    <div
                      className="h-full bg-sky-500"
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this skill?"
                        )
                      ) {
                        skillService.handleDeleteSkill(skill.id, skill.image);
                      }
                    }}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    disabled={skillService.isDeleteLoading}
                  >
                    {skillService.isDeleteLoading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
