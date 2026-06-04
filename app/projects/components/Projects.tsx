"use client";
import "../style.css";
import { useState } from "react";
import GitHub from "@/app/Icons/Social Media/GitHub";
import Arrow from "@/app/Icons/Arrow";
import { projectsData as projectData, ProjectType } from "@/app/data/projects";
import Model from "@/app/components/Model";
import Link from "next/link";
import Image from "next/image";
import InternetIcon from "@/app/Icons/Internet";

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
    <>
      <section
        className="screen-container"
        style={{ marginTop: "6rem", ...containerStyle }}
      >
        <h1 className="heading" id="projects" ref={forwardRef}>
          Projects
          <GitHubButton />
        </h1>

        <ProjectsContainer
          projectData={showLimited ? projectData.slice(0, 4) : projectData}
        />

        {showSeeMoreBtn && (
          <div className="see-more-btn-container">
            <Link href={"/projects"} className="btn">
              View All Projects
            </Link>
          </div>
        )}
      </section>
    </>
  );
}

export function ProjectsContainer({
  projectData = [],
}: {
  projectData: ProjectType[];
}) {
  return (
    <div className="projects-container">
      {projectData.length > 0 ? (
        projectData.map((project, index) => (
          <Project key={index} {...project} animationDelay={index / 10} />
        ))
      ) : (
        <div className="no-projects">No Projects Available</div>
      )}
    </div>
  );
}

export function GitHubButton() {
  return (
    <a
      className="github-page-btn btn"
      href="https://github.com/subrata-chowdhury"
    >
      <GitHub /> {/* icon */}
      <div>View My Github Page</div>
    </a>
  );
}

export function Project({
  name = "Name",
  repoName = "Repo-Name",
  description = "It's a Project",
  clientProject = false,
  noOfCommits,
  createdAt,
  updatedAt,
  mainSkills,
  otherSkills,
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
        className="project-container"
        style={{ animationDelay: animationDelay + "s" }}
      >
        <div
          className="project-image"
          onClick={() => {
            setShowImg(true);
          }}
        >
          <Image
            src={"/" + previewImageSrc}
            alt={`${name} project image`}
            width={600}
            height={600}
          />
        </div>
        <div className="details">
          <div className="project-name-wrapper">
            <div className="project-name">{name}</div>
            {/* Small Inline Badge for the Title Area */}
            {clientProject && (
              <span className="client-badge-inline">Client</span>
            )}
          </div>
          <div
            className="about-project"
            onClick={() => {
              setShowAbout((val) => !val);
            }}
          >
            {description.length > 70 && !showAbout
              ? description.slice(0, 65) + "... "
              : description}
            {description.length > 70 && !showAbout && (
              <span className="read-more-btn">read more</span>
            )}
          </div>
          <div className="project-link-container">
            {liveUrl ? (
              <Link
                href={liveUrl}
                className="link-container liveurl-container"
                target="_blank"
              >
                <div className="project-link">Live Demo</div>
                <InternetIcon />
              </Link>
            ) : (
              <Link
                className="link-container"
                target="_blank"
                href={
                  repoName
                    ? `https://github.com/subrata-chowdhury/${repoName}`
                    : ""
                }
              >
                <div className="project-link">
                  {repoName ? "View in Github" : "View Here"}
                </div>
                <Arrow size={12} />
              </Link>
            )}
            <Link href={"/projects/" + repoName} className="more-details btn">
              More Details
            </Link>
          </div>
        </div>
      </div>

      {showImg && (
        <Model onClose={closeModel}>
          <div className="slider-wrapper">
            {allImages.length > 1 && (
              <button className="slider-btn prev" onClick={prevImage}>
                &#10094;
              </button>
            )}

            <img
              src={
                allImages[currentImgIndex].startsWith("/")
                  ? allImages[currentImgIndex]
                  : "/" + allImages[currentImgIndex]
              }
              className="slider-image"
              alt={`${name} image ${currentImgIndex + 1}`}
            />

            {allImages.length > 1 && (
              <button className="slider-btn next" onClick={nextImage}>
                &#10095;
              </button>
            )}

            {allImages.length > 1 && (
              <div className="slider-indicator">
                {currentImgIndex + 1} / {allImages.length}
              </div>
            )}
          </div>
        </Model>
      )}
    </>
  );
}
