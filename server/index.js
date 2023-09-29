import { ApolloServer } from '@apollo/server';
import { typeDefs } from './Schema.js';
import { addProject, deleteProject, project, projects, updateProject } from './project.js';
import { addSkill, deleteSkill, skill, skills, updateSkill } from './skill.js';
import pool from './db.js';
import {startStandaloneServer} from '@apollo/server/standalone'

await pool.connect();

// resolvers
const resolvers = {
  Query: {
    projects,
    project,
    skills,
    skill,
  },
  Mutation: {
    addProject,
    deleteProject,
    updateProject,
    addSkill,
    deleteSkill,
    updateSkill,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 }
})

console.log(`Server ready at: ${url}`)