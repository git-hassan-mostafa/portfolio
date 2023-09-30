import ProjectPage from '@/components/ProjectPage/ProjectPage'
import { client } from '@/utils/ApploClient'
import { GQL_GET_PROJECTS } from '@/utils/queries'
import { ProjectType, ProjectsType } from '@/utils/types'
import { gql } from '@apollo/client'
import React from 'react'

export default function page() {
  return (
    <div>
      <ProjectPage />
    </div>
  )
}

export async function generateStaticParams() {
  const data= await client.query({
    query: gql(GQL_GET_PROJECTS),
  })
  return data.data.projects.map((project: ProjectType) => ({
    id: project.id.replaceAll(' ','00'),
    title: project.title.replaceAll(' ','00'),
    link: project.link.replaceAll(' ','00'),
    image: project.image.toString().replaceAll(' ','00'),
    skills: project.skills.replaceAll(' ','00'),
    description:project.description.replaceAll(' ','00')
  }))
}
