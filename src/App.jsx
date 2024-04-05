import { useEffect, useRef } from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Menubar from './components/Menubar'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

function App() {
    const body = useRef();
    const skillsContainer = useRef()
    return (
        <div className='mode light' ref={body}>
            <Menubar bodyRef={body} skillsContainerRef={skillsContainer} />
            <Header />
            <Skills forwardSkillContainerRef={skillsContainer} />
            <Projects />
            <Contact />
            <Footer />
        </div>
    )
}

export default App
