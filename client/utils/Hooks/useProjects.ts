import { useEffect, useState } from "react";
import { ProjectType } from "../types";
import supabase from "../Supabase/supabase";

export function useProjects(loadAllProjects: boolean = true) {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [projectsCount, setProjectsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  useEffect(() => {
    fetchProjectsCount();
    if (loadAllProjects) {
      fetchProjects();
    }
  }, []);

  async function fetchProjects() {
    setIsLoading(true);
    var projects = await supabase
      .from("projects")
      .select("*")
      .returns<ProjectType[]>();
    projects.data && setProjects(projects.data);
    setIsLoading(false);
  }

  async function fetchProjectsCount() {
    setIsLoading(true);
    var { count } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true });
    setProjectsCount(count || 0);
    setIsLoading(false);
  }

  async function addProject(
    newProject: ProjectType,
    file: File,
    fileName: string
  ) {
    try {
      setIsSaveLoading(true);
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`projects-images/${fileName}`, file as File, {
          contentType: "image/png",
          cacheControl: "3600",
        });
      if (data) {
        newProject.image = data.path;
        const response = await supabase.from("projects").insert([newProject]);

        if (response.error) {
          await supabase.storage
            .from("images")
            .remove([`projects-images/${file?.name as string}`]);
        }
      } else {
        console.error(error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      fetchProjects();
      setIsSaveLoading(false);
    }
  }

  const handleDeleteProject = async (id: string, path: string) => {
    try {
      setIsDeleteLoading(true);
      const response = await supabase.from("projects").delete().eq("id", id);
      if (!response.error) {
        await supabase.storage.from("images").remove([path]);
      }
      return true;
    } catch (ex) {
      console.error(ex);
      return false;
    } finally {
      setIsDeleteLoading(false);
      fetchProjects();
    }
  };

  return {
    projects,
    projectsCount,
    isLoading,
    isSaveLoading,
    isDeleteLoading,
    addProject,
    handleDeleteProject,
  };
}
