import { useRef } from "react";
import Footer from "../components/Footer";
import Menubar from "../components/Menubar";

export default function InternshipsPage() {
    const activeMenuIndex = 3;
    const body = useRef()
    return (
        <div className="internship-page mode light app" ref={body}>
            <Menubar bodyRef={body} activeIndex={activeMenuIndex} />
            <br></br>
            <br></br>
            <br></br>
            <Footer />
        </div>
    )
}