import { useEffect, useRef } from "react";
import Menubar from "../components/Menubar";
import Projects from "../components/Projects";
import "../style/Pages/ProjectsPage.css"
import Footer from "../components/Footer";

export default function ProjectsPage() {
    const activeMenuIndex = 2
    const body = useRef()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className="projects-page mode light app" ref={body}>
            <Menubar bodyRef={body} activeIndex={activeMenuIndex} links={[{
                name: "Home",
                link: "/"
            }, {
                name: "Education",
                link: "/Portfolio/dist/?autoscroll=education",
                createHref: true
            }, {
                name: "Projects",
                link: "#",
                createHref: true
            }, {
                name: "Internships",
                link: "/Internships"
            }, {
                name: "Contact Me",
                link: "/Portfolio/dist/?autoscroll=contact",
                createHref: true
            }]} />
            <Projects showLimited={false} showSeeMoreBtn={false} />
            <Footer activeMenuIndex={activeMenuIndex} />
        </div>
    )
}