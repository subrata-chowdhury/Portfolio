import { Link } from "react-router-dom";
import "../style/projects.css"
import { useState } from "react";
import GitHub from "../Icons/Social Media/GitHub";
import Arrow from "../Icons/Arrow";
import { SkillsContainer, skillsData } from "./Skills";
import Cross from "../Icons/cross";
import Loader from "./Loader";

const projectData = [{
    name: "To Dos",
    repoName: "To-Do-List",
    description: "It's a Full Stack To Do List Web Application created using React, Bootstrap 5, CSS, HTML in Frontend and Node.js with Express library as Backend and MySQL as Database.",
    noOfCommits: null,
    createdAt: null,
    updatedAt: null,
    mainSkills: ["HTML", "CSS", "JavaScript", "Node.js", "React", "Bootstrap 5", "MySQL"],
    otherSkills: ["Web Development", "Responsive Web Design", "Frontend Development", "ExpressJS", "JSON Web Token (JWT)", "REST API"],
    previewImageSrc: "assets/To Dos.png"
}, {
    name: "Bike Rental System",
    repoName: "Bike-Rental-System",
    description: "It is a Full Stack Bike Rental System Web Application created using ReactJS, Bootstrap 5, CSS, HTML as Frontend and Node.js with Express, Mongoose library as Backend and MongoDB as Database and TypeScript in both side.",
    noOfCommits: null,
    createdAt: null,
    updatedAt: null,
    mainSkills: ["HTML", "CSS", "JavaScript", "TypeScript", "Node.js", "React", "Bootstrap 5", "MongoDB"],
    otherSkills: ["Web Development", "Graphic Design", "Web Design", "Web Applications", "GitHub", "Responsive Web Design", "Frontend Development", "REST API", "Express.js", "JSON Web Token (JWT)"],
    previewImageSrc: "assets/Bike Rental System.png"
}, {
    name: "ATG World",
    repoName: "ATG_World",
    description: "It's a project contains a fully responsive webpage created using HTML, CSS and JavaScript.",
    noOfCommits: null,
    createdAt: null,
    updatedAt: null,
    mainSkills: ["HTML", "CSS", "JavaScript"],
    otherSkills: ["Figma", "Responsive Web Design", "Frontend Development", "Firebase"],
    previewImageSrc: "assets/ATG World Croped.png"
}, {
    name: "Time Table Scheduler",
    repoName: "Time-Table-Scheduler-ReactJS",
    description: "It's a web application UI created using React through which a Time Table can be created manually and also automatically using AI.",
    noOfCommits: null,
    createdAt: null,
    updatedAt: null,
    mainSkills: ["HTML", "CSS", "JavaScript", "TypeScript", "React"],
    otherSkills: ["REST API", "Graphic Design", "Responsive Web Design", "Frontend Development", "Problem Solving", "Teamwork", "Web Development"],
    previewImageSrc: "assets/Time_Table_Scheduler.png"
}, {
    name: "Scroll Effect",
    repoName: "Scroll_Effect",
    description: "This is a webpage which is focused on scrolling animation created using HTML, CSS and JS.",
    noOfCommits: null,
    createdAt: null,
    updatedAt: null,
    mainSkills: ["HTML", "CSS", "JavaScript"],
    otherSkills: ["Figma", "Responsive Web Design", "Frontend Development", "Problem Solving"],
    previewImageSrc: "assets/Scroll Effect.png"
}, {
    name: "Google Search Page",
    repoName: "Google_Themed_Landing_Page",
    description: "It's a mimic of Google search engine webpage which allow more customize feature.",
    noOfCommits: null,
    createdAt: null,
    updatedAt: null,
    mainSkills: ["HTML", "CSS", "JavaScript"],
    otherSkills: ["Graphic Design", "Responsive Web Design", "Frontend Development", "Problem Solving"],
    previewImageSrc: "assets/Google Search Page.png"
}, {
    name: "Focus",
    repoName: "Focus",
    description: "This is a landing page created using HTML, CSS & JS. It's provide a feature like fully custom theme, bookmark, search bar (use Google search engine) and some simple apps like calculator, live weather broadcast etc.",
    noOfCommits: null,
    createdAt: null,
    updatedAt: null,
    mainSkills: ["HTML", "CSS", "JavaScript"],
    otherSkills: ["Graphic Design", "Responsive Web Design", "Frontend Development", "Problem Solving", "Teamwork"],
    previewImageSrc: "assets/Focus.png"
}, {
    name: "A Music Player",
    repoName: "A-Music-Player",
    description: "It's a simple music player UI created using React and redux.",
    noOfCommits: null,
    createdAt: null,
    updatedAt: null,
    mainSkills: ["HTML", "CSS", "JavaScript"],
    otherSkills: ["React", "Redux", "Graphic Design", "Responsive Web Design", "Frontend Development", "Problem Solving"],
    previewImageSrc: "assets/A Music Player.png"
}, {
    name: "Menubar Style",
    repoName: "Menubar-Style",
    description: "It is a website created using HTML, CSS and JavaScript which is mainly focused on menubar style.",
    noOfCommits: null,
    createdAt: null,
    updatedAt: null,
    mainSkills: ["HTML", "CSS", "JavaScript"],
    otherSkills: ["Responsive Web Design", "Frontend Development", "Problem Solving"],
    previewImageSrc: "assets/Menubar_Style.png"
}, {
    name: "List of All Doraemon Movies",
    repoName: "All_Doraemon_Movies-v3.5",
    description: "It a webpage that contains list of all doraemon movies created using HTML, CSS & a little bit JS. It was created by me in 11th when I started learning frontend development.",
    noOfCommits: null,
    createdAt: null,
    updatedAt: null,
    mainSkills: ["HTML", "CSS", "JavaScript"],
    otherSkills: ["Graphic Design", "Responsive Web Design", "Frontend Development"],
    previewImageSrc: "assets/All Doraemon Movies.png"
}]

