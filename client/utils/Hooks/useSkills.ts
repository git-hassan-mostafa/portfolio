import { useEffect, useState } from "react";
import supabase from "../Supabase/supabase";
import { SkillType } from "../types";

export function useKills() {
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setIsLoading(true);
    var skills = await supabase
      .from("skills")
      .select("*")
      .returns<SkillType[]>();
    skills.data && setSkills(skills.data);
    setIsLoading(false);
  };
  const handleAddSkill = async (
    newSkill: SkillType,
    file: File,
    fileName: string
  ) => {
    try {
      setIsSaveLoading(true);
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`skills-images/${fileName}`, file as File, {
          contentType: "image/png",
          cacheControl: "3600",
        });
      if (data) {
        newSkill.image = data.path;
        const response = await supabase.from("skills").insert([newSkill]);
        if (response.error) {
          await supabase.storage
            .from("images")
            .remove([`skills-images/${file?.name as string}`]);
        }
      } else {
        console.error(error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaveLoading(false);
      fetchSkills();
    }
  };

  const handleDeleteSkill = async (id: string, path: string) => {
    setIsDeleteLoading(true);
    const response = await supabase.from("skills").delete().eq("id", id);
    if (!response.error) {
      const { data, error } = await supabase.storage
        .from("images")
        .remove([path]);
      console.log(data);
    }
    setIsDeleteLoading(false);
    fetchSkills();
  };

  return {
    skills,
    isLoading,
    isSaveLoading,
    isDeleteLoading,
    fetchSkills,
    handleAddSkill,
    handleDeleteSkill,
  };
}
