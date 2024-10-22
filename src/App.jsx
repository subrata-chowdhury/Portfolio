import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import InternshipsPage from './Pages/IntershipsPage'
import ProjectsPage from './Pages/ProjectsPage'
import { useEffect } from 'react'

import './style/Animations.css'

function App() {
    useEffect(() => {
        const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (isDarkMode) {
            document.querySelector(".app").classList.remove('light')
            document.querySelector(".app").classList.add('dark')
        } else {
            document.querySelector(".app").classList.remove('dark')
            document.querySelector(".app").classList.add('light')
        }
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<HomePage />}></Route>
                <Route path='/Projects' exact element={<ProjectsPage />}></Route>
                <Route path='/Internships' exact element={<InternshipsPage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
