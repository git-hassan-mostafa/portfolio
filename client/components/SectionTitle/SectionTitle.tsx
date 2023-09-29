import { ReactNode } from 'react'
import s from './SectionTitle.module.css'
export default function SectionTitle({children}:{children:ReactNode}) {
  return (
    <h1 className={s['section-title']} >{children}</h1>
  )
}
