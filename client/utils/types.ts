import { StaticImageData } from "next/image"

export interface ProjectsType {
    projects: {
      id: string,
      title: string,
      link: string
      image: string | StaticImageData,
      description:string
      skills: string
    }[]
  }

  export interface ProjectType {
    id: string,
    title: string,
    link: string
    image: string | StaticImageData,
    description:string
    skills: string
  }

  export interface SkillsType {
    skills: {
      id: string,
      title: string,
      percentage: number
      image: string
    }[]
  }