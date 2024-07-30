import { useRef } from "react";
import Footer from "../components/Footer";
import Menubar from "../components/Menubar";
import "../style/Pages/InternshipsPage.css"
import { Link } from "react-router-dom";

export default function InternshipsPage() {
    const activeMenuIndex = 3;
    const body = useRef()
    return (
        <div className="internship-page mode light app" ref={body}>
            <Menubar bodyRef={body} activeIndex={activeMenuIndex} links={[{
                name: "Home",
                link: "/"
            }, {
                name: "Education",
                link: "/Portfolio/dist/?autoscroll=education",
                createHref: true
            }, {
                name: "Projects",
                link: "/Projects",
            }, {
                name: "Internships",
                link: "#",
                createHref: true
            }, {
                name: "Contact Me",
                link: "/Portfolio/dist/?autoscroll=contact",
                createHref: true
            }]} />
            <div className="empty-heading">
                <div className="heading">
                    🥲Have not get any internship yet.<br></br>
                    If anyone want to offer an internship.<br></br>
                    You can <Link to={"/?autoScroll=contact"}>contact me</Link>.
                </div>
            </div>
            <Footer />
        </div>
    )
}