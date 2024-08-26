import { Link } from "react-router-dom";
import "../style/projects.css"
import { useRef, useState } from "react";
import GitHub from "../Icons/Social Media/GitHub";
import Arrow from "../Icons/Arrow";
import { SkillsContainer, skillsData } from "./Skills";
import Cross from "../Icons/cross";
import Loader from "./Loader";

const projectData = [{
    previewImageSrc: "assets/To Dos.png",
    name: "To Dos",
    about: "It is a Full Stack To Do List Web Application created using React, Bootstrap 5, CSS, HTML in Frontend and Node.js with Express library as Backend and MySQL as Database.",

    repoName: "To-Do-List"
}, {
    previewImageSrc: "assets/Bike Rental System.png",
    name: "Bike Rental System",
    about: "It is a Full Stack Bike Rental System Web Application created using ReactJS, Bootstrap 5, CSS, HTML as Frontend and Node.js with Express, Mongoose library as Backend and MongoDB as Database and TypeScript in both side.",

    repoName: "Bike-Rental-System"
}, {
    previewImageSrc: "assets/ATG World Croped.png",
    name: "ATG World",
    about: "It's a project contains a fully responsive webpage created using HTML, CSS and JavaScript.",

    repoName: "ATG_World"
}, {
    previewImageSrc: "assets/Time_Table_Scheduler.png",
    name: "Time Table Scheduler",
    about: "It's a web application UI created using React through which a Time Table can be created manually and also automatically using AI.",

    repoName: "Time-Table-Scheduler-ReactJS"
}, {
    previewImageSrc: "assets/Scroll Effect.png",
    name: "Scroll Effect",
    about: "This is a webpage which is focused on scrolling animation created using HTML, CSS and JS.",

    repoName: "Scroll_Effect"
}, {
    previewImageSrc: "assets/Google Search Page.png",
    name: "Google Search Page",
    about: "It's a mimic of Google search engine webpage which allow more customize feature.",

    repoName: "Google_Themed_Landing_Page"
}, {
    previewImageSrc: "assets/Focus.png",
    name: "Focus",
    about: "This is a landing page created using HTML, CSS & JS. It's provide a feature like fully custom theme, bookmark, search bar (use Google search engine) and some simple apps like calculator, live weather broadcast etc.",

    repoName: "Focus"
}, {
    previewImageSrc: "assets/A Music Player.png",
    name: "A Music Player",
    about: "It's a simple music player UI created using React and redux.",

    repoName: "A-Music-Player"
}, {
    previewImageSrc: "assets/Menubar_Style.png",
    name: "Menubar Style",
    about: "It is a website created using HTML, CSS and JavaScript which is mainly focused on menubar style.",

    repoName: "Menubar-Style"

}, {
    previewImageSrc: "assets/All Doraemon Movies.png",
    name: "List of All Doraemon Movies",
    about: "It a webpage that contains list of all doraemon movies created using HTML, CSS & a little bit JS. It was created by me in 11th when I started learning frontend development.",

    repoName: "All_Doraemon_Movies-v3.5"
}]

let moreProjectData = [{
    name: "Bike Rental System",
    mainSkills: ["HTML", "CSS", "JavaScript", "TypeScript", "Node.js", "React", "Bootstrap 5", "MongoDB"],
    otherSkills: ["Web Development", "Graphic Design", "Web Design", "Web Applications", "GitHub", "Responsive Web Design", "Frontend Development", "REST API", "Express.js", "JSON Web Token (JWT)"],
    createdAt: null,
    noOfCommits: null,
    updatedAt: null,
}, {
    name: "To Dos",
    mainSkills: ["HTML", "CSS", "JavaScript", "Node.js", "React", "Bootstrap 5", "MySQL"],
    otherSkills: ["Web Development", "Responsive Web Design", "Frontend Development", "ExpressJS", "JSON Web Token (JWT)", "REST API"],
    createdAt: null,
    noOfCommits: null,
    updatedAt: null,
}, {
    name: "ATG World",
    mainSkills: ["HTML", "CSS", "JavaScript"],
    otherSkills: ["Figma", "Responsive Web Design", "Frontend Development", "Firebase"],
    createdAt: null,
    noOfCommits: null,
    updatedAt: null,
}, {
    name: "Time Table Creator",
    mainSkills: ["HTML", "CSS", "JavaScript", "React"],
    otherSkills: ["REST API", "Graphic Design", "Responsive Web Design", "Frontend Development", "Problem Solving", "Teamwork", "Web Development"],
    createdAt: null,
    noOfCommits: null,
    updatedAt: null,
}, {
    name: "Scroll Effect",
    mainSkills: ["HTML", "CSS", "JavaScript"],
    otherSkills: ["Figma", "Responsive Web Design", "Frontend Development", "Problem Solving"],
    createdAt: null,
    noOfCommits: null,
    updatedAt: null,
}, {
    name: "Google Search Page",
    mainSkills: ["HTML", "CSS", "JavaScript"],
    otherSkills: ["Graphic Design", "Responsive Web Design", "Frontend Development", "Problem Solving"],
    createdAt: null,
    noOfCommits: null,
    updatedAt: null,
}, {
    name: "Focus",
    mainSkills: ["HTML", "CSS", "JavaScript"],
    otherSkills: ["Graphic Design", "Responsive Web Design", "Frontend Development", "Problem Solving", "Teamwork"],
    createdAt: null,
    noOfCommits: null,
    updatedAt: null,
}, {
    name: "A Music Player",
    mainSkills: ["HTML", "CSS", "JavaScript"],
    otherSkills: ["React", "Redux", "Graphic Design", "Responsive Web Design", "Frontend Development", "Problem Solving"],
    createdAt: null,
    noOfCommits: null,
    updatedAt: null,
}, {
    name: "Menubar Style",
    mainSkills: ["HTML", "CSS", "JavaScript"],
    otherSkills: ["Responsive Web Design", "Frontend Development", "Problem Solving"],
    createdAt: null,
    noOfCommits: null,
    updatedAt: null,
}, {
    name: "List of All Doraemon Movies",
    mainSkills: ["HTML", "CSS", "JavaScript"],
    otherSkills: ["Graphic Design", "Responsive Web Design", "Frontend Development"],
    createdAt: null,
    noOfCommits: null,
    updatedAt: null,
}]

