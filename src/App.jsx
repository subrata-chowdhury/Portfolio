import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import InternshipsPage from './Pages/IntershipsPage'
import ProjectsPage from './Pages/ProjectsPage'

function App() {
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
