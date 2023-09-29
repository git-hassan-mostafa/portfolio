import React from 'react'
import s from './AboutUs.module.css'
import SectionTitle from '../SectionTitle/SectionTitle'
export default function AboutUs() {
    return (
        <div className={s['about-us']} id='about-us'>

            <SectionTitle>About Us</SectionTitle>
            <div className={s['about-us-text']}>
                <p className={s.paragraph}>
                    As a highly motivated and detail-oriented individual with a passion for web development, I have gained proficiency in
                    HTML, CSS, JavaScript, React, node js, mongodb,php , laravel,mysql etc.
                    <br /> Through numerous web development projects, I
                    have honed my problem-solving and project management skills, resulting in successful completion of projects within tight
                    deadlines and exceeding client expectations. <br /> I am eager to continue leveraging my skills and experience to contribute to a
                    dynamic team and deliver exceptional results.
                </p>
            </div>
        </div>
    )
}
