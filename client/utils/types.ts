import { StaticImageData } from "next/image";

export interface ProjectType {
  id: string;
  title: string;
  link: string;
  image: string | StaticImageData;
  description: string;
  skills: string;
}

export interface SkillType {
  id: string;
  title: string;
  percentage: number;
  image: string;
}
