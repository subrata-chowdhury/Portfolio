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
      className="px-6 py-12 md:py-20 max-w-7xl mx-auto w-full mt-10"
      style={containerStyle}
    >
      <div
        className="flex sm:items-center justify-between gap-4 mb-8"
        id="projects"
        ref={forwardRef}
      >
        <div className="flex items-center gap-4 flex-1">
          <h2 className="text-2xl md:text-4xl font-bold font-['Raleway'] text-gray-900 dark:text-gray-100 whitespace-nowrap">
            Projects
          </h2>
          <div className="h-[1px] flex-1 bg-gray-200 dark:bg-gray-800 hidden sm:block" />
        </div>
        <GitHubButton />
      </div>

      <ProjectsContainer
        projectData={showLimited ? projectData.slice(0, 4) : projectData}
      />

      {showSeeMoreBtn && (
        <div className="flex justify-center mt-10">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5 shadow-md hover:shadow-blue-600/20"
          >
            <span>View All Projects</span>
            <FiArrowRight className="text-sm" />
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-2">
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
      className="inline-flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
      href="https://github.com/subrata-chowdhury"
      target="_blank"
      rel="noreferrer"
    >
      <FaGithub className="text-base" />
      <span>GitHub Profile</span>
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
}: ProjectType & { animationDelay: number }) {
  const [showImg, setShowImg] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

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
    setCurrentImgIndex(0);
  };

  return (
    <>
      <div
        className="group flex flex-col bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5"
        style={{ transitionDelay: `${animationDelay}s` }}
      >
        <div
          className="relative w-full aspect-[16/10] cursor-pointer overflow-hidden bg-gray-100 dark:bg-gray-900 border-b border-gray-100 dark:border-white/5"
          onClick={() => setShowImg(true)}
        >
          <Image
            src={"/" + previewImageSrc}
            alt={`${name} project preview`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col p-4 flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <h3 className="font-bold text-[1.15rem] text-gray-900 dark:text-gray-100 leading-tight truncate max-w-full">
              {name}
            </h3>
            {clientProject && (
              <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 text-[0.6rem] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide shrink-0">
                Client
              </span>
            )}
          </div>

          <p className="text-[0.85rem] leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 flex-1">
            {description}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800 mt-auto">
            <div className="flex items-center gap-3">
              {liveUrl && (
                <Link
                  href={liveUrl}
                  target="_blank"
                  className="flex items-center justify-center w-8 h-8 rounded-full dark:bg-gray-800 dark:text-gray-300 bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="View Live Site"
                >
                  <FiExternalLink className="text-sm" />
                </Link>
              )}
              {repoName && (
                <Link
                  href={`https://github.com/subrata-chowdhury/${repoName}`}
                  target="_blank"
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                  aria-label="View Source Code"
                >
                  <FaGithub className="text-sm" />
                </Link>
              )}
            </div>

            <Link
              href={"/projects/" + repoName}
              className="inline-flex items-center gap-1.5 text-[0.8rem] font-bold text-gray-900 dark:text-white group/btn transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              <span>Details</span>
              <FiArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Image Slider Modal (Remains Unchanged) */}
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
