import React from 'react'
import Home from '../SVG/Home'
import colors from '@/utils/colors'
import About from '../SVG/About'
import Projects from '../SVG/Projects'
import Skills from '../SVG/Skills'
import Contact from '../SVG/Contact'
import s from './NavBar.module.css'
import Link from 'next/link'
export default function NavBar() {
  return (
    <div className='nav-bar'>
      <Link href={'/#home'}>
        <div className={s["navigation"]}>
          <Home className={s['navigation-icon']} size={'30'} color={colors.secondaryColor} />
          <p>Home</p>
        </div>
      </Link>
      <Link href={'/#about-us'}>
        <div className={s["navigation"]}>
          <About className={s['navigation-icon']} size={'30'} color={colors.secondaryColor} />
          <p>About</p>
        </div>
      </Link>
      
      <Link href={'/#skills'} >
        <div className={s["navigation"]}>
        <Skills className={s['navigation-icon']} size={'30'} color={colors.secondaryColor} />
        <p>Skills</p>
      </div>
      </Link>
      <Link href={'/#projects'} >
        <div className={s["navigation"]}>
        <Projects className={s['navigation-icon']} size={'30'} color={colors.secondaryColor} />
        <p>Projects</p>
      </div>
      </Link>
      

      <div className={s["navigation"]}>
        <Contact className={s['navigation-icon']} size={'30'} color={colors.secondaryColor} />
        <p>Contact</p>
      </div>
    </div>
  )
}
