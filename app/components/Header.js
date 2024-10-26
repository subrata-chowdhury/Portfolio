import "@/app/styles/header.css"
// import profilePicture from "../assets/profile-pic.png"
import { useEffect, useState } from "react";
import { OtherPlatforms } from "./Footer";
// import Wave from "../assets/wave"
// import { useEffect } from "react"

export default function Header() {
    return (
        <>
            <div className="bg" style={{ backgroundImage: 'url(./wave.svg)' }}></div>
            <header className="header">
                <Intro />
                {/* <Photo /> */}
            </header>
        </>
    )
}

function Intro() {
    return (
        <div className="intro">
            <div className="main-intro"><span className="name">Subrata Chowdhury</span></div>
            <div className="sub-intro-container">
                <div className="sub-intro">I am a
                    <TypeingAnimation />
                </div>
            </div>
            <OtherPlatforms className="header-icons" />
            <a className="download-btn" href="https://drive.google.com/file/d/1M_EVD5823IJA94uwKdd9Tafyb8IRO5iJ/view?usp=sharing" target="_blank">Download CV</a>
        </div>
    )
}

function Photo() {
    // useEffect(() => {
    //     KUTE.fromTo(
    //         '#blob1',
    //         { path: '#blob1' },
    //         { path: '#blob2' },
    //         { repeat: 999, duration: 5000, yoyo: true }
    //     ).start();
    // }, [])
    return (
        <div className="photo">
            {/* <Wave /> */}
            <img src={profilePicture} alt="profile picture" />
        </div>
    )
}

function TypeingAnimation() {
    const words = ["Web Developer", "Programmer", "Designer", "Freelancer", "Engineer"];
    const typingSpeed = 150; // Speed of typing each letter in milliseconds
    const erasingSpeed = 100; // Speed of erasing each letter in milliseconds
    const delayBetweenWords = 1000; // Delay between typing each word in milliseconds

    const [text, setText] = useState("");
    const [isErasing, setIsErasing] = useState(false);
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const handleTyping = () => {
            if (!isErasing) {
                // Typing animation logic
                if (charIndex < words[wordIndex].length) {
                    setText(prevText => prevText + words[wordIndex][charIndex]);
                    setCharIndex(prevCharIndex => prevCharIndex + 1);
                } else {
                    // Start erasing after typing is complete
                    setIsErasing(true);
                }
            } else {
                // Erasing animation logic
                if (charIndex > 0) {
                    setText(prevText => prevText.slice(0, -1));
                    setCharIndex(prevCharIndex => prevCharIndex - 1);
                } else {
                    // Move to the next word after erasing is complete
                    setIsErasing(false);
                    setWordIndex(prevWordIndex => (prevWordIndex + 1) % words.length);
                }
            }
        };

        const typingDelay = isErasing ? erasingSpeed : typingSpeed;
        const timer = charIndex >= words[wordIndex].length ? setTimeout(handleTyping, delayBetweenWords) : setTimeout(handleTyping, typingDelay);

        return () => clearTimeout(timer);
    }, [charIndex, isErasing, wordIndex, words]);


    return (
        <div className="sub-intro-heading">
            <span id="typing-text">&nbsp;{text}</span>
            <span id="cursor">|</span>
        </div>
    )
}