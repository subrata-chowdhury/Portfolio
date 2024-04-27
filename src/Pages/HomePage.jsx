import { useRef } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Menubar from '../components/Menubar'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Contact from '../components/Contact'
import Education from '../components/Education'
import TopSkills from '../components/TopSkills'

export default function HomePage() {
    const body = useRef();
    const skillsContainer = useRef()
    return (
        <div className='mode light app' ref={body}>
            <Menubar bodyRef={body} skillsContainerRef={skillsContainer} />
            <Header />
            <TopSkills />
            <Skills forwardSkillContainerRef={skillsContainer} />
            <Education />
            <Projects />
            <Contact />
            <Footer />
        </div>
    )
}