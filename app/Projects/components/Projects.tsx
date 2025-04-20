'use client'
import "../style.css"
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
}

export default function Projects({ showLimited = true, showSeeMoreBtn = true, forwardRef = null }: ProjectsProps) {
    return (
        <>
            <div className="screen-container" style={{ marginTop: '6rem' }}>
                <div className="heading" id="projects" ref={forwardRef}>
                    <div>My Projects</div>
                    <GitHubButton />
                </div>

                <ProjectsContainer projectData={showLimited ? projectData.slice(0, 4) : projectData} />

                {showSeeMoreBtn &&
                    <div className="see-more-btn-container">
                        <Link href={"/Projects"} className="btn">View All Projects</Link>
                    </div>}
            </div>
        </>
    )
}

export function ProjectsContainer({ projectData = [] }: { projectData: ProjectType[] }) {
    return (
        <div className="projects-container">
            {projectData.length > 0 ?
                projectData.map((project, index) => (
                    <Project
                        key={index}
                        {...project}
                        animationDelay={index / 10} />
                ))
                : <div className="no-projects">No Projects Available</div>}
        </div>
    )
}

export function GitHubButton() {
    return (
        <a className="github-page-btn btn" href="https://github.com/subrata-chowdhury">
            <GitHub /> {/* icon */}
            <div>View My Github Page</div>
        </a>
    )
}

export function Project({
    name = "Name",
    repoName = "Repo-Name",
    description = "It's a Project",
    previewImageSrc = "",
    liveUrl,

    animationDelay = 0
}: {
    name: string;
    repoName: string;
    description: string;
    noOfCommits: number | null;
    createdAt: string | null;
    updatedAt: string | null;
    mainSkills: string[];
    otherSkills: string[];
    previewImageSrc: string;
    liveUrl?: string;
    animationDelay: number;
}) {
    const [showAbout, setShowAbout] = useState(false)
    const [showImg, setShowImg] = useState(false)

    return (
        <>
            <div className="project-container" style={{ animationDelay: animationDelay + 's' }}>
                <div className="project-image" onClick={() => {
                    setShowImg(true)
                }}>
                    <Image src={"/" + previewImageSrc} alt="project image" width={600} height={600} />
                </div>
                <div className="details">
                    <div className="project-name">{name}</div>
                    <div className="about-project" onClick={() => { setShowAbout(val => !val) }}>
                        {(description.length > 70 && !showAbout) ? description.slice(0, 65) + '... ' : description}
                        {(description.length > 70 && !showAbout) && <span className="read-more-btn">read more</span>}
                    </div>
                    <div className="project-link-container">
                        {liveUrl ?
                            <Link href={liveUrl} className="link-container liveurl-container" target="_blank">
                                <div className="project-link">Live Demo</div>
                                <InternetIcon />
                            </Link> :
                            <Link className="link-container" target="_blank" href={(repoName ? `https://github.com/Super7000/${repoName}` : "")}>
                                <div className="project-link">{repoName ? "View in Github" : "View Here"}</div>
                                <Arrow />
                            </Link>}
                        <Link href={'/Projects/' + repoName} className="more-details btn">More Details</Link>
                    </div>
                </div>
            </div>

            {showImg && <Model onClose={() => setShowImg(false)}>
                <div style={{ width: '100%', height: '100%', alignSelf: 'center', overflowY: 'auto', borderRadius: '1rem' }}>
                    <img src={'/' + previewImageSrc} style={{ width: "100%", borderRadius: '1rem' }} alt="project image" />
                </div>
            </Model>}
        </>
    )
}