import { useEffect, useState } from "react";
import Menubar from "../components/Menubar";
import Projects from "../components/Projects";
import "../style/Pages/ProjectsPage.css"
import Footer from "../components/Footer";

export default function ProjectsPage() {
    const [mode, setMode] = useState('light')

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className={'projects-page mode app ' + mode}>
            <Menubar onThemeChange={setMode} />
            <Projects showLimited={false} showSeeMoreBtn={false} />
            <Footer />
        </div>
    )
}