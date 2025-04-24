'use client'
import { useEffect, useRef } from 'react'
import Header from './components/Header'
import AboutMe from './components/AboutMe'
import Skills from './components/Skills'
import Education from './components/Education'
import Projects from './Projects/components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Internships from './Experience/components/Internships'

export default function Home() {
    const contactUs = useRef<HTMLDivElement | null>(null)
    const projects = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        autoScrollFromHash();
        window.addEventListener("hashchange", autoScrollFromHash)
        return () => window.removeEventListener("hashchange", autoScrollFromHash)
    }, [])

    function autoScrollFromHash() {
        const hash = window.location.hash;
        try {
            if (hash === '#contact') {
                contactUs.current?.scrollIntoView({ behavior: "smooth" })
            } else if (hash === '#projects') {
                projects.current?.scrollIntoView({ behavior: "smooth" })
            } else {
                document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" })
            }
        } catch { }
    }

    return (
        <>
            <Header />
            <AboutMe />
            <Skills />
            <Education />
            <Projects containerStyle={{ marginTop: '2rem' }} forwardRef={projects} />
            <Certifications />
            <Internships containerStyle={{ marginTop: '2rem' }} />
            <Contact forwardRef={contactUs} />
        </>
    )
}