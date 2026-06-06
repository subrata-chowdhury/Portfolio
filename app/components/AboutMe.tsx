import React from "react";
import Link from "next/link";
import { projectCount } from "../data/projects";
import { certificateCount } from "../data/certificates";
import { skillCount } from "../data/skills";
import { FiFolder, FiAward } from "react-icons/fi";
import { BiCodeAlt } from "react-icons/bi";

export default function AboutMe() {
  return (
    <section
      className="px-6 py-12 md:py-20 max-w-7xl mx-auto w-full"
      id="about"
    >
      <div className="flex items-center gap-4 mb-8 md:mb-10">
        <h2 className="font-['Raleway'] text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 animate-[slide-right_1s_ease-out]">
          About Me
        </h2>
        <div className="h-[1px] flex-1 bg-gray-200 dark:bg-gray-800 opacity-50 hidden sm:block" />
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
        <BioSection />
        <Counts />
      </div>
    </section>
  );
}

function BioSection() {
  return (
    <article className="flex-1 text-[0.95rem] md:text-base text-gray-700 dark:text-gray-300 font-['Open_Sans']">
      <p className="mb-4 leading-relaxed">
        I am a Full-Stack Web Developer specializing in helping small businesses
        and e-commerce stores elevate their digital presence.
      </p>

      <p className="mb-4 leading-relaxed">
        A slow, outdated, or broken website costs you customers. I replace these
        with lightning-fast, modern, and highly responsive web experiences. By
        handling the technical heavy lifting, I ensure your site keeps visitors
        engaged, looks professional on every device, and ultimately drives
        sales.
      </p>

      <p className="mb-5 leading-relaxed bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-lg border-l-2 border-blue-500">
        To ensure we are a perfect fit with zero risk to you, I operate on a{" "}
        <strong className="text-blue-600 dark:text-blue-400 font-semibold">
          "Free-to-Fee"
        </strong>{" "}
        model. You will receive a custom, high-quality design mockup of your new
        homepage completely free of charge before any payment or commitment is
        requested.
      </p>

      <ul className="leading-relaxed mt-6 pl-5 list-disc space-y-2 text-gray-600 dark:text-gray-400">
        <li>
          Delivering modern, fast-loading websites optimized to turn visitors
          into local customers.
        </li>
        <li>
          Guaranteed seamless performance across all mobile, tablet, and desktop
          devices.
        </li>
        <li>
          Transparent, asynchronous communication process to save you time—no
          unnecessary meetings required.
        </li>
      </ul>
    </article>
  );
}

function Counts() {
  const stats = [
    {
      count: projectCount,
      label: "Projects",
      icon: FiFolder,
      href: "#projects",
    },
    {
      count: certificateCount,
      label: "Certificates",
      icon: FiAward,
      href: "#certifications",
    },
    { count: skillCount, label: "Skills", icon: BiCodeAlt, href: "#skills" },
  ];

  return (
    <section className="w-full lg:w-auto px-6 sm:px-12 grid grid-cols-3 gap-3 md:gap-6 lg:flex lg:flex-col shrink-0 mt-2 lg:mt-0">
      {stats.map((stat, index) => (
        <Link
          key={index}
          href={stat.href}
          className="group flex flex-col lg:flex-row items-center lg:justify-start justify-center p-3 md:p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors duration-300 text-center lg:text-left"
        >
          <div className="flex items-center justify-center bg-blue-50/80 dark:bg-[#3d3d3d] w-12 h-12 md:w-16 md:h-16 rounded-xl shadow-sm border border-blue-100 dark:border-gray-700 transition-all duration-300 group-hover:bg-blue-600 group-hover:border-blue-600 dark:group-hover:bg-blue-500">
            <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-white" />
          </div>

          <div className="mt-3 lg:mt-0 lg:ml-5">
            <div className="text-xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-none">
              {stat.count}
            </div>
            <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1.5 lg:mt-1 font-medium">
              {stat.label}
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