export const projectCount = projectData.length || moreProjectData.length

export default function Projects({ showLimited = true, showSeeMoreBtn = true }) {
    const [projectDetails, setProjectDetails] = useState({
        name: "Name",
        repoName: "Repo-Name",
        description: "It's a Project",
        noOfCommits: null,
        createdAt: null,
        updatedAt: null,
        mainSkills: [],
        otherSkills: [],
        previewImageSrc: "",
    })
    const [displayLoader, setDisplayLoader] = useState(false)
    const [showDetailsPopUp, setShowDetailsPopUp] = useState(false)
    const [showImgOnly, setShowImgOnly] = useState(false)

    async function fetchProjectDetails(repoName) {
        let newProjectDetails = {
            name: "Name",
            repoName: "Repo-Name",
            description: "It's a Project",
            noOfCommits: null,
            createdAt: null,
            updatedAt: null,
            mainSkills: [],
            otherSkills: [],
            previewImageSrc: ""
        }
        const selectedProjectData = projectData.filter(e => e.repoName === repoName)[0]

        let moreProjectDataIndex = null;
        for (let index = 0; index < moreProjectData.length; index++) {
            if (moreProjectData[index].name === selectedProjectData.name) {
                moreProjectDataIndex = index;
                break;
            }
        }
        newProjectDetails.repoName = selectedProjectData.repoName;
        newProjectDetails.description = selectedProjectData.about;
        newProjectDetails = { ...newProjectDetails, ...moreProjectData[moreProjectDataIndex] }

        //fetching commit details
        try {
            if (newProjectDetails.createdAt === null || newProjectDetails.createdAt === '') {
                setDisplayLoader(true)
                let pageCount = 1
                let noOfCommits = null;
                while (noOfCommits === null || noOfCommits === 100) {
                    let response = await fetch(`https://api.github.com/repos/Super7000/${repoName}/commits?per_page=100&page=${pageCount}`)
                    if (response.status === 200) {
                        const commitDetails = await response.json();
                        noOfCommits = await commitDetails.length
                        if (await noOfCommits === 0) break
                        moreProjectData[moreProjectDataIndex].noOfCommits += await noOfCommits;
                        newProjectDetails.noOfCommits += await noOfCommits;
                        if (pageCount === 1)
                            moreProjectData[moreProjectDataIndex].updatedAt = newProjectDetails.updatedAt = new Date(commitDetails[0].commit.committer.date).toUTCString();
                        moreProjectData[moreProjectDataIndex].createdAt = newProjectDetails.createdAt = new Date(commitDetails[(await noOfCommits - 1)].commit.committer.date).toUTCString();
                    } else {
                        break;
                    }
                    pageCount++
                }
                setShowDetailsPopUp(true)
            } else {
                setShowDetailsPopUp(false)
            }
        } catch (error) {
            console.error("can't fetch project commit details")
        } finally {
            setDisplayLoader(false)
        }
        setProjectDetails(newProjectDetails)
        setShowImgOnly(false)
    }

    return (
        <>
            <Loader display={displayLoader} />
            {showDetailsPopUp && <DetailedProjectView showImgOnly={showImgOnly} projectDetails={projectDetails} onClose={() => setShowDetailsPopUp(false)} />}
            <div className="screen-container">
                <div className="heading" id="project">
                    <div>My Projects</div>
                    <GitHubButton />
                </div>
                <ProjectsContainer showLimited={showLimited} moreDetailsOfProjectBtnClickHandler={fetchProjectDetails} onImageClick={repoName => {
                    setProjectDetails(val => { return { ...val, previewImageSrc: projectData.filter(e => e.repoName === repoName)[0].previewImageSrc } })
                    setShowDetailsPopUp(true)
                    setShowImgOnly(true)
                }} />
                {showSeeMoreBtn && (<div className="see-more-btn-container">
                    <Link to={"/Projects"} className="btn">See More</Link>
                </div>)}
            </div>
        </>
    )
}

