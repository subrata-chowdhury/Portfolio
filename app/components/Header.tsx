"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Header() {
  return (
    <>
      {/* Ultra-subtle background wave to maintain brand texture without clutter */}
      <div className="absolute inset-0 w-full min-h-screen opacity-40 bg-no-repeat bg-cover bg-center -z-10 bg-[url('/wave.svg')] dark:opacity-50 pointer-events-none" />

      <header className="relative min-h-screen max-w-6xl mx-auto w-full flex flex-col-reverse md:flex-row items-center justify-center md:justify-between px-6 py-20 gap-10 md:gap-8 z-[2]">
        <Intro />
        <Photo />
      </header>
    </>
  );
}

function Intro() {
  return (
    <section className="flex flex-col items-center md:items-start text-center md:text-left sm:flex-1 w-full max-w-2xl">
      <div className="space-y-3 animate-[fade-in_0.8s_ease-out]">
        <h2 className="text-sm md:text-base font-semibold tracking-widest text-blue-600 dark:text-blue-500">
          Freelance Web Developer
        </h2>
        <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tight text-gray-900 dark:text-gray-50 leading-[1.1]">
          Subrata <br className="hidden md:block" />
          Chowdhury
        </h1>
      </div>

      <div className="mt-4 md:mt-6 h-[2rem] md:h-[2.5rem] flex items-center justify-center md:justify-start text-lg md:text-2xl text-gray-600 dark:text-gray-300 font-medium animate-[slide-up_1s_ease-out]">
        <span className="mr-2">I build</span>
        <TypingAnimation />
      </div>

      <div className="mt-8 flex flex-col items-center md:items-start gap-8 w-full">
        <SocialLinks />

        <Link
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 w-full md:w-[200px] flex justify-center items-center text-base font-medium rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-blue-600/25 dark:shadow-blue-900/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 dark:focus:ring-offset-gray-900"
          href="/files/CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download CV
        </Link>
      </div>
    </section>
  );
}

function Photo() {
  return (
    <div className="relative flex-shrink-0 flex items-center justify-center animate-[fade-in_1s_ease-out] mb-4 md:mb-0">
      <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-[22rem] lg:h-[22rem]">
        <Image
          src="/profile-pic.webp"
          alt="Subrata Chowdhury"
          fill
          sizes="(max-width: 768px) 224px, (max-width: 1024px) 288px, 352px"
          priority
          className="rounded-full object-cover z-10 shadow-xl dark:shadow-black/60 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
        />
      </div>
    </div>
  );
}

function SocialLinks() {
  const links = [
    {
      icon: FaGithub,
      href: "https://github.com/subrata-chowdhury",
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/subrata7000/",
      label: "LinkedIn",
    },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaFacebook, href: "#", label: "Facebook" },
  ];

  return (
    <div className="flex items-center gap-6">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit my ${link.label} profile`}
          className="text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition-colors duration-200"
        >
          <link.icon className="w-5 h-5 md:w-6 md:h-6" />
        </a>
      ))}
    </div>
  );
}

function TypingAnimation() {
  const [text, setText] = useState("");
  const [isErasing, setIsErasing] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const words = [
      "Modern Websites.",
      "Fast Landing Pages.",
      "Scalable Web Apps.",
      "Custom Solutions.",
    ];

    const typingSpeed = 100;
    const erasingSpeed = 60;
    const delayBetweenWords = 1500;

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
    <div className="font-semibold text-blue-600 dark:text-blue-500 inline-flex items-center min-w-[200px]">
      <span>{text}</span>
      <span className="inline-block w-[2px] h-[1em] ml-1 bg-blue-600 dark:bg-blue-500 animate-pulse" />
    </div>
  );
}
