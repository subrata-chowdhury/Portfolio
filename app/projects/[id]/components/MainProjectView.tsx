"use client";
import { SkillsContainer } from "@/app/components/Skills";
import { skillsData } from "@/app/data/skills";
import Arrow from "@/app/Icons/Arrow";
import InternetIcon from "@/app/Icons/Internet";
import Link from "next/link";
import Image from "next/image";
import Gallery from "./Gallery";
import Star from "@/app/Icons/Star"; // Added Star import

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
  ownerDetails, // Added ownerDetails prop
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
    stars?: number; // Optional property for star rating
  };
}) {
  const newSkillsData = [];
  for (let index = 0; index < mainSkills.length; index++) {
    const filterData = skillsData.filter(
      (e) => e.name === mainSkills[index],
    )[0];
    if (filterData) newSkillsData.push(filterData);
  }

  const projectSkills = [];
  for (let index = 0; index < otherSkills.length; index++) {
    const filterData = skillsData.filter(
      (e) => e.name === otherSkills[index],
    )[0];
    if (filterData) projectSkills.push(filterData);
    else
      projectSkills.push({
        name: otherSkills[index],
        iconSrc: "/icons/skill.webp",
        id: otherSkills[index].toLowerCase().split(" ").join("-"),
        lvl: 1,
      });
  }

  return (
    <>
      <div className="detailed-project-view-container">
        <div className="left-side">
          <div
            style={{
              paddingBottom: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <h1 className="heading" style={{ marginBottom: 0 }}>
              {name}
            </h1>
            <div
              style={{
                fontSize: "0.85rem",
                color: "var(--heading-color)",
                marginTop: "0.2rem",
              }}
            >
              {createdAt && updatedAt
                ? `${new Date(createdAt).toDateString()} - ${new Date(updatedAt).toDateString()}`
                : "Timeline: N/A (Private Repository)"}
            </div>
          </div>

          <div className="project-description">{description}</div>

          <h2 className="heading">Teach Stack</h2>
          <SkillsContainer skillsData={newSkillsData} />

          <h2 className="heading">Skills</h2>
          <SkillsContainer skillsData={projectSkills} />

          <div
            className="project-link-container"
            style={{ marginTop: "2rem", justifyContent: "start", gap: "1rem" }}
          >
            {liveUrl && (
              <Link
                href={liveUrl}
                className="link-container liveurl-container"
                style={{ padding: "0.7rem  1rem" }}
                target="_blank"
              >
                <div className="project-link" style={{ fontSize: "1rem" }}>
                  Live Demo
                </div>
                <InternetIcon size={18} />
              </Link>
            )}
            {noOfCommits !== null && (noOfCommits || 0) > 0 && (
              <Link
                className="link-container liveurl-container"
                style={{ padding: "0.7rem  1rem" }}
                target="_blank"
                href={
                  repoName ? `https://github.com/Super7000/${repoName}` : ""
                }
              >
                <div className="project-link">
                  {repoName ? "View in Github" : "View Here"}
                </div>
                <Arrow />
              </Link>
            )}
          </div>

          {/* Render Owner Feedback if it exists */}
          {ownerDetails && (
            <div className="project-owner-feedback-card">
              <div className="feedback-header">
                <div className="feedback-avatar">
                  {ownerDetails.name.charAt(0)}
                </div>
                <div className="feedback-info">
                  <div className="feedback-client-name">
                    {ownerDetails.name}
                  </div>
                  <div className="feedback-company">{ownerDetails.role}</div>
                </div>
              </div>
              {ownerDetails.stars !== undefined && (
                <div
                  className="feedback-stars"
                  aria-label={`Rating: ${ownerDetails.stars} out of 5`}
                >
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      filled={index < (ownerDetails?.stars || 5)}
                    />
                  ))}
                </div>
              )}
              <p className="feedback-text">
                &quot;{ownerDetails.feedback}&quot;
              </p>
            </div>
          )}
        </div>

        <div className="right-side">
          <div className="project-commit-details-container">
            <b>No of Commits: </b>
            {noOfCommits !== null && (noOfCommits || 0) > 0
              ? noOfCommits
              : "N/A (Private Repository)"}
          </div>

          {previewUiImages.length > 0 && <Gallery images={previewUiImages} />}

          {previewImageSrc && (
            <div className="detailed-main-image-container">
              <Image
                src={"/" + previewImageSrc}
                alt={`${name} Main Preview`}
                width={800}
                height={450}
                className="detailed-main-image"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
