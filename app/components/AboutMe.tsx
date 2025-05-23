import React from 'react';
import '@/app/styles/AboutMe.css';
import SimpleArrow from '../Icons/SimpleArrow';
import { projectCount } from '../data/projects';
import { certificateCount } from '../data/certificates';
import { skillCount } from '../data/skills';
import ProjectIcon from '../Icons/ProjectIcon';
import CertificationIcon from '../Icons/CertificationIcon';
import SkillsIcon from '../Icons/SkillsIcon';
import Link from 'next/link';

function AboutMe() {
    return (
        <section className="screen-container">
            <h1 className="heading" id="education">
                About Me
            </h1>
            <div className='about-container'>
                <article className='sub-about-container'>
                    I am a final year Computer Science Engineering Student at Bengal College of Engineering and Technology.<br />
                    As a skilled web developer, I am proficient in HTML, CSS, JavaScript, and ReactJS.<br />
                    I&apos;ve completed various projects, from AI-driven timetable creators to responsive web apps.<br /><br />
                    <div className='about-contact-details'>
                        <div>
                            <SimpleArrow /><span className='field'>Email:&nbsp;</span>subratachowdhury7000@gmail.com
                        </div>
                        <div>
                            <SimpleArrow /><span className='field'>Location:&nbsp;</span>West Bengal, India
                        </div>
                    </div><br />
                    <div className='points'>
                        - Adaptable quickly and organized well.<br />
                        - Interested in learning the latest web technologies quickly.<br />
                        - Able to Work well in teams as well as Individually<br />
                    </div>
                </article>
                <Counts />
            </div>
        </section>
    );
}

function Counts() {
    return (
        <section className="counts-container">
            <Link className="count" href='#projects'>
                <div className="count-icon"><ProjectIcon /></div>
                <div className="count-number">{projectCount}</div>
                <div className="count-label">Projects</div>
            </Link>
            <Link className="count" href='#certifications'>
                <div className="count-icon"><CertificationIcon /></div>
                <div className="count-number">{certificateCount}</div>
                <div className="count-label">Certifications</div>
            </Link>
            <Link className="count" href='#skills'>
                <div className="count-icon"><SkillsIcon /></div>
                <div className="count-number">{skillCount}</div>
                <div className="count-label">Skills</div>
            </Link>
        </section>
    );
}

export default AboutMe;