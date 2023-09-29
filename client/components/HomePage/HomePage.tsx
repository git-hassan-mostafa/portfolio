import React from 'react'
import LandingBox from '../LandingBox/LandingBox'
import Statistics from '../Statistics/Statistics'
import AboutUs from '../AboutUs/AboutUs'
import Skills from '../Skills/Skills'
import Projects from '../Projects/Projects'

export default function HomePage() {
  return (
    <div>
      <LandingBox />
      <Statistics />
      <AboutUs />
      <Skills />
      <Projects />
    </div>
  )
}
