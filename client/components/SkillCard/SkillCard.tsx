import React from 'react'
import s from './SkillCard.module.css'
import Image from 'next/image'

interface SkillCardProps {
  loader?: boolean,
  logo: string,
  name: string,
  percentage: number
} 

export default function SkillCard({ logo, name, percentage, loader = false }: SkillCardProps) {
  if (loader) return <div className={s['skill-card-loader']} />
  return (
    <div className={s['skill-card']}>
      <Image loading='lazy' className={s['skill-card-image']} width={100} height={100} src={logo} alt={'skill'} />
      <div className={s["skill-card-data"]}>
        <h1 className={s["skill-name"]}> {name.toUpperCase()} </h1>
        <div className={s["skill-percentage"]}>
          {percentage}%
        </div>

      </div>
    </div>
  )
}
