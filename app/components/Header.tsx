"use client";

import "@/app/styles/header.css";
import { useEffect, useState } from "react";
import { OtherPlatforms } from "./Footer";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <div className="bg" style={{ backgroundImage: "url(/wave.svg)" }}></div>
      <header className="header">
        <Intro />
        <Photo />
      </header>
    </>
  );
}

function Intro() {
  return (
    <section className="intro">
      <div className="main-intro">
        <span className="name">
          Subrata
          <br /> Chowdhury
        </span>
      </div>
      <div className="sub-intro-container">
        <div className="sub-intro">
          I am a
          <TypeingAnimation />
        </div>
      </div>
      <OtherPlatforms className="header-icons" />
      <Link className="download-btn" href="/files/CV.pdf" target="_blank">
        Download CV
      </Link>
    </section>
  );
}

function Photo() {
  return (
    <div className="photo">
      {/* Ensure you place your image inside the 'public' folder at the root. 
        Update the src="/profile-pic.png" to match your actual file name. 
      */}
      <Image
        src="/profile-pic.webp"
        alt="Subrata Chowdhury"
        width={400}
        height={400}
        priority
        className="profile-pic"
      />
    </div>
  );
}

function TypeingAnimation() {
  const [text, setText] = useState("");
  const [isErasing, setIsErasing] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const words = [
      "Web Developer",
      "Programmer",
      "Designer",
      "Freelancer",
      "Engineer",
    ];
    const typingSpeed = 150;
    const erasingSpeed = 100;
    const delayBetweenWords = 1000;

    const handleTyping = () => {
      if (!isErasing) {
        if (charIndex < words[wordIndex].length) {
          setText((prevText) => prevText + words[wordIndex][charIndex]);
          setCharIndex((prevCharIndex) => prevCharIndex + 1);
        } else {
          setIsErasing(true);
        }
      } else {
        if (charIndex > 0) {
          setText((prevText) => prevText.slice(0, -1));
          setCharIndex((prevCharIndex) => prevCharIndex - 1);
        } else {
          setIsErasing(false);
          setWordIndex((prevWordIndex) => (prevWordIndex + 1) % words.length);
        }
      }
    };

    const typingDelay = isErasing ? erasingSpeed : typingSpeed;
    const timer =
      charIndex >= words[wordIndex].length
        ? setTimeout(handleTyping, delayBetweenWords)
        : setTimeout(handleTyping, typingDelay);

    return () => clearTimeout(timer);
  }, [charIndex, isErasing, wordIndex]);

  return (
    <div className="sub-intro-heading">
      <span id="typing-text">&nbsp;{text}</span>
      <span id="cursor">|</span>
    </div>
  );
}
