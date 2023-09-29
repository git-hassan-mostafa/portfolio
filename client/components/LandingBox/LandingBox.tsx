'use client'
import React from 'react'
import s from './LandingBox.module.css'
import MouseDownEffect from '../MouseDownEffect/MouseDownEffect'
import Link from 'next/link'
export default function LandingBox() {
  return (
    <div className={s['landing-box']} id='home'>
      <div className={s["landing-box-cover"]} />
      <p className={s['landing-page-title']}> Turning Imagination into Innovation Through Code. </p>
      <p className={s['landing-page-paragraph']}>
        {'<'}<span>code</span>{'>'} I build fullstack web applications. {'</'}<span>code</span>{'>'}  
      </p>
      <MouseDownEffect scale={97}>
        <Link className={s['landing-box-explore-button']} href={'#projects'}>Explore Now</Link>
      </MouseDownEffect>
      
    </div>
  )
}
