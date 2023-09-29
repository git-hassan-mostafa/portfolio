import React from 'react'
import s from './ProgressLine.module.css'
export default function ProgressLine({percentage}:{percentage:number}) {
  return (
    <div className={s['progress-bar']}>
    <div style={{
        width:percentage+'%'
    }} className={s['progress-line']} />
    </div>
  )
}
