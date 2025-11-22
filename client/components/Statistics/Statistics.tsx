"use client";
import React from "react";
import s from "./Statistics.module.css";
import { useProjects } from "@/utils/Hooks/useProjects";

export default function Statistics() {
  const { projectsCount, isLoading } = useProjects(false);
  return (
    <div className={s.statistics}>
      <div className={s.statistic}>
        <span className={s.number}> {new Date().getFullYear() - 2023}+ </span>{" "}
        years of experience
      </div>
      <div className={s.statistic}>
        <span className={s.number}> {isLoading ? "..." : projectsCount}+ </span>{" "}
        projects completed
      </div>
    </div>
  );
}
