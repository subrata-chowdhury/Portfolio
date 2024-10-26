'use client'
import { useEffect, useRef, useState } from 'react'
import Menubar from './components/Menubar'
import Header from './components/Header'
import AboutMe from './components/AboutMe'
import Skills from './components/Skills'
import Education from './components/Education'
import Projects from './Projects/components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
// import { useRouter } from 'next/router'

export default function Home() {
    const [mode, setMode] = useState('light')
    const skillsContainer = useRef()
    const contactUs = useRef()
    const projects = useRef()

    // const location = useRouter()

    // useEffect(() => {
    //     if (typeof window === 'undefined') return;
    //     let hash = location.asPath.split('#')[1];
    //     try {
    //         if (window)
    //             if (hash === '#contact') {
    //                 contactUs.current?.scrollIntoView({ behavior: "smooth" })
    //             } else if (hash === '#projects') {
    //                 projects.current?.scrollIntoView({ behavior: "smooth" })
    //             } else {
    //                 document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" })
    //             }
    //     } catch (error) {

    //     }
    // }, [location])

    return (
        <div className={'mode app ' + mode}>
            <Menubar
                onThemeChange={setMode}
                skillsContainerRef={skillsContainer}
                links={[{
                    name: "Home",
                    link: "/"
                }, {
                    name: "Education",
                    link: "#education",
                }, {
                    name: "Projects",
                    link: "#projects",
                }, {
                    name: "Internships",
                    link: "/Internships"
                }, {
                    name: "Contact Me",
                    link: "#contact",
                }]} />
            <Header />
            <AboutMe />
            <Skills forwardSkillContainerRef={skillsContainer} />
            <Education />
            <Projects forwardRef={projects} />
            <Certifications />
            <Contact forwardRef={contactUs} />
            <Footer />
        </div>
    )
}