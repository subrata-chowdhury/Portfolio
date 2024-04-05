import "../style/header.css"
import profilePicture from "../assets/pt.png"
import Wave from "../assets/wave"
import { useEffect } from "react"

export default function Header() {
    return (
        <div className="header">
            <Intro />
            <Photo />
        </div>
    )
}

function Intro() {
    return (
        <div className="intro">
            <div className="main-intro">Hi, I am <span className="name">Subrata Chowdhury</span></div>
            <div className="sub-intro-container">
                <div className="sub-intro">I am experienced in <span className="sub-intro-heading">web development</span></div>
                <br />I'm currently a 3rd year Computer Science Engineering student
                <br />at Bengal College of Engineering and Technology.
                <br />I've actively worked on several projects since my 11th class,
                <br />and many of these projects can be found on my GitHub Page.
            </div>
            <br />
            <br />
            <a className="download-btn" href="https://drive.google.com/file/d/12ptrr2KOgbwSO7WiKaafXR8CWwDT3kdX/view" target="_blank">Download CV</a>
        </div>
    )
}

function Photo() {
    useEffect(() => {
        KUTE.fromTo(
            '#blob1',
            { path: '#blob1' },
            { path: '#blob2' },
            { repeat: 999, duration: 5000, yoyo: true }
        ).start();
    }, [])
    return (
        <div className="photo">
            <Wave />
            <img src={profilePicture} alt="profile picture" />
        </div>
    )
}