import { Link } from "react-router-dom";
import "../style/projects.css"
import { useRef, useState } from "react";
import GitHub from "../Icons/Social Media/GitHub";
import Arrow from "../Icons/Arrow";
import { SkillsContainer } from "./Skills";
import Cross from "../Icons/cross";
import Loader from "./Loader";

const projectData = [{
    previewImageSrc: "assets/ATG World Croped.png",
    name: "ATG World",
    about: "It's a project contains a fully responsive webpage created using HTML, CSS and JavaScript.",

    repoName: "ATG_World"
}, {
    previewImageSrc: "assets/Scroll Effect.png",
    name: "Scroll Effect",
    about: "This is a webpage which is focused on scrolling animation created using HTML, CSS and JS.",

    repoName: "Scroll_Effect"
}, {
    previewImageSrc: "assets/Time_Table_Designer.png",
    name: "Time Table Creator",
    about: "It's a web application UI created using ReactJS through which a Time Table can be created manually and also automatically using AI.",

    repoName: "Time-Table-Creator-ReactJS"
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
    about: "It's a simple music player UI created using ReactJS and redux.",

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

let moreProjectData = {
    "ATG_World": {
        languages: ["HTML", "CSS", "Java Script"],
        skills: ["Figma", "Responsive Web Design", "Frontend Development", "Firebase"],
        createdAt: null,
        noOfCommits: 0,
        updatedAt: null,
    },
    "Scroll_Effect": {
        languages: ["HTML", "CSS", "Java Script"],
        skills: ["Figma", "Responsive Web Design", "Frontend Development", "Problem Solving"],
        createdAt: null,
        noOfCommits: 0,
        updatedAt: null,
    },
    "Time-Table-Creator-ReactJS": {
        languages: ["HTML", "CSS", "Java Script"],
        skills: ["ReactJS", "REST API", "Graphic Design", "Responsive Web Design", "Frontend Development", "Problem Solving", "Teamwork", "Web Development"],
        createdAt: null,
        noOfCommits: 0,
        updatedAt: null,
    },
    "Google_Themed_Landing_Page": {
        languages: ["HTML", "CSS", "Java Script"],
        skills: ["Graphic Design", "Responsive Web Design", "Frontend Development", "Problem Solving"],
        createdAt: null,
        noOfCommits: 0,
        updatedAt: null,
    },
    "Focus": {
        languages: ["HTML", "CSS", "Java Script"],
        skills: ["Graphic Design", "Responsive Web Design", "Frontend Development", "Problem Solving", "Teamwork"],
        createdAt: null,
        noOfCommits: 0,
        updatedAt: null,
    },
    "A-Music-Player": {
        languages: ["HTML", "CSS", "Java Script"],
        skills: ["ReactJS", "Redux", "Graphic Design", "Responsive Web Design", "Frontend Development", "Problem Solving"],
        createdAt: null,
        noOfCommits: 0,
        updatedAt: null,
    },
    "Menubar-Style": {
        languages: ["HTML", "CSS", "Java Script"],
        skills: ["Responsive Web Design", "Frontend Development", "Problem Solving"],
        createdAt: null,
        noOfCommits: 0,
        updatedAt: null,
    },
    "All_Doraemon_Movies-v3.5": {
        languages: ["HTML", "CSS", "Java Script"],
        skills: ["Graphic Design", "Responsive Web Design", "Frontend Development"],
        createdAt: null,
        noOfCommits: 0,
        updatedAt: null,
    }
}

export default function Projects({ showLimited = true, showSeeMoreBtn = true }) {
    const [projectDetails, setProjectDetails] = useState({
        repoName: "Repo-Name",
        description: "It's a Project",
        noOfCommits: 0,
        createdAt: null,
        updatedAt: null,
        languages: [],
        skills: []
    })
    const [displayLoader, setDisplayLoader] = useState(false)
    const detailedProjectViewContainer = useRef();
    const closeBtn = useRef();
    async function fetchProjectDetails(repoName) {
        let newProjectDetails = {
            repoName: "Repo-Name",
            description: "It's a Project",
            noOfCommits: 0,
            createdAt: null,
            updatedAt: null,
            languages: [],
            skills: []
        }
        const selectedProjectData = projectData.filter(e => e.repoName === repoName)[0]
        newProjectDetails.repoName = repoName;
        newProjectDetails.description = selectedProjectData.about;
        newProjectDetails.languages = moreProjectData[repoName].languages;
        newProjectDetails.skills = moreProjectData[repoName].skills;
        newProjectDetails.createdAt = moreProjectData[repoName].createdAt;
        newProjectDetails.noOfCommits = moreProjectData[repoName].noOfCommits;
        newProjectDetails.updatedAt = moreProjectData[repoName].updatedAt;

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
                        moreProjectData[repoName].noOfCommits += await noOfCommits;
                        newProjectDetails.noOfCommits += await noOfCommits;
                        if (pageCount === 1)
                            moreProjectData[repoName].updatedAt = newProjectDetails.updatedAt = new Date(commitDetails[0].commit.committer.date).toUTCString();
                        moreProjectData[repoName].createdAt = newProjectDetails.createdAt = new Date(commitDetails[(await noOfCommits - 1)].commit.committer.date).toUTCString();
                    }
                    pageCount++
                }
                detailedProjectViewContainer.current.classList.add('active')
                closeBtn.current.classList.add('active')
            } else {
                detailedProjectViewContainer.current.classList.add('active')
                closeBtn.current.classList.add('active')
            }
        } catch (error) {
            console.error("can't fetch project commit details")
        } finally {
            setDisplayLoader(false)
        }
        setProjectDetails(newProjectDetails)
    }

    return (
        <>
            <Loader display={displayLoader} />
            <DetailedProjectView projectDetails={projectDetails} forwardDetailsContainerRef={detailedProjectViewContainer} forwardCloseBtnRef={closeBtn} />
            <div className="screen-container">
                <div className="heading" id="project">
                    <div>My Projects</div>
                    <GitHubButton />
                </div>
                <ProjectsContainer showLimited={showLimited} moreDetailsOfProjectBtnClickHandler={fetchProjectDetails} />
                {showSeeMoreBtn && (<div className="see-more-btn-container">
                    <Link to={"/Projects"} className="btn">See More</Link>
                </div>)}
            </div>
        </>
    )
}