function ProjectsContainer({ showLimited = true, moreDetailsOfProjectBtnClickHandler = () => { }, onImageClick = () => { } }) {
    let projectElement = [];
    for (let index = 0; index < (showLimited ? 4 : projectData.length); index++) {
        projectElement.push(
            <Project
                previewImageSrc={projectData[index].previewImageSrc}
                name={projectData[index].name}
                about={projectData[index].about}
                key={projectData[index].name}
                repoName={projectData[index].repoName}
                link={projectData[index].link ? projectData[index].link : null}
                moreDetailsOfProjectBtnClickHandler={moreDetailsOfProjectBtnClickHandler}
                onImageClick={onImageClick}
                animationDelay={index / 10} />
        )
    }
    return (
        <div className="projects-container">
            {projectElement}
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
    previewImageSrc = "assets/ATG World Croped.png",
    name = "ATG World",
    about = "It's a project contains a fully responsive webpage created using HTML, CSS and JavaScript.",
    repoName,
    link,
    moreDetailsOfProjectBtnClickHandler = () => { },
    onImageClick = () => { },

    animationDelay = 0
}) {
    const [showAbout, setShowAbout] = useState(false)
    return (
        <div className="project-container" style={{ animationDelay: animationDelay + 's' }}>
            <div className="project-image" onClick={e => onImageClick(repoName)}>
                <img src={previewImageSrc} alt="project image" />
            </div>
            <div className="details">
                <div className="project-name">{name}</div>
                <div className="about-project" onClick={() => { setShowAbout(val => !val) }}>
                    {(about.length > 70 && !showAbout) ? about.slice(0, 65) + '... ' : about}
                    {(about.length > 70 && !showAbout) && <span className="read-more-btn">read more</span>}
                </div>
                <div className="project-link-container">
                    <a className="link-container" target="_blank" href={(repoName ? `https://github.com/Super7000/${repoName}` : link)}>
                        <div className="project-link">{repoName ? "View in Github" : "View Here"}</div>
                        <Arrow />
                    </a>
                    <div className="more-details btn" onClick={() => moreDetailsOfProjectBtnClickHandler(repoName)}>More Details</div>
                </div>
            </div>
        </div>
    )
}

function DetailedProjectView({ projectDetails = {
    name: "Name",
    repoName: "Repo-Name",
    description: "It's a Project",
    noOfCommits,
    createdAt,
    updatedAt,
    mainSkills: [],
    otherSkills: [],
    previewImageSrc: ''
}, showImgOnly = true, onClose = () => { } }) {

    let newSkillsData = [];
    for (let index = 0; index < projectDetails.mainSkills.length; index++) {
        let filterData = skillsData.filter(e => e.name === projectDetails.mainSkills[index])[0]
        filterData ? newSkillsData.push(filterData) : ""
    }

    let projectSkills = [];
    for (let index = 0; index < projectDetails.otherSkills.length; index++) {
        let filterData = skillsData.filter(e => e.name === projectDetails.otherSkills[index])[0]
        if (filterData)
            projectSkills.push(filterData)
        else projectSkills.push({
            name: projectDetails.otherSkills[index],
            iconSrc: "./icons/skill.png",
            id: projectDetails.otherSkills[index].toLowerCase().split(' ').join('-'),
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
                            <div className="heading">{projectDetails.name}</div>
                            <div className="project-description">{projectDetails.description}</div>
                            <div className="heading">Main Skills</div>
                            <SkillsContainer hideLevel={true} skillsData={newSkillsData} excludeIds={true} />
                            <div className="heading">Other Skills</div>
                            <SkillsContainer hideLevel={true} skillsData={projectSkills} excludeIds={true} />
                        </div>
                        <div className="right-side">
                            {projectDetails.createdAt && <div className="project-commit-details-container"><b>Created At: </b>{projectDetails.createdAt}</div>}
                            {projectDetails.updatedAt && <div className="project-commit-details-container"><b>Updated At: </b>{projectDetails.updatedAt}</div>}
                            {projectDetails.noOfCommits && (projectDetails.noOfCommits > 0) && <div className="project-commit-details-container"><b>No of Commits: </b>{projectDetails.noOfCommits}</div>}
                        </div>
                    </>}
                {showImgOnly &&
                    <div style={{ width: '100%', height: '100vh', alignSelf: 'center', overflowY: 'auto' }}>
                        <img src={projectDetails.previewImageSrc} style={{ width: "100%" }} alt="project image" />
                    </div>}
            </div>
        </>
    )
}