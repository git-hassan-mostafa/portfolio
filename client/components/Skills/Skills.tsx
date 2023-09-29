'use client'
import React from 'react'
import s from './Skills.module.css'
import SectionTitle from '../SectionTitle/SectionTitle'
import SkillCard from '../SkillCard/SkillCard'
import { useAppoloFetch } from '@/utils/Applo'
import MouseDownEffect from '../MouseDownEffect/MouseDownEffect'
import { GQL_GET_SKILLS } from '@/utils/queries'
import { SkillType } from '@/utils/types'



export default function Skills() {
  const { data, isLoading } = useAppoloFetch<SkillType>(GQL_GET_SKILLS)
  return (
    <div className={s.skills} id='skills'>
      <SectionTitle > Skills </SectionTitle>
      <div className={s["skills-cards"]}>
        {
          isLoading ? [1, 2, 3, 4 , 5 , 6 , 7].map((_, i) => <SkillCard key={i} logo={''} name={''} percentage={0} loader />) :
            data?.data?.skills?.map(skill => (
              <MouseDownEffect scale={97} className='cursor-pointer' key={skill.id}>
                <SkillCard logo={skill.image} name={skill.title} percentage={skill.percentage} />
              </MouseDownEffect>
            ))
        }
      </div>


    </div>
  )
}
