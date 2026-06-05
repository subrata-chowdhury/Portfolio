"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FiFilter, FiList } from "react-icons/fi";
import { skillsData, Skill } from "../data/skills";
import { projectsData } from "../data/projects";
import { ProjectsContainer } from "@/app/projects/components/Projects";
import Title from "@/components/Title";
import Model from "./Model";

export default function Skills() {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [sortBy, setSortBy] = useState<"default" | "level">("default");

  const displayedSkills = useMemo(() => {
    let filtered = [...skillsData];
    if (!showAllSkills) {
      filtered = filtered.filter((skill) => skill.isFreelanceRelevant);
    }
    if (sortBy === "level") {
      filtered.sort((a, b) => b.lvl - a.lvl);
    }
    return filtered;
  }, [showAllSkills, sortBy]);

  return (
    <section className="px-[5%] mt-12 lg:mt-16 max-w-8xl mx-auto w-full">
      <div
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        id="skills"
      >
        <h2 className="text-3xl md:text-4xl font-bold font-['Raleway'] text-gray-900 dark:text-gray-100">
          My Expertise
        </h2>
        <div className="flex flex-wrap gap-3">
          <FilterButton
            onClickHandler={() => setShowAllSkills(!showAllSkills)}
            active={showAllSkills}
          />
          <SortButton
            onClickHandler={() =>
              setSortBy((prev) => (prev === "default" ? "level" : "default"))
            }
            active={sortBy === "level"}
          />
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
    <div className="flex flex-wrap gap-4 py-4">
      {skillsData.length > 0 ? (
        skillsData.map((skill, index) => (
          <SkillCard
            name={skill.name}
            icon={skill.iconSrc}
            id={skill.id}
            key={skill.id}
            lvl={skill.lvl}
            animationDelay={index}
          />
        ))
      ) : (
        <div className="text-gray-500 dark:text-gray-400 italic">
          No Skills Found
        </div>
      )}
    </div>
  );
};

function SkillCard({
  name,
  icon,
  id,
  lvl,
  animationDelay,
}: {
  name: string;
  icon?: string;
  id: string;
  lvl: number;
  animationDelay: number;
}) {
  const [showRelatedProjects, setShowRelatedProjects] = useState(false);

  return (
    <>
      <Title
        title={
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-sm ${i < lvl ? "text-amber-500" : "text-gray-400 dark:text-gray-600"}`}
              />
            ))}
          </div>
        }
      >
        <div
          id={id}
          title={name}
          onClick={() => setShowRelatedProjects(true)}
          className="inline-flex items-center bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-xl px-5 py-3 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/10 dark:hover:shadow-blue-400/10 hover:border-blue-400/50 animate-[slide-up_0.5s_ease-out_forwards]"
          style={{ animationDuration: `${animationDelay / 10 + 0.3}s` }}
        >
          <div className="flex items-center gap-3 w-full">
            {icon && (
              <Image
                src={icon}
                alt={`${name} icon`}
                width={24}
                height={24}
                className="object-contain"
              />
            )}
            <div className="font-semibold text-[0.95rem] text-gray-800 dark:text-gray-200 whitespace-nowrap">
              {name}
            </div>
          </div>
        </div>
      </Title>

      {showRelatedProjects && (
        <SkillDetailsPopUp
          skill={name}
          onClose={() => setShowRelatedProjects(false)}
        />
      )}
    </>
  );
}

function SortButton({
  onClickHandler,
  active,
}: {
  onClickHandler: () => void;
  active: boolean;
}) {
  return (
    <button
      className="flex items-center gap-2 bg-blue-50/80 dark:bg-white/10 hover:bg-blue-100 dark:hover:bg-white/20 text-gray-800 dark:text-gray-200 border border-transparent transition-all px-4 py-2 rounded-lg font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      onClick={onClickHandler}
    >
      <span>{active ? "Default Order" : "Sort By Level"}</span>
      <FiList className="text-lg" />
    </button>
  );
}

function FilterButton({
  onClickHandler,
  active,
}: {
  onClickHandler: () => void;
  active: boolean;
}) {
  return (
    <button
      className="flex items-center gap-2 bg-blue-50/80 dark:bg-white/10 hover:bg-blue-100 dark:hover:bg-white/20 text-gray-800 dark:text-gray-200 border border-transparent transition-all px-4 py-2 rounded-lg font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      onClick={onClickHandler}
    >
      <span>{active ? "Core Freelance Stack" : "Show All Skills"}</span>
      <FiFilter className="text-lg" />
    </button>
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
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 pb-4 mb-4 border-b border-gray-200 dark:border-gray-800">
          Projects using {skill}
        </h3>
        {relatedProjects.length > 0 ? (
          <ProjectsContainer projectData={relatedProjects} />
        ) : (
          <p className="text-gray-600 dark:text-gray-400 p-4 bg-gray-50 dark:bg-neutral-800/50 rounded-lg">
            No projects available for this skill yet.
          </p>
        )}
      </div>
    </Model>
  );
}
