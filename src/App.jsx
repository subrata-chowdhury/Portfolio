import { useEffect, useRef } from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Menubar from './components/Menubar'
import Projects from './components/Projects'
import Skills from './components/Skills'

function App() {
    const body = useRef();
    return (
        <div className='mode light' ref={body}>
            <Menubar bodyRef={body} />
            <Header />
            <Skills />
            <Projects />
            <Footer />
        </div>
    )
}

export default App
