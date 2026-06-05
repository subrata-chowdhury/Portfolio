"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import {
  FiArrowRight,
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { projectsData as projectData, ProjectType } from "@/app/data/projects";
import Model from "@/app/components/Model";

interface ProjectsProps {
  showLimited?: boolean;
  showSeeMoreBtn?: boolean;
  forwardRef?: React.RefObject<HTMLDivElement | null> | null;
  containerStyle?: React.CSSProperties;
}

export default function Projects({
  showLimited = true,
  showSeeMoreBtn = true,
  forwardRef = null,
  containerStyle = {},
}: ProjectsProps) {
  return (
    <section
      className="px-[5%] mt-24 max-w-8xl mx-auto w-full"
      style={containerStyle}
    >
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        id="projects"
        ref={forwardRef}
      >
        <h2 className="text-3xl md:text-4xl font-bold font-['Raleway'] text-gray-900 dark:text-gray-100">
          Projects
        </h2>
        <GitHubButton />
      </div>

      <ProjectsContainer
        projectData={showLimited ? projectData.slice(0, 4) : projectData}
      />

      {showSeeMoreBtn && (
        <div className="flex justify-end mt-8">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-md font-medium transition-colors hover:bg-blue-700 active:bg-blue-800"
          >
            View All Projects
          </Link>
        </div>
      )}
    </section>
  );
}

export function ProjectsContainer({
  projectData = [],
}: {
  projectData: ProjectType[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pt-4">
      {projectData.length > 0 ? (
        projectData.map((project, index) => (
          <Project key={index} {...project} animationDelay={index / 10} />
        ))
      ) : (
        <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400 font-medium">
          No Projects Available
        </div>
      )}
    </div>
  );
}

export function GitHubButton() {
  return (
    <a
      className="inline-flex items-center justify-center gap-2.5 bg-blue-600 text-white px-4 py-2 rounded-md text-sm md:text-base font-medium transition-colors hover:bg-blue-700 active:bg-blue-800"
      href="https://github.com/subrata-chowdhury"
      target="_blank"
      rel="noreferrer"
    >
      <FaGithub className="text-lg" />
      <span>View My Github Page</span>
    </a>
  );
}

export function Project({
  name = "Name",
  repoName = "Repo-Name",
  description = "It's a Project",
  clientProject = false,
  previewImageSrc = "",
  previewUiImages = [],
  liveUrl,
  animationDelay = 0,
}: {
  name: string;
  repoName: string;
  description: string;
  clientProject?: boolean;
  noOfCommits?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  mainSkills: string[];
  otherSkills: string[];
  previewImageSrc: string;
  previewUiImages?: string[];
  liveUrl?: string;
  animationDelay: number;
}) {
  const [showAbout, setShowAbout] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Combine the main preview image with any additional UI images
  const allImages = [previewImageSrc, ...(previewUiImages || [])].filter(
    Boolean,
  );

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length,
    );
  };

  const closeModel = () => {
    setShowImg(false);
    setCurrentImgIndex(0); // Reset slider on close
  };

  return (
    <>
      <div
        className="flex flex-col bg-white dark:bg-[#1a1a1a] rounded-xl border-2 border-black/15 dark:border-white/10 text-gray-900 dark:text-gray-100 transition-transform hover:-translate-y-1 hover:shadow-md duration-300"
        style={{ transitionDelay: `${animationDelay}s` }}
      >
        <div
          className="cursor-pointer w-full aspect-[4/3] rounded-t-lg overflow-hidden border-b border-black/5 dark:border-white/5"
          onClick={() => setShowImg(true)}
        >
          <Image
            src={"/" + previewImageSrc}
            alt={`${name} project preview`}
            width={600}
            height={450}
            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="flex flex-col gap-3 px-4 py-4 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-[1.4rem] leading-tight">{name}</h3>
            {clientProject && (
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50 text-[0.65rem] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">
                Client
              </span>
            )}
          </div>

          <div
            className="text-[0.9rem] leading-relaxed text-gray-700 dark:text-gray-300 cursor-pointer flex-1"
            onClick={() => setShowAbout((val) => !val)}
          >
            {description.length > 70 && !showAbout
              ? `${description.slice(0, 65)}... `
              : description}
            {description.length > 70 && !showAbout && (
              <span className="text-blue-600 dark:text-blue-400 font-medium hover:underline ml-1">
                read more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 mt-1 justify-between">
            {liveUrl ? (
              <Link
                href={liveUrl}
                target="_blank"
                className="inline-flex text-nowrap items-center gap-1.5 bg-black/5 dark:bg-white/10 px-3 py-1.5 rounded-lg text-[0.85rem] font-bold text-gray-900 dark:text-gray-100 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
              >
                <span>Live Demo</span>
                <FiExternalLink className="text-sm" />
              </Link>
            ) : (
              <Link
                href={
                  repoName
                    ? `https://github.com/subrata-chowdhury/${repoName}`
                    : "#"
                }
                target="_blank"
                className="inline-flex text-nowrap items-center gap-1.5 px-2 py-1.5 text-[0.85rem] font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span>{repoName ? "View in Github" : "View Here"}</span>
                <FiArrowRight className="text-sm" />
              </Link>
            )}

            <Link
              href={"/projects/" + repoName}
              className="inline-flex text-nowrap items-center justify-center bg-blue-600 text-white px-3 py-1.5 rounded-lg text-[0.85rem] font-medium transition-colors hover:bg-blue-700 text-center"
            >
              More Details
            </Link>
          </div>
        </div>
      </div>

      {/* Image Slider Modal */}
      {showImg && (
        <Model onClose={closeModel}>
          <div className="relative w-full h-[60vh] md:h-[80vh] flex justify-center items-center rounded-xl overflow-hidden bg-black/5 dark:bg-white/5">
            {allImages.length > 1 && (
              <button
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center transition-all hover:scale-105 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <FiChevronLeft className="text-2xl" />
              </button>
            )}

            <Image
              src={
                allImages[currentImgIndex].startsWith("/")
                  ? allImages[currentImgIndex]
                  : "/" + allImages[currentImgIndex]
              }
              alt={`${name} image ${currentImgIndex + 1}`}
              fill
              className="object-contain p-2 md:p-8"
              sizes="100vw"
            />

            {allImages.length > 1 && (
              <button
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center transition-all hover:scale-105 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={nextImage}
                aria-label="Next image"
              >
                <FiChevronRight className="text-2xl" />
              </button>
            )}

            {allImages.length > 1 && (
              <div className="absolute bottom-4 md:bottom-6 bg-black/70 text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-widest backdrop-blur-sm">
                {currentImgIndex + 1} / {allImages.length}
              </div>
            )}
          </div>
        </Model>
      )}
    </>
  );
}
