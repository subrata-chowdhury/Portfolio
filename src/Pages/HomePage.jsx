import { useEffect, useRef, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Menubar from '../components/Menubar'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Contact from '../components/Contact'
import Education from '../components/Education'
import Certifications from '../components/Certifications'
import AboutMe from '../components/AboutMe'
import { useLocation } from 'react-router-dom'

export default function HomePage() {
    const [mode, setMode] = useState('light')
    const skillsContainer = useRef()
    const contactUs = useRef()
    const projects = useRef()

    const location = useLocation()

    useEffect(() => {
        try {
            if (location.hash === '#contact') {
                contactUs.current?.scrollIntoView({ behavior: "smooth" })
            } else if (location.hash === '#projects') {
                projects.current?.scrollIntoView({ behavior: "smooth" })
            } else {
                document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" })
            }
        } catch (error) {

        }
    }, [location])

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