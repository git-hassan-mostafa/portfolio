'use client'
import Image, { StaticImageData } from 'next/image'
import React from 'react'
import s from './ProjectPage.module.css'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Technologies from '../SVG/Technologies'
import colors from '@/utils/colors'
import URL from '../SVG/URL'
import y from '../../utils/assests/youtube.webp'
import SectionTitle from '../SectionTitle/SectionTitle'

export default function ProjectPage() {

    const { get } = useSearchParams()
    return (
        <div className={s['project-page']}>
            <div className={s["project-details"]}>
                <Image width={480} height={320} unoptimized loading='lazy' className={s['project-image']} src={get('image') as string} alt={'project-image'} />
                <div className={s["project-information"]}>
                    <div className={s["project-information-section"]}>
                        <Technologies size={'30'} color={colors.secondaryColor} />
                        <div>
                            <h1 className={s["sections-title"]}>  Technologies </h1>
                            <p className={s["sections-value"]}> {get('skills')?.replaceAll(' ',' , ').replaceAll('-', ' ').toUpperCase()} </p>
                        </div>
                    </div>
                    <div className={s["project-information-section"]}>
                        <URL size={'30'} color={colors.secondaryColor} />
                        <div>
                            <h1 className={s["sections-title"]}>  project URL </h1>
                            <Link href={get('link') as string} className={s["sections-value"]}> {get('link')} </Link>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={s["project-description"]}>
                <SectionTitle> Description </SectionTitle>
                <p className={s["description-text"]}> {get('description')} </p>
                
            </div>
        </div>
    )
}
