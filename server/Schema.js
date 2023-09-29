export const typeDefs = `#graphql
  type Project {
    id: ID!
    title: String!
    link: String!
    description: String!
    image: String!
    skills: String
  }
  type Skill {
    id: ID!
    title:String!
    image:String!
    percentage: Int!
  }
  type Query {
    projects: [Project]
    project(id: ID!): Project
    skills: [Skill]
    skill(id: ID!): Skill
  }
  type Mutation {
    addProject(project: addProjectInput!): Project
    deleteProject(id: ID!): [Project]
    updateProject(id: ID!, project: editProjectInput): Project
    
    addSkill(skill: addSkillInput!): Skill
    deleteSkill(id: ID!): [Skill]
    updateSkill(id: ID!, skill: editSkillInput): Skill
  }
  input addProjectInput {
    title: String!
    link: String!
    description: String!
    image: String!
    skills:String!
  }
  input editProjectInput {
    title: String
    link: String
    description: String
    image: String
    skills:[String!]
  }
  input addSkillInput {
    title:String!
    image:String!
    percentage: Int!
  }
  input editSkillInput {
    title:String
    image:String
    percentage: Int
  }
`