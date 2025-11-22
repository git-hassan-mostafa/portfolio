"use client";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import image from "../../../../../../utils/assests/firebase.png";
import { SkillType } from "@/utils/types";
import { useKills } from "@/utils/Hooks/useSkills";

export default function page() {
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

    const file = e?.target?.files?.[0];
    if (file) {
      console.log(file);
      const url = URL.createObjectURL(file);
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
    <>
      <form onSubmit={handleAddSkill}>
        <Image
          priority
          decoding="async"
          width={100}
          height={100}
          src={photoPreview || image}
          alt={"photo"}
        />{" "}
        <br />
        add image :{" "}
        <input
          onChange={handleSelectFile}
          type="file"
          name=""
          id=""
        /> <br /> <br />
        skill Name :{" "}
        <input
          className="text-black"
          value={newSkill.title}
          onChange={(e) =>
            setNewSkill((prev) => ({ ...prev, title: e.target.value }))
          }
          type="text"
          name=""
          id=""
        />{" "}
        <br /> <br />
        skill percentage :{" "}
        <input
          className="text-black"
          value={newSkill.percentage}
          onChange={(e) =>
            setNewSkill((prev) => ({
              ...prev,
              percentage: Number(e.target.value),
            }))
          }
          type="number"
          name=""
          id=""
        />{" "}
        <br /> <br />
        {skillService.isSaveLoading ? (
          "loading..."
        ) : (
          <button type="submit">submit</button>
        )}
        <br />
        <br />
        <br />
        <br /> <br /> <br />
      </form>
      {skillService.isLoading
        ? "loading..."
        : skillService.skills.map((skill) => (
            <div key={skill.id}>
              <span> {skill.title} </span>
              <button
                onClick={() =>
                  skillService.handleDeleteSkill(skill.id, skill.image)
                }
                className="bg-white text-black"
              >
                {" "}
                {skillService.isDeleteLoading ? "loading..." : "delete "}
              </button>
            </div>
          ))}
    </>
  );
}
