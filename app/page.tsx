"use client";
import { useEffect, useRef } from "react";
import Header from "./components/Header";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Projects from "./projects/components/Projects";
import Contact from "./components/Contact";
import Internships from "./experiences/components/Internships";
import Feedback from "./components/Feedback";
import Packages from "./components/Packages";

export default function Home() {
  useEffect(() => {
    autoScrollFromHash();
    window.addEventListener("hashchange", autoScrollFromHash);
    return () => window.removeEventListener("hashchange", autoScrollFromHash);
  }, []);

  function autoScrollFromHash() {
    const hash = window.location.hash;
    try {
      if (hash === "#contact") {
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "#projects") {
        document
          .getElementById("projects")
          ?.scrollIntoView({ behavior: "smooth" });
      } else {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }
    } catch {}
  }

  return (
    <>
      <Header />
      <AboutMe />
      <Skills />
      <Education />
      <Projects containerStyle={{ marginTop: "2rem" }} />
      <Internships containerStyle={{ marginTop: "2rem" }} />
      <Contact />
      <Packages />
      <Feedback />
    </>
  );
}
