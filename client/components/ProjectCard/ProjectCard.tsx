import React from 'react'
import s from './ProjectCard.module.css'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import y from '../../utils/assests/youtube.webp'

interface ProjectType {
      id: string,
      title: string,
      link: string
      image: string | StaticImageData,
      description:string 
      skills:string,
      loader?:boolean
  }

export default function ProjectCard({id,
    title,
    link,
    image,
    description,
    skills,
    loader = false
  }:ProjectType) {

    if(loader) return <div className={s["project-card-loader"]} />

  return (
  <Link prefetch className={s['link']} href={{
    pathname:`/projects/${id}`,
    query:{
      id,
      title,
      link,
      image:image as string,
      skills,
      description
    }
  }} >
    <div className={s['project-card']}>
      <Image unoptimized className={s['project-image']} width={240} height={180} src={image as string} alt={'image'} />
      <section className={s["project-details"]}>
        <h1 className={s["project-title"]}>
            {title.toUpperCase()}
        </h1>
        
        <button className={s['read-more']}> Read More </button>
        
        
      </section>
    </div>
     </Link>
  )
}
