import { gql } from "@apollo/client"

export const GQL_ADD_SKILLS = gql`
            mutation addSkill($skill: addSkillInput!){
                addSkill(skill:$skill) {
                  id,
                  title,
                  image,
                  percentage,
                }
              }
    `
export const GQL_GET_SKILLS = `
            query Skills {
                skills {
                id,
                title,
                image,
                percentage
                }
            }
    `

export const GQL_DELETE_SKILLS = gql`
                mutation DeleteSkill($id: ID!){
                    deleteSkill(id: $id) {
                    id
                    }
                }
      `

export const GQL_ADD_PROJECTS = gql`
                mutation addProject($project: addProjectInput!){
                    addProject(project:$project) {
                    id,
                    title,
                    description,
                    link,
                    image,
                    skills
                    }
                }
    `

export const GQL_GET_PROJECTS = `
                query Projects {
                    projects {
                    id,
                    title,
                    image,
                    description,
                    link,
                    skills
                    }
                }
    `

export const GQL_DELETE_PROJECTS = gql`
                mutation DeletePrject($id: ID!){
                    deleteProject(id: $id) {
                    id
                    }
                }
      `