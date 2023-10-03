'use client'
import React, { ChangeEvent, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { gql, useMutation } from '@apollo/client';
import Image from 'next/image';
import image from '../../../../../../utils/assests/firebase.png'
import { ProjectType, ProjectsType } from '@/utils/types';
import { useAppoloFetch } from '@/utils/Applo';
import { GQL_ADD_PROJECTS, GQL_DELETE_PROJECTS, GQL_GET_PROJECTS } from '@/utils/queries';


const supabase = createClient(process.env.PROJECT_URL as string, process.env.API_KEY as string)
export default function page() {
    const [file, setFile] = React.useState<File | null>(null);
    const [fileName, setFileName] = React.useState<string | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false)
    const projectNameRef = React.useRef<HTMLInputElement>(null)
    const projectLinkRef = React.useRef<HTMLInputElement>(null)
    const projectDescriptionRef = React.useRef<HTMLTextAreaElement>(null)
    const projectSkillsRef = React.useRef<HTMLInputElement>(null)
    const [deleteProject] = useMutation(GQL_DELETE_PROJECTS)
    const { data, refetch } = useAppoloFetch<ProjectsType>(GQL_GET_PROJECTS)

    const [addProject] = useMutation(GQL_ADD_PROJECTS)
    const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
            setFileName(e.target.files[0].name + `${(Math.random() * 100).toFixed(2)}`)
        }

        const file = e?.target?.files?.[0];
        if (file) {
            console.log(file)
            const url = URL.createObjectURL(file);
            setPhotoPreview(url);
        }

    }

    const handleAddproject = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const { data, error } = await supabase.storage
                .from('images')
                .upload(`projects-images/${fileName}`, file as File, {
                    contentType: 'image/png',
                    cacheControl: '3600',
                })
            if (data) {
                const projectInput = {
                    title: projectNameRef.current?.value,
                    link: projectLinkRef.current?.value,
                    description: projectDescriptionRef.current?.value,
                    skills: projectSkillsRef.current?.value,
                    image: `https://ijvhsfkishunnbaedonm.supabase.co/storage/v1/object/public/images/${data?.path}`,
                };
                const { data: projectData } = await addProject({
                    variables: {
                        project: projectInput
                    }
                })

                console.log(projectData)
                if (!projectData) {
                    const { data, error } = await supabase.storage.from('images').remove([`projects-images/${file?.name as string}`]);
                    console.log(data)
                }
            }
            else {

                console.error(error)
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }

    }


    const handleDeleteProject = async (id: string, path: string) => {
        const { data } = await deleteProject({
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


            <form onSubmit={handleAddproject}>
                <Image priority decoding='async' width={100} height={100} src={photoPreview || image} alt={'photo'} /> <br />
                <input onChange={handleSelectFile} type="file" name="" id="" /> <br /> <br />
                project title : <input className='text-black' ref={projectNameRef} type="text" name="" id="" /> <br /> <br />
                project link : <input className='text-black' ref={projectLinkRef} type="text" name="" id="" /> <br /> <br />
                project description : <textarea className='text-black' ref={projectDescriptionRef} name="" id="" /> <br /> <br />
                project skills : <input className='text-black' ref={projectSkillsRef} type="text" name="" id="" /> <br /> <br />
                <button type='submit'>{isLoading?'loading':'submit'}</button> <br />
            </form>
            <br /><br /><br />
            {
                data?.data.projects.map((project) => <div key={project.id}>
                    <span> {project.title} </span>
                    <button onClick={() => handleDeleteProject(project.id, (project.image as string).split('/images/')[1])} className='bg-white text-black'> delete </button>
                </div>

                )
            }
        </>
    )
}
