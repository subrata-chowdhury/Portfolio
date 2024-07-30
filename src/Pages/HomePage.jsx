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
            const paramString = window.location.href.split('?')[1];
            const queryString = new URLSearchParams(paramString);
            const scrollIntoViewOpts = { behavior: 'smooth', block: 'center' }
            let urlData;
            for (let pair of queryString.entries()) {
                urlData = pair;
                break;
            }
            if (urlData[0] === 'autoScroll') {
                let element;
                if (urlData[1] === 'contact')
                    element = document.querySelector(".contact-container")
                if (urlData[1] === 'education')
                    element = document.querySelector(".heading#education")
                if (urlData[1] === 'project')
                    element = document.querySelector(".heading#project")
                if (element)
                    element.scrollIntoView(scrollIntoViewOpts)
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