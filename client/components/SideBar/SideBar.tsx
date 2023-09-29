import React from 'react'
import s from './SideBar.module.css'
import Image from 'next/image'
import logo from '../../app/favicon.ico'
import ProgressCircule from '../SVG/ProgressCircule'
import ProgressLine from '../ProgressLine/ProgressLine'
import Check from '../SVG/Check'
import colors from '@/utils/colors'
import Github from '../SVG/Github'
import Linkedin from '../SVG/Linkedin'
import Facebook from '../SVG/Facebook'
import Mail from '../SVG/Mail'
import Link from 'next/link'
import ArrowLeft from '../SVG/ArrowLeft'
export default function SideBar({ className }: { className: string }) {

  const skills = [
    {
      name: 'Html , Css , JS',
      percentage: 95
    },
    {
      name: 'Front end : Reactjs , Nextjs',
      percentage: 90
    },
    {
      name: 'Backend : Expressjs , GraghQl',
      percentage: 85
    },
    {
      name: 'Backend : Laravel , MySQL',
      percentage: 50
    },
    {
      name: 'Database : MongoDb , SQL',
      percentage: 90
    },
    {
      name: 'Mbile : React Native',
      percentage: 60
    },
  ]

  const extraSkills = ['Typescript', 'Tailwind css , MUI , Scss', 'Git', 'Firebase', 'Responsive design', 'OOP , problem solving']

  const handleSideBarOpen = () => {
    document.querySelector('.sidebar')?.classList.toggle('open')
    document.querySelector('.main.main > .black-bar-close')?.classList.toggle('open')
    document.querySelector('.nav-bar')?.classList.toggle('nav-bar-hidden')
}

  return (
    <aside className={className}>

      <section className={s.personal}>
        <ArrowLeft onclick={handleSideBarOpen} className={s['side-bar-arrow-left']} size={'30'} color={colors.secondaryTextColor} />
        <div className={s.avatar}>
          <Image width={70} height={70} className={s['avatar-image']} src={logo} alt={'logo'} />
          <div className={s.round} />
          <div className={s['round-animate']} />
        </div>
        <h2 className={s.name}>Hassan Mostafa</h2>
        <p className={s.speciality}>Full stack developer</p>
      </section>
      <section className={s.information}>
        <section className={s["personal-information"]}>
          <div className={s["one-info"]}>
            <div className={s.key}>Residence:</div>
            <div className={s.value}>Lebanon</div>
          </div>
          <div className={s["one-info"]}>
            <div className={s.key}>City:</div>
            <div className={s.value}>Tripoli</div>
          </div>
          <div className={s["one-info"]}>
            <div className={s.key}>Age:</div>
            <div className={s.value}> {new Date().getFullYear() - 2002} </div>
          </div>
        </section>
        <hr className={s.line + ' w-5/6 m-auto opacity-20'} />
        <section className={s.languages}>
          <div className={s.language}>
            <ProgressCircule className='p-2' radius={25} percentage={100} borderWidth={4} bottomCirculeColor={'#191923'} topCirculeColor={'#FFC107'} textColor={'#8c8c8e'} fontSize={12} />
            <p className={s['language-name']}> Arabic </p>
          </div>
          <div className={s.language}>
            <ProgressCircule className='p-2' radius={25} percentage={70} borderWidth={4} bottomCirculeColor={'#191923'} topCirculeColor={'#FFC107'} textColor={'#8c8c8e'} fontSize={12} />
            <p className={s['language-name']}> English </p>
          </div>
        </section>
        <hr className={s.line + ' w-5/6 m-auto opacity-20'} />

        <section className={s["skills"]}>

          {
            skills.map(skill => (
              <section key={skill.name} className={s.skill}>
                <div className={s["skill-data"]}>
                  <p className={s['skill-name']}> {skill.name} </p>
                  <p className={s['skill-percentage']}> {skill.percentage} %</p>
                </div>
                <ProgressLine percentage={skill.percentage} />
              </section>
            ))
          }

        </section>
        <hr className={s.line + ' w-5/6 m-auto opacity-20'} />
        <section className={s['extra-skills']}>
          {
            extraSkills.map(skill => (
              <div key={skill} className={s['extra-skill']}>
                <Check size={'15'} color={colors.secondaryColor} />
                {skill}
              </div>
            ))
          }
        </section>
        <hr className={s.line + ' w-5/6 m-auto opacity-20'} />
        <section className={s['social-media']}>
          <Link target='_blank' href={'https://github.com/git-hassan-mostafa'} >
            <Github className={s['social-media-icon']} size={'25'} color={colors.mainTextColor} />
          </Link>
          <Link target='_blank' href={'https://www.linkedin.com/in/hassan-mostafa-119985239/'}>
            <Linkedin className={s['social-media-icon']} size={'25'} color={colors.mainTextColor} />
          </Link>
          <Link target='_blank' href={'https://www.facebook.com/ha.mo.1485537/'}>
            <Facebook className={s['social-media-icon']} size={'25'} color={colors.mainTextColor} />
          </Link>
          <Link target='_blank' type='mail' href={'mailto:mohamad.hm464@gmail.com'}>
            <Mail className={s['social-media-icon']} size={'25'} color={colors.mainTextColor} />
          </Link>
        </section>
      </section>
    </aside>
  )
}
