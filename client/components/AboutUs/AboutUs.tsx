import React from "react";
import s from "./AboutUs.module.css";
import SectionTitle from "../SectionTitle/SectionTitle";
export default function AboutUs() {
  return (
    <div className={s["about-us"]} id="about-us">
      <SectionTitle>About</SectionTitle>
      <div className={s["about-us-text"]}>
        <p className={s.paragraph}>
          Results-oriented Software Developer and Technical Analyst with 2+
          years of experience designing, developing, and maintaining web
          applications using .NET Core MVC, SQL Server, and React. Proven
          ability to deliver scalable, maintainable solutions using clean
          architecture and modern CI/CD pipelines. Strong collaborator in Agile
          environments with expertise in requirement analysis, code review, and
          full-stack development.
        </p>
      </div>
    </div>
  );
}
