"use client";

import { SkillsContainer } from "@/app/components/Skills";
import { skillsData } from "@/app/data/skills";
import { FiExternalLink, FiArrowRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Gallery from "./Gallery";

export default function DetailedProjectView({
  name = "Name",
  repoName,
  description = "It's a Project",
  noOfCommits,
  createdAt,
  updatedAt,
  mainSkills = [],
  otherSkills = [],
  previewImageSrc,
  previewUiImages = [],
  liveUrl = null,
  ownerDetails,
}: {
  name: string;
  repoName?: string | null;
  description?: string;
  noOfCommits?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  mainSkills?: string[];
  otherSkills?: string[];
  previewImageSrc?: string;
  previewUiImages?: string[];
  liveUrl?: string | null;
  ownerDetails?: {
    name: string;
    role: string;
    url: string | null;
    feedback: string;
    stars?: number;
  };
}) {
  const newSkillsData = mainSkills
    .map((skill) => skillsData.find((e) => e.name === skill))
    .filter(Boolean) as typeof skillsData;

  const projectSkills = otherSkills.map((skill) => {
    const foundSkill = skillsData.find((e) => e.name === skill);
    return (
      foundSkill || {
        name: skill,
        iconSrc: "/icons/skill.webp",
        id: skill.toLowerCase().split(" ").join("-"),
        lvl: 1,
      }
    );
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 px-[5%] max-w-8xl mx-auto mt-24 mb-20">
      {/* Left Column - Details */}
      <div className="lg:col-span-2 flex flex-col">
        <div className="flex flex-col items-start pb-6 border-b border-gray-200 dark:border-white/10 mb-6">
          <h1 className="text-4xl font-bold font-['Raleway'] text-gray-900 dark:text-gray-100 m-0">
            {name}
          </h1>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">
            {createdAt && updatedAt
              ? `${new Date(createdAt).toDateString()} - ${new Date(updatedAt).toDateString()}`
              : "Timeline: N/A (Private Repository)"}
          </div>
        </div>

        <p className="text-base text-gray-700 dark:text-gray-300 font-medium leading-relaxed mb-10">
          {description}
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 border-b-2 border-blue-500 w-max pb-1">
          Tech Stack
        </h2>
        <SkillsContainer skillsData={newSkillsData} />

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 mt-8 border-b-2 border-blue-500 w-max pb-1">
          Skills
        </h2>
        <SkillsContainer skillsData={projectSkills} />

        <div className="flex flex-wrap items-center gap-4 mt-10">
          {liveUrl && (
            <Link
              href={liveUrl}
              className="inline-flex items-center gap-2 bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors px-6 py-3 rounded-lg font-bold"
              target="_blank"
            >
              <span>Live Demo</span>
              <FiExternalLink className="text-lg" />
            </Link>
          )}
          {noOfCommits !== null && (noOfCommits || 0) > 0 && repoName && (
            <Link
              href={`https://github.com/subrata-chowdhury/${repoName}`}
              className="inline-flex items-center gap-2 bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors px-6 py-3 rounded-lg font-bold"
              target="_blank"
            >
              <span>View in Github</span>
              <FiArrowRight className="text-lg" />
            </Link>
          )}
        </div>

        {/* Render Owner Feedback if it exists */}
        {ownerDetails && (
          <div className="mt-14 p-6 bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-white/10 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white bg-blue-600 shrink-0">
                {ownerDetails.name.charAt(0)}
              </div>
              <div className="flex flex-col">
                <div className="font-bold text-gray-900 dark:text-gray-100">
                  {ownerDetails.name}
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {ownerDetails.role}
                </div>
              </div>
            </div>

            {ownerDetails.stars !== undefined && (
              <div
                className="flex gap-1"
                aria-label={`Rating: ${ownerDetails.stars} out of 5`}
              >
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`text-lg ${index < (ownerDetails?.stars || 5) ? "text-amber-500" : "text-gray-300 dark:text-gray-700"}`}
                  />
                ))}
              </div>
            )}
            <p className="italic text-gray-700 dark:text-gray-300 m-0 border-l-4 border-blue-500 pl-4 py-1">
              &quot;{ownerDetails.feedback}&quot;
            </p>
          </div>
        )}
      </div>

      {/* Right Column - Media & Commits */}
      <div className="flex flex-col gap-8 items-start">
        <div className="w-full bg-blue-50 dark:bg-neutral-800 border border-blue-100 dark:border-neutral-700 p-5 rounded-xl text-lg text-gray-800 dark:text-gray-200 shadow-sm">
          <span className="font-bold">Total Commits: </span>
          {noOfCommits !== null && (noOfCommits || 0) > 0 ? (
            <span className="text-blue-600 dark:text-blue-400 font-black">
              {noOfCommits}
            </span>
          ) : (
            "N/A (Private)"
          )}
        </div>

        {previewImageSrc && (
          <div className="w-full rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-md">
            <Image
              src={"/" + previewImageSrc}
              alt={`${name} Main Preview`}
              width={800}
              height={450}
              className="w-full h-auto object-cover object-top"
              priority
            />
          </div>
        )}

        {previewUiImages.length > 0 && <Gallery images={previewUiImages} />}
      </div>
    </div>
  );
}