function ProjectsContainer({ showLimited = true, moreDetailsOfProjectBtnClickHandler }) {
    let projectElement = [];
    for (let index = 0; index < (showLimited ? 4 : projectData.length); index++) {
        projectElement.push(
            <Project
                previewImageSrc={projectData[index].previewImageSrc}
                name={projectData[index].name}
                about={projectData[index].about}
                key={projectData[index].name}
                repoName={projectData[index].repoName}
                moreDetailsOfProjectBtnClickHandler={moreDetailsOfProjectBtnClickHandler}
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
    moreDetailsOfProjectBtnClickHandler = () => { },

    animationDelay = 0
}) {
    const [showAbout, setShowAbout] = useState(false)
    return (
        <div className="project-container" style={{ animationDelay: animationDelay + 's' }}>
            <div className="project-image">
                <img src={previewImageSrc} alt="project image" />
            </div>
            <div className="details">
                <div className="project-name">{name}</div>
                <div className="about-project" onClick={() => { setShowAbout(val => !val) }}>
                    {(about.length > 70 && !showAbout) ? about.slice(0, 65) + '... ' : about}
                    {(about.length > 70 && !showAbout) && <span className="read-more-btn">read more</span>}
                </div>
                <div className="project-link-container">
                    <a className="link-container" target="_blank" href={`https://github.com/Super7000/${repoName}`}>
                        <div className="project-link">View in Github</div>
                        <Arrow />
                    </a>
                    <div className="more-details btn" onClick={() => moreDetailsOfProjectBtnClickHandler(repoName)}>More Details</div>
                </div>
            </div>
        </div>
    )
}

function DetailedProjectView({ projectDetails = {
    repoName: "Repo-Name",
    description: "It's a Project",
    noOfCommits: 0,
    createdAt: 'Github Rate Limit Reached',
    updatedAt: 'Github Rate Limit Reached',
    languages: [],
    skills: [],
    previewImageSrc: ''
}, forwardDetailsContainerRef = useRef(), forwardCloseBtnRef = useRef() }) {
    return (
        <>
            <div className="close-detailed-project-view-btn" ref={forwardCloseBtnRef} onClick={() => {
                forwardDetailsContainerRef.current.classList.remove('active')
                forwardCloseBtnRef.current.classList.remove('active')
            }}>
                <Cross />
            </div>
            <div className="detailed-project-view-container" ref={forwardDetailsContainerRef} >
                <div className="left-side">
                    <div className="heading">{projectDetails.repoName}</div>
                    <div className="project-description">{projectDetails.description}</div>
                    <div className="heading">Languages</div>
                    <SkillsContainer showOnlyTopSkills={true} hideLevel={true} data={projectDetails.languages} excludeIds={true} />
                    <div className="heading">Skills Used</div>
                    <SkillsContainer showOnlyTopSkills={false} hideLevel={true} data={projectDetails.skills} excludeIds={true} />
                </div>
                <div className="right-side">
                    <div className="project-commit-details-container"><b>Created At: </b>{projectDetails.createdAt}</div>
                    <div className="project-commit-details-container"><b>Updated At: </b>{projectDetails.updatedAt}</div>
                    <div className="project-commit-details-container"><b>No of Commits: </b>{projectDetails.noOfCommits}</div>
                </div>
            </div>
        </>
    )
}