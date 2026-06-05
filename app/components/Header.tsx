"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Header() {
  return (
    <>
      {/* Background Wave */}
      <div className="absolute inset-0 w-full min-h-screen opacity-60 bg-no-repeat bg-cover bg-center -z-10 bg-[url('/wave.svg')] dark:opacity-60" />

      <header className="min-h-screen max-w-7xl mx-auto w-full flex flex-col-reverse md:flex-row items-center justify-center md:justify-between px-[5%] pt-20 md:pt-0 gap-10 md:gap-8 z-[2]">
        <Intro />
        <Photo />
      </header>
    </>
  );
}

function Intro() {
  return (
    <section className="flex flex-col justify-center items-center md:items-start text-gray-900 dark:text-gray-100 sm:flex-1 text-center md:text-left">
      <div className="text-[2.5rem] md:text-[4.5rem] font-bold font-['Raleway'] leading-[1.1] animate-[fade-in_0.8s_ease-out]">
        <span className="text-blue-600 dark:text-blue-500">
          Subrata
          <br /> Chowdhury
        </span>
      </div>

      <div className="text-[1.5rem] mt-2 animate-[slide-up_1s_ease-out]">
        <div className="flex flex-col md:flex-row font-['Open_Sans'] items-center md:items-end text-[1.5rem] md:text-[1.7rem]">
          <span className="mr-2">I am a</span>
          <TypeingAnimation />
        </div>
      </div>

      <SocialLinks />

      <Link
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 w-[200px] md:w-[160px] flex justify-center text-base rounded-full mt-6 transition-transform hover:-translate-y-1 hover:shadow-lg dark:shadow-blue-900/20"
        href="/files/CV.pdf"
        target="_blank"
      >
        Download CV
      </Link>
    </section>
  );
}

function Photo() {
  return (
    <div className="flex-shrink-0 flex items-center justify-center animate-[fade-in_1s_ease-out]">
      <Image
        src="/profile-pic.webp"
        alt="Subrata Chowdhury"
        width={400}
        height={400}
        priority
        className="w-[200px] h-[200px] lg:w-[250px] lg:h-[250px] xl:w-[400px] xl:h-[400px] rounded-2xl object-cover z-[2] shadow-xl dark:shadow-black/50"
      />
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="flex items-center gap-6 mt-8 self-center md:self-start">
      <a
        href="#"
        target="_blank"
        aria-label="Facebook Page"
        className="text-2xl text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
      >
        <FaFacebook />
      </a>
      <a
        href="#"
        target="_blank"
        aria-label="Instagram Page"
        className="text-2xl text-gray-700 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400 transition-colors"
      >
        <FaInstagram />
      </a>
      <a
        href="https://github.com/subrata-chowdhury"
        target="_blank"
        aria-label="GitHub Page"
        className="text-2xl text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
      >
        <FaGithub />
      </a>
      <a
        href="https://www.linkedin.com/in/subrata7000/"
        target="_blank"
        aria-label="LinkedIn Page"
        className="text-2xl text-gray-700 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-500 transition-colors"
      >
        <FaLinkedin />
      </a>
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
          setText((prev) => prev + words[wordIndex][charIndex]);
          setCharIndex((prev) => prev + 1);
        } else {
          setIsErasing(true);
        }
      } else {
        if (charIndex > 0) {
          setText((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        } else {
          setIsErasing(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };

    const timer = setTimeout(
      handleTyping,
      isErasing
        ? erasingSpeed
        : charIndex >= words[wordIndex].length
          ? delayBetweenWords
          : typingSpeed,
    );
    return () => clearTimeout(timer);
  }, [charIndex, isErasing, wordIndex]);

  return (
    <div className="text-[1.8rem] font-['Open_Sans'] md:text-[2rem] text-blue-600 dark:text-blue-500 font-semibold inline-block">
      <span>&nbsp;{text}</span>
      <span className="inline-block ml-[2px] animate-pulse text-gray-900 dark:text-gray-100">
        |
      </span>
    </div>
  );
}
