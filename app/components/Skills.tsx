"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { FiLayers, FiGrid } from "react-icons/fi";
import { skillsData, Skill } from "../data/skills";
import { projectsData } from "../data/projects";
import { ProjectsContainer } from "@/app/projects/components/Projects";
import Model from "./Model";

export default function Skills() {
  const [filter, setFilter] = useState<"core" | "all">("core");

  const displayedSkills = useMemo(() => {
    let filtered = [...skillsData];

    // Filter by relevance
    if (filter === "core") {
      filtered = filtered.filter((skill) => skill.isFreelanceRelevant);
    }

    // Professional sort: Top skills first, then sort by level descending
    filtered.sort((a, b) => {
      if (a.topSkill && !b.topSkill) return -1;
      if (!a.topSkill && b.topSkill) return 1;
      return b.lvl - a.lvl;
    });

    return filtered;
  }, [filter]);

  return (
    <section
      className="px-6 py-12 md:py-20 max-w-7xl mx-auto w-full"
      id="skills"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 md:mb-10">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 mb-2 md:mb-3 animate-[slide-right_1s_ease-out]">
            Technical Expertise
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-xl leading-relaxed">
            The tools and technologies I use to build fast, scalable, and modern
            digital experiences.
          </p>
        </div>

        {/* Compact Segmented Control */}
        <div className="flex p-1 bg-gray-100 dark:bg-gray-800/50 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-700 w-full md:w-auto shrink-0">
          <button
            onClick={() => setFilter("core")}
            className={`flex-1 cursor-pointer md:flex-none flex items-center justify-center gap-2 px-4 py-2 md:py-2.5 rounded-md md:rounded-lg text-xs md:text-sm font-medium transition-all duration-200 ${
              filter === "core"
                ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            <FiLayers className="text-sm md:text-base" />
            <span>Freelance Stack</span>
          </button>
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 cursor-pointer md:flex-none flex items-center justify-center gap-2 px-4 py-2 md:py-2.5 rounded-md md:rounded-lg text-xs md:text-sm font-medium transition-all duration-200 ${
              filter === "all"
                ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            <FiGrid className="text-sm md:text-base" />
            <span>All Skills</span>
          </button>
        </div>
      </div>

      <SkillsContainer skillsData={displayedSkills} />
    </section>
  );
}

export const SkillsContainer = ({
  skillsData = [],
}: {
  skillsData?: Skill[];
}) => {
  return (
    // Tightened the grid gaps and adjusted column count for a more compact layout
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 md:gap-4">
      {skillsData.length > 0 ? (
        skillsData.map((skill, index) => (
          <SkillCard key={skill.id} skill={skill} animationDelay={index} />
        ))
      ) : (
        <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400 italic bg-gray-50 dark:bg-gray-800/20 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
          No Skills Found
        </div>
      )}
    </div>
  );
};

function SkillCard({
  skill,
  animationDelay,
}: {
  skill: Skill;
  animationDelay: number;
}) {
  const [showRelatedProjects, setShowRelatedProjects] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowRelatedProjects(true)}
        // Horizontal layout (flex-row instead of flex-col) to drastically save vertical space
        className="group flex items-center p-2.5 md:p-4 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/5 rounded-xl hover:bg-white dark:hover:bg-gray-800 hover:border-blue-200 dark:hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm hover:shadow-blue-600/5 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 animate-[slide-up_0.5s_ease-out_forwards]"
        style={{ animationDuration: `${animationDelay / 15 + 0.3}s` }}
        aria-label={`View projects using ${skill.name}`}
      >
        <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 mr-3 flex items-center justify-center bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 group-hover:scale-105 transition-transform duration-300">
          {skill.iconSrc ? (
            <Image
              src={skill.iconSrc}
              alt={`${skill.name} logo`}
              width={24}
              height={24}
              className="object-contain w-5 h-5 md:w-6 md:h-6"
            />
          ) : (
            <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full" />
          )}
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          <span className="font-semibold text-[0.85rem] md:text-base text-gray-800 dark:text-gray-200 mb-1 truncate leading-tight">
            {skill.name}
          </span>

          {/* Compact Level Indicator */}
          <div
            className="flex items-center gap-1"
            aria-label={`Skill level: ${skill.lvl} out of 3`}
          >
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  i < skill.lvl
                    ? "bg-blue-500 dark:bg-blue-400 group-hover:bg-blue-600 dark:group-hover:bg-blue-300"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>
      </button>

      {showRelatedProjects && (
        <SkillDetailsPopUp
          skill={skill.name}
          onClose={() => setShowRelatedProjects(false)}
        />
      )}
    </>
  );
}

function SkillDetailsPopUp({
  skill,
  onClose,
}: {
  skill: string;
  onClose: () => void;
}) {
  const relatedProjects = useMemo(
    () =>
      projectsData.filter(
        (project) =>
          project.mainSkills.includes(skill) ||
          project.otherSkills.includes(skill),
      ),
    [skill],
  );

  return (
    <Model onClose={onClose}>
      <div className="flex flex-col w-full h-full">
        <div className="pb-4 mb-6 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            <span className="text-blue-600 dark:text-blue-400">{skill}</span>{" "}
            Projects
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm md:text-base">
            A collection of work where I utilized {skill}.
          </p>
        </div>

        {relatedProjects.length > 0 ? (
          <ProjectsContainer projectData={relatedProjects} />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <FiLayers className="text-2xl text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
              No public projects yet
            </p>
            <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
              I've used {skill} in private repositories or client work that
              isn't featured here.
            </p>
          </div>
        )}
      </div>
    </Model>
  );
}
