import React from "react";
import "@/app/styles/AboutMe.css";
import SimpleArrow from "../Icons/SimpleArrow";
import { projectCount } from "../data/projects";
import { certificateCount } from "../data/certificates";
import { skillCount } from "../data/skills";
import ProjectIcon from "../Icons/ProjectIcon";
import CertificationIcon from "../Icons/CertificationIcon";
import SkillsIcon from "../Icons/SkillsIcon";
import Link from "next/link";

export default function AboutMe() {
  return (
    <section className="screen-container">
      <h1 className="heading">About Me</h1>
      <div className="about-container">
        <BioSection />
        <Counts />
      </div>
    </section>
  );
}

function BioSection() {
  return (
    <article className="sub-about-container">
      <p>
        I am a Computer Science Engineering graduate with a proven track record
        of architecting scalable, production-ready applications.
      </p>
      <p>
        As a results-driven Full-Stack Web Developer, I specialize in helping
        businesses elevate their digital presence. By leveraging modern,
        high-performance frameworks like React, Next.js, Node.js, and strict
        TypeScript, I replace outdated systems with reliable, lightning-fast web
        experiences.
      </p>
      <p>
        With professional experience spanning dynamic startups to modern SaaS
        platforms, I have successfully driven end-to-end technical delivery.
        From optimizing SEO and backend integration to managing CI/CD pipelines
        in Agile environments, I am dedicated to delivering robust UI solutions
        that build trust and drive business growth.
      </p>

      <ContactDetails />

      <ul className="points">
        <li>
          Proven experience delivering high-performance SaaS solutions and
          modernizing business landing pages.
        </li>
        <li>
          Strong expertise in responsive design, MERN stack architecture, and
          comprehensive SEO optimization.
        </li>
        <li>
          Highly organized and adaptable, excelling in both independent
          freelance projects and collaborative Agile teams.
        </li>
        <li>Hobbies include Web Development, gaming, and music.</li>
      </ul>
    </article>
  );
}

function ContactDetails() {
  return (
    <div className="about-contact-details">
      <div>
        <SimpleArrow />
        <span className="field">Email:&nbsp;</span>
        <a href="mailto:subratachowdhury7000@gmail.com">
          subratachowdhury7000@gmail.com
        </a>
      </div>
      <div>
        <SimpleArrow />
        <span className="field">Phone:&nbsp;</span>
        <a href="tel:+919382640789">+91 9382640789</a>
      </div>
      <div>
        <SimpleArrow />
        <span className="field">Location:&nbsp;</span>
        West Bengal, India
      </div>
    </div>
  );
}

function Counts() {
  return (
    <section className="counts-container">
      <Link className="count" href="#projects">
        <div className="count-icon">
          <ProjectIcon />
        </div>
        <div className="count-number">{projectCount}</div>
        <div className="count-label">Projects</div>
      </Link>
      <Link className="count" href="#certifications">
        <div className="count-icon">
          <CertificationIcon />
        </div>
        <div className="count-number">{certificateCount}</div>
        <div className="count-label">Certifications</div>
      </Link>
      <Link className="count" href="#skills">
        <div className="count-icon">
          <SkillsIcon />
        </div>
        <div className="count-number">{skillCount}</div>
        <div className="count-label">Skills</div>
      </Link>
    </section>
  );
}
