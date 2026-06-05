import React from "react";
import Link from "next/link";
import { projectCount } from "../data/projects";
import { certificateCount } from "../data/certificates";
import { skillCount } from "../data/skills";
// Using icons that closely match your original custom SVGs
import { FiFolder, FiAward } from "react-icons/fi";
import { BiCodeAlt } from "react-icons/bi";

export default function AboutMe() {
  return (
    <section className="px-[5%] mt-8 max-w-8xl mx-auto w-full" id="about">
      <h1 className="font-['Raleway'] w-full text-[2rem] font-bold grid grid-flow-col justify-between items-center text-gray-900 dark:text-gray-100 mb-8">
        <div className="animate-[slide-right_1s_ease-out]">About Me</div>
      </h1>
      <div className="text-base text-gray-800 dark:text-gray-200">
        <BioSection />
        <Counts />
      </div>
    </section>
  );
}

function BioSection() {
  return (
    <article>
      <p className="mb-[1.2rem] leading-[1.6]">
        I am a Full-Stack Web Developer specializing in helping small businesses
        and e-commerce stores elevate their digital presence.
      </p>
      <p className="mb-[1.2rem] leading-[1.6]">
        A slow, outdated, or broken website costs you customers. I replace these
        with lightning-fast, modern, and highly responsive web experiences. By
        handling the technical heavy lifting, I ensure your site keeps visitors
        engaged, looks professional on every device, and ultimately drives
        sales.
      </p>
      <p className="mb-[1.2rem] leading-[1.6]">
        To ensure we are a perfect fit with zero risk to you, I operate on a{" "}
        <strong>"Free-to-Fee"</strong> model. You will receive a custom,
        high-quality design mockup of your new homepage completely free of
        charge before any payment or commitment is requested.
      </p>

      {/* Contact details removed as requested */}

      <ul className="leading-[1.8] mt-[1.5rem] pl-[1.5rem] list-disc">
        <li className="mb-[0.5rem]">
          Delivering modern, fast-loading websites optimized to turn visitors
          into local customers.
        </li>
        <li className="mb-[0.5rem]">
          Guaranteed seamless performance across all mobile, tablet, and desktop
          devices.
        </li>
        <li className="mb-[0.5rem]">
          Transparent, asynchronous communication process to save you time—no
          unnecessary meetings required.
        </li>
        <li className="mb-[0.5rem]">
          Hobbies include Web Development, gaming, and music.
        </li>
      </ul>
    </article>
  );
}

function Counts() {
  return (
    <section className="flex flex-wrap gap-6 mt-8 justify-evenly max-sm:gap-2">
      <Link
        className="flex flex-col items-center justify-center p-4 max-sm:p-2 max-sm:flex-[1_1_30%] text-gray-800 dark:text-gray-200 no-underline group"
        href="#projects"
      >
        <div className="flex items-center justify-center bg-blue-50/50 dark:bg-[#3d3d3d] w-[4.5rem] h-[4.5rem] max-sm:w-[3.5rem] max-sm:h-[3.5rem] rounded-lg shadow-[inset_0_0_120px_rgba(143,190,255,0.277)] transition-all duration-300 group-hover:bg-blue-600">
          <FiFolder className="w-8 h-8 max-sm:w-6 max-sm:h-6 text-gray-800 dark:text-gray-200 transition-colors duration-300 group-hover:text-white" />
        </div>
        <div className="text-[2.5rem] max-sm:text-[2rem] font-bold mt-3 leading-none">
          {projectCount}
        </div>
        <div className="mt-1">Projects</div>
      </Link>

      <Link
        className="flex flex-col items-center justify-center p-4 max-sm:p-2 max-sm:flex-[1_1_30%] text-gray-800 dark:text-gray-200 no-underline group"
        href="#certifications"
      >
        <div className="flex items-center justify-center bg-blue-50/50 dark:bg-[#3d3d3d] w-[4.5rem] h-[4.5rem] max-sm:w-[3.5rem] max-sm:h-[3.5rem] rounded-lg shadow-[inset_0_0_120px_rgba(143,190,255,0.277)] transition-all duration-300 group-hover:bg-blue-600">
          <FiAward className="w-8 h-8 max-sm:w-6 max-sm:h-6 text-gray-800 dark:text-gray-200 transition-colors duration-300 group-hover:text-white" />
        </div>
        <div className="text-[2.5rem] max-sm:text-[2rem] font-bold mt-3 leading-none">
          {certificateCount}
        </div>
        <div className="mt-1 text-center">Certifications</div>
      </Link>

      <Link
        className="flex flex-col items-center justify-center p-4 max-sm:p-2 max-sm:flex-[1_1_30%] text-gray-800 dark:text-gray-200 no-underline group"
        href="#skills"
      >
        <div className="flex items-center justify-center bg-blue-50/50 dark:bg-[#3d3d3d] w-[4.5rem] h-[4.5rem] max-sm:w-[3.5rem] max-sm:h-[3.5rem] rounded-lg shadow-[inset_0_0_120px_rgba(143,190,255,0.277)] transition-all duration-300 group-hover:bg-blue-600">
          <BiCodeAlt className="w-8 h-8 max-sm:w-6 max-sm:h-6 text-gray-800 dark:text-gray-200 transition-colors duration-300 group-hover:text-white" />
        </div>
        <div className="text-[2.5rem] max-sm:text-[2rem] font-bold mt-3 leading-none">
          {skillCount}
        </div>
        <div className="mt-1">Skills</div>
      </Link>
    </section>
  );
}
