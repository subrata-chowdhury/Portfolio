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
  return (
    <>
      <Header />
      <AboutMe />
      <Skills />
      <Education />
      <Projects containerStyle={{ marginTop: "0rem" }} />
      <Internships />
      <Contact />
      <Packages />
      <Feedback />
    </>
  );
}
