'use client'
import React from 'react'
import s from './Statistics.module.css'
import { useAppoloFetch } from '@/utils/Applo'
import { GQL_GET_PROJECTS } from '@/utils/queries'
import { ProjectType } from '@/utils/types'
export default function Statistics() {

    const {data , isLoading} = useAppoloFetch<ProjectType>(GQL_GET_PROJECTS)
    return (
        <div className={s.statistics}>
            <div className={s.statistic}>
                <span className={s.number}> {new Date().getFullYear() - 2023}+ </span> years experience
            </div>
            <div className={s.statistic}>
                <span className={s.number}> {isLoading ? '...' : data?.data.projects.length}+ </span> projects completed 
            </div>
        </div>
    )
}
