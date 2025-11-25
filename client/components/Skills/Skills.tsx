"use client";
import React from "react";
import s from "./Skills.module.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import SkillCard from "../SkillCard/SkillCard";
import MouseDownEffect from "../MouseDownEffect/MouseDownEffect";
import { useKills } from "@/utils/Hooks/useSkills";
import { ImagesUrl } from "@/utils/constants";

export default function Skills() {
  const skillService = useKills();
  return (
    <div className={s.skills} id="skills">
      <SectionTitle> Skills </SectionTitle>
      <div className={s["skills-cards"]}>
        {skillService.isLoading
          ? "hassanabdelrahmanmostafa"
              .split("")
              .map((_, i) => (
                <SkillCard key={i} logo={""} name={""} percentage={0} loader />
              ))
          : skillService.skills?.map((skill) => (
              <MouseDownEffect
                scale={97}
                className="cursor-pointer"
                key={skill.id}
              >
                <SkillCard
                  logo={`${ImagesUrl}${skill.image}`}
                  name={skill.title}
                  percentage={skill.percentage}
                />
              </MouseDownEffect>
            ))}
      </div>
    </div>
  );
}
