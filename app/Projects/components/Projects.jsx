import "../style.css"
import { useState } from "react";
import GitHub from "@/app/Icons/Social Media/GitHub";
import Arrow from "@/app/Icons/Arrow";
import { SkillsContainer } from "@/app/components/Skills";
import { skillsData } from "@/app/data/skills";
import Loader from "@/app/loading";
import { projectsData as projectData } from "@/app/data/projects";
import Model from "@/app/components/Model";
import Link from "next/link";
import Image from "next/image";

export default function Projects({ showLimited = true, showSeeMoreBtn = true, forwardRef = null }) {
    return (
        <>
            <div className="screen-container">
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

export function ProjectsContainer({ projectData = [] }) {
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
        <a className="github-page-btn btn" href="https://github.com/Super7000">
            <GitHub /> {/* icon */}
            <div>View My Github Page</div>
        </a>
    )
}

export function Project({
    name = "Name",
    repoName = "Repo-Name",
    description = "It's a Project",
    noOfCommits = null,
    createdAt = null,
    updatedAt = null,
    mainSkills = [],
    otherSkills = [],
    previewImageSrc = "",

    animationDelay = 0
}) {
    const [showLoader, setShowLoader] = useState(false)
    const [showAbout, setShowAbout] = useState(false)
    const [showDetailsPopUp, setShowDetailsPopUp] = useState(false)
    const [projectDetails, setProjectDetails] = useState({
        name,
        repoName,
        description,
        noOfCommits,
        createdAt,
        updatedAt,
        mainSkills,
        otherSkills,
        previewImageSrc
    })
    const [showImg, setShowImg] = useState(false)

    return (
        <>
            {showLoader && <Loader />}

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
                        <a className="link-container" target="_blank" href={(repoName ? `https://github.com/Super7000/${repoName}` : "")}>
                            <div className="project-link">{repoName ? "View in Github" : "View Here"}</div>
                            <Arrow />
                        </a>
                        <div className="more-details btn" onClick={async () => {
                            try {
                                setShowLoader(true)
                                if (projectDetails.createdAt === null || projectDetails.createdAt === '') {
                                    let { noOfCommits, updatedAt, createdAt } = await fetchLatestData(repoName)
                                    setProjectDetails(val => { return { ...val, noOfCommits, updatedAt, createdAt } })
                                }
                                setShowDetailsPopUp(true)
                            } catch (error) {
                                console.log("can't fetch project commit details", error)
                            } finally {
                                setShowLoader(false)
                            }
                        }}>More Details</div>
                    </div>
                </div>
            </div>

            {showImg && <Model onClose={() => setShowImg(false)}>
                <div style={{ width: '100%', height: '100%', alignSelf: 'center', overflowY: 'auto', borderRadius: '1rem' }}>
                    <img src={previewImageSrc} style={{ width: "100%", borderRadius: '1rem' }} alt="project image" />
                </div>
            </Model>}

            {showDetailsPopUp && <DetailedProjectView
                {...projectDetails}
                onClose={() => setShowDetailsPopUp(false)} />}
        </>
    )
}

function DetailedProjectView({
    name = "Name",
    repoName,
    description = "It's a Project",
    noOfCommits,
    createdAt,
    updatedAt,
    mainSkills = [],
    otherSkills = [],
    previewImageSrc = '',

    onClose = () => { }
}) {
    let newSkillsData = [];
    for (let index = 0; index < mainSkills.length; index++) {
        let filterData = skillsData.filter(e => e.name === mainSkills[index])[0]
        filterData ? newSkillsData.push(filterData) : ""
    }

    let projectSkills = [];
    for (let index = 0; index < otherSkills.length; index++) {
        let filterData = skillsData.filter(e => e.name === otherSkills[index])[0]
        if (filterData)
            projectSkills.push(filterData)
        else projectSkills.push({
            name: otherSkills[index],
            iconSrc: "/icons/skill.webp",
            id: otherSkills[index].toLowerCase().split(' ').join('-'),
            lvl: 1
        })
    }

    return (
        <>
            <Model onClose={onClose} className="detailed-project-view-container">
                    <>
                        <div className="left-side">
                            <div className="heading">{name}</div>
                            <div className="project-description">{description}</div>
                            <div className="heading">Main Skills</div>
                            <SkillsContainer hideLevel={true} skillsData={newSkillsData} excludeIds={true} />
                            <div className="heading">Other Skills</div>
                            <SkillsContainer hideLevel={true} skillsData={projectSkills} excludeIds={true} />
                        </div>
                        <div className="right-side">
                            {createdAt && <div className="project-commit-details-container"><b>Created At: </b>{createdAt}</div>}
                            {updatedAt && <div className="project-commit-details-container"><b>Updated At: </b>{updatedAt}</div>}
                            {noOfCommits && (noOfCommits > 0) && <div className="project-commit-details-container"><b>No of Commits: </b>{noOfCommits}</div>}
                        </div>
                    </>
            </Model>
        </>
    )
}

async function fetchLatestData(repoName) {
    let totalNoOfCommits = 0
    let updatedAt, createdAt;

    let pageCount = 1
    let noOfCommits = null;
    while (noOfCommits === null || noOfCommits === 100) {
        let response = await fetch(`https://api.github.com/repos/Super7000/${repoName}/commits?per_page=100&page=${pageCount}`)
        if (response.status === 200) {
            const commitDetails = await response.json();
            noOfCommits = await commitDetails.length
            if (await noOfCommits === 0) break
            totalNoOfCommits += await noOfCommits;
            if (pageCount === 1)
                updatedAt = new Date(commitDetails[0].commit.committer.date).toUTCString();
            createdAt = new Date(commitDetails[(await noOfCommits - 1)].commit.committer.date).toUTCString();
        } else {
            throw response.body
        }
        pageCount++
    }
    return { totalNoOfCommits, updatedAt, createdAt }
}