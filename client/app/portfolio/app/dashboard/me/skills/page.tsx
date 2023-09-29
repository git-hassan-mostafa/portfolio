'use client'
import React, { ChangeEvent, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { gql, useMutation } from '@apollo/client';
import Image from 'next/image';
import image from '../../../../../../utils/assests/firebase.png'
import { useAppoloFetch } from '@/utils/Applo';
import { SkillsType } from '@/utils/types';
import { GQL_ADD_SKILLS, GQL_DELETE_SKILLS, GQL_GET_SKILLS } from '@/utils/queries';


const supabase = createClient(process.env.PROJECT_URL as string, process.env.API_KEY as string)
export default function page() {
    const [file, setFile] = React.useState<File | null>(null);
    const [fileName, setFileName] = React.useState<string | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null)
    const skillNameRef = React.useRef<HTMLInputElement>(null)
    const skillPerentageRef = React.useRef<HTMLInputElement>(null)
    const [addSkill] = useMutation(GQL_ADD_SKILLS)
    const [deleteSkill] = useMutation(GQL_DELETE_SKILLS)

    const { data, refetch } = useAppoloFetch<SkillsType>(GQL_GET_SKILLS)

    const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            setFile(e.target.files[0])
            setFileName(e.target.files[0].name+`${(Math.random()*100).toFixed(2)}`)
        }
            
        const file = e?.target?.files?.[0];
        if (file) {
            console.log(file)
            const url = URL.createObjectURL(file);
            setPhotoPreview(url);
        }

    }

    const handleAddSkill = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const { data, error } = await supabase.storage
                .from('images')
                .upload(`skills-images/${fileName}`, file as File, {
                    contentType: 'image/png',
                    cacheControl: '3600',
                })
            if (data) {
                const skillInput = {
                    title: skillNameRef.current?.value,
                    percentage: Number(skillPerentageRef.current?.value),
                    image: `https://ijvhsfkishunnbaedonm.supabase.co/storage/v1/object/public/images/${data?.path}`,
                };
                const { data: skillData } = await addSkill({
                    variables: {
                        skill: skillInput
                    }
                })
                console.log(skillData)
            }
            else {
                console.error(error)
            }
        } catch (error) {
            console.log(error)
        }

    }


    const handleDeleteSkill = async (id: string, path: string) => {
        const { data } = await deleteSkill({
            variables: {
                id
            }
        })
        if (data) {
            const { data, error } = await supabase.storage.from('images').remove([path]);
            console.log(data)
        }

    }
    return (
        <>
            <form onSubmit={handleAddSkill}>
                <Image priority decoding='async' width={100} height={100} src={photoPreview || image} alt={'photo'} /> <br />
                add image : <input onChange={handleSelectFile} type="file" name="" id="" /> <br /> <br />
                skill Name : <input className='text-black' ref={skillNameRef} type="text" name="" id="" /> <br /> <br />
                skill percentage : <input className='text-black' ref={skillPerentageRef} type="number" name="" id="" /> <br /> <br />
                <button type='submit'>submit</button> <br /><br />
                <br /><br /> <br /> <br />
            </form>
            {
                data?.data.skills.map((skill) => <div key={skill.id}>
                    <span> {skill.title} </span>
                    <button onClick={() => handleDeleteSkill(skill.id, skill.image.split('/images/')[1])} className='bg-white text-black'> delete </button>
                </div>

                )
            }
        </>

    )
}
