// app/components/Skills.tsx
"use client";
import { useState, useMemo } from "react";
import "@/app/styles/skills.css";
import { skillsData, Skill } from "../data/skills";
import Model from "./Model";
import { ProjectsContainer } from "@/app/projects/components/Projects";
import { projectsData } from "../data/projects";
import Image from "next/image";
import Title from "@/components/Title";
import Star from "../Icons/Star";

export default function Skills() {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [sortBy, setSortBy] = useState<"default" | "level">("default");

  // Derive the displayed skills cleanly based on current filter and sort states
  const displayedSkills = useMemo(() => {
    let filtered = [...skillsData];

    if (!showAllSkills) {
      filtered = filtered.filter((skill) => skill.isFreelanceRelevant);
    }

    if (sortBy === "level") {
      // Sort strictly by level, otherwise preserve the curated array order
      filtered.sort((a, b) => b.lvl - a.lvl);
    }

    return filtered;
  }, [showAllSkills, sortBy]);

  const handleSortToggle = () => {
    setSortBy((prev) => (prev === "default" ? "level" : "default"));
  };

  const handleFilterToggle = () => {
    setShowAllSkills((prev) => !prev);
  };

  return (
    <section className="screen-container">
      <div className="heading" id="skills">
        <div>My Expertise</div>
        <div className="btn-container">
          <FilterButton
            onClickHandler={handleFilterToggle}
            active={showAllSkills}
          />
          <SortButton
            onClickHandler={handleSortToggle}
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
  skillClickHandler = () => {},
}: {
  skillsData?: Skill[];
  skillClickHandler?: (e: React.MouseEvent<HTMLDivElement>) => void;
}) => {
  return (
    <div className="skills-container">
      {skillsData.length > 0 ? (
        skillsData.map((skill, index) => (
          <SkillCard
            name={skill.name}
            icon={skill.iconSrc}
            id={skill.id}
            key={skill.id}
            onClickHandler={skillClickHandler}
            lvl={skill.lvl}
            animationDelay={index}
          />
        ))
      ) : (
        <div className="no-skill">No Skills Found</div>
      )}
    </div>
  );
};

function SkillCard({
  name,
  icon,
  id,
  onClickHandler,
  lvl,
  animationDelay,
}: {
  name: string;
  icon?: string;
  id: string;
  onClickHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
  lvl: number;
  animationDelay: number;
}) {
  const [showRelatedProjects, setShowRelatedProjects] = useState(false);

  return (
    <>
      <Title
        title={
          <div className="skill-details">
            {[...Array(3)].map((_, i) => (
              <Star key={i} filled={i < lvl} />
            ))}
          </div>
        }
      >
        <div
          className="skill-container"
          id={id}
          title={`${name}`}
          onClick={(e) => {
            if (id) setShowRelatedProjects(true);
            onClickHandler(e);
          }}
          style={{ animationDuration: `${animationDelay / 10}s` }}
        >
          <div className="sub-skill-container">
            <div className="skill-name-container">
              {icon && (
                <Image
                  src={icon}
                  alt={`${name} icon`}
                  width={24}
                  height={24}
                  style={{
                    objectFit: "contain",
                    objectPosition: "left center",
                  }}
                />
              )}
              <div className="skill-name">{name}</div>
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
    <button className="sort btn" onClick={onClickHandler}>
      <div>{active ? "Default Order" : "Sort By Level"}</div>
      <Image
        src="/icons/sort.png"
        alt="sort icon"
        width={18}
        height={18}
        style={{ height: "auto" }}
      />
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
    <button className="sort filter btn" onClick={onClickHandler}>
      <div>{active ? "Show Core Skills" : "Show All Skills"}</div>
      <Image
        src="/icons/sort.png"
        alt="filter icon"
        width={18}
        height={18}
        style={{ height: "auto" }}
      />
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
      <div className="skill-details-container">
        <div className="heading">Projects using {skill}</div>
        {relatedProjects.length > 0 ? (
          <ProjectsContainer projectData={relatedProjects} />
        ) : (
          <p style={{ padding: "1rem", color: "var(--text-color)" }}>
            No projects available for this skill yet.
          </p>
        )}
      </div>
    </Model>
  );
}