export const projectCount = projectData.length;

export default function Projects({ showLimited = true, showSeeMoreBtn = true }) {
    return (
        <>
            <div className="screen-container">
                <div className="heading" id="project">
                    <div>My Projects</div>
                    <GitHubButton />
                </div>

                <ProjectsContainer projectData={showLimited ? projectData.slice(0, 4) : projectData} />

                {showSeeMoreBtn &&
                    <div className="see-more-btn-container">
                        <Link to={"/Projects"} className="btn">See More</Link>
                    </div>}
            </div>
        </>
    )
}

function ProjectsContainer({ projectData = [] }) {
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
    const [showImgOnly, setShowImgOnly] = useState(false)

    return (
        <>
            {showLoader && <Loader />}

            <div className="project-container" style={{ animationDelay: animationDelay + 's' }}>
                <div className="project-image" onClick={() => {
                    setShowImgOnly(true)
                    setShowDetailsPopUp(true)
                }}>
                    <img src={previewImageSrc} alt="project image" />
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
                                setShowImgOnly(false)
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

            {showDetailsPopUp && <DetailedProjectView
                showImgOnly={showImgOnly}
                {...projectDetails}
                onClose={() => setShowDetailsPopUp(false)} />}
        </>
    )
}

function DetailedProjectView({
    name = "Name",
    repoName = "Repo-Name",
    description = "It's a Project",
    noOfCommits,
    createdAt,
    updatedAt,
    mainSkills = [],
    otherSkills = [],
    previewImageSrc = '',

    showImgOnly = true,
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
            iconSrc: "./icons/skill.png",
            id: otherSkills[index].toLowerCase().split(' ').join('-'),
            lvl: 1
        })
    }

    return (
        <>
            <div className="close-detailed-project-view-btn active" onClick={onClose}>
                <Cross />
            </div>
            <div className="detailed-project-view-container active" style={{ gridTemplateColumns: showImgOnly ? "auto" : "70% auto" }}>
                {!showImgOnly &&
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
                    </>}

                {showImgOnly &&
                    <div style={{ width: '100%', height: '100vh', alignSelf: 'center', overflowY: 'auto' }}>
                        <img src={previewImageSrc} style={{ width: "100%" }} alt="project image" />
                    </div>}
            </div>
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
            break;
        }
        pageCount++
    }
    return { totalNoOfCommits, updatedAt, createdAt }
}