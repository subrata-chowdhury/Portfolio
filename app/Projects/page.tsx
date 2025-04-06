'use client'
import { useState } from "react";
import Menubar from "../components/Menubar";
import Projects from "./components/Projects";
import "@/app/styles/Pages/ProjectsPage.css"
import Footer from "../components/Footer";

export default function ProjectsPage() {
    const [mode, setMode] = useState('light')

    return (
        <div className={'projects-page mode app ' + mode}>
            <Menubar onThemeChange={setMode} />
            <Projects showLimited={false} showSeeMoreBtn={false} />
            <Footer />
        </div>
    )
}