import { useEffect, useRef } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Menubar from '../components/Menubar'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Contact from '../components/Contact'
import Education from '../components/Education'
import Certifications from '../components/Certifications'
import AboutMe from '../components/AboutMe'

export default function HomePage() {
    const body = useRef();
    const skillsContainer = useRef()
    useEffect(() => {
        try {
            let paramString = window.location.href.split('?')[1];
            let queryString = new URLSearchParams(paramString);
            let urlData;
            for (let pair of queryString.entries()) {
                urlData = pair;
                break;
            }
            if (urlData[0] === 'autoscroll') {
                if (urlData[1] === 'contact')
                    document.querySelector(".contact-container").scrollIntoView()
                if (urlData[1] === 'education')
                    document.querySelector(".heading#education").scrollIntoView()
                if (urlData[1] === 'project')
                    document.querySelector(".heading#project").scrollIntoView()
            }
        } catch (error) {

        }
    }, [])
    return (
        <div className='mode light app' ref={body}>
            <Menubar bodyRef={body} skillsContainerRef={skillsContainer} />
            <Header />
            <AboutMe />
            <Skills forwardSkillContainerRef={skillsContainer} />
            <Education />
            <Projects />
            <Certifications />
            <Contact />
            <Footer />
        </div>
    )
}