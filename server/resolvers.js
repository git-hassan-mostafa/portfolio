import { addProject, deleteProject, project, projects, updateProject } from './project.js';
import { addSkill, deleteSkill, skill, skills, updateSkill } from './skill.js';

export const resolvers = {
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