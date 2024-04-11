import { useRef } from "react";
import Menubar from "../components/Menubar";
import Projects from "../components/Projects";
import "../style/Pages/ProjectsPage.css"
import Footer from "../components/Footer";

export default function ProjectsPage() {
    const activeMenuIndex = 2
    const body = useRef()
    return (
        <div className="projects-page mode light app" ref={body}>
            <Menubar bodyRef={body} activeIndex={activeMenuIndex} />
            <Projects showLimited={false} showSeeMoreBtn={false} />
            <Footer activeMenuIndex={activeMenuIndex} />
        </div>
    )
}