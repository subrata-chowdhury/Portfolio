import { Link } from "react-router-dom";
import "../style/projects.css"
import { useRef, useState } from "react";
import GitHub from "../Icons/Social Media/GitHub";
import Arrow from "../Icons/Arrow";
import { SkillsContainer } from "./Skills";
import Cross from "../Icons/cross";

const projectData = [{
    previewImageSrc: "assets/ATG World Croped.png",
    name: "ATG World",
    about: "It's a project contains a fully responsive webpage created using HTML, CSS and JavaScript.",

    repoName: "ATG_World",
    languages: ["HTML", "CSS", "Java Script"],
    skills: ["Figma", "Responsive Web Design", "Frontend Development"],
}, {
    previewImageSrc: "assets/Scroll Effect.png",
    name: "Scroll Effect",
    about: "This is a webpage which is focused on scrolling animation created using HTML, CSS and JS.",

    repoName: "Scroll_Effect",
    languages: ["HTML", "CSS", "Java Script"],
    skills: ["Figma", "Responsive Web Design", "Frontend Development", "Problem Solving"],
}, {
    previewImageSrc: "assets/Time_Table_Designer.png",
    name: "Time Table Creator",
    about: "It's a web application UI created using ReactJS through which a Time Table can be created manually and also automatically using AI.",

    repoName: "Time-Table-Creator-ReactJS",
    languages: ["HTML", "CSS", "Java Script"],
    skills: ["ReactJS", "REST API", "Graphic Design", "Responsive Web Design", "Frontend Development", "Problem Solving", "Teamwork", "Web Development"],
}, {
    previewImageSrc: "assets/Google Search Page.png",
    name: "Google Search Page",
    about: "It's a mimic of Google search engine webpage which allow more customize feature.",

    repoName: "Google_Themed_Landing_Page",
    languages: ["HTML", "CSS", "Java Script"],
    skills: ["Graphic Design", "Responsive Web Design", "Frontend Development", "Problem Solving"],
}, {
    previewImageSrc: "assets/Focus.png",
    name: "Focus",
    about: "This is a landing page created using HTML, CSS & JS. It's provide a feature like fully custom theme, bookmark, search bar (use Google search engine) and some simple apps like calculator, live weather broadcast etc.",

    repoName: "Focus",
    languages: ["HTML", "CSS", "Java Script"],
    skills: ["Graphic Design", "Responsive Web Design", "Frontend Development", "Problem Solving", "Teamwork"],
}, {
    previewImageSrc: "assets/A Music Player.png",
    name: "A Music Player",
    about: "It's a simple music player UI created using ReactJS and redux.",

    repoName: "A-Music-Player",
    languages: ["HTML", "CSS", "Java Script"],
    skills: ["ReactJS", "Redux", "Graphic Design", "Responsive Web Design", "Frontend Development", "Problem Solving"],
}, {
    previewImageSrc: "assets/Menubar_Style.png",
    name: "Menubar Style",
    about: "It is a website created using HTML, CSS and JavaScript which is mainly focused on menubar style.",

    repoName: "Menubar-Style",
    languages: ["HTML", "CSS", "Java Script"],
    skills: ["Responsive Web Design", "Frontend Development", "Problem Solving"],

}, {
    previewImageSrc: "assets/All Doraemon Movies.png",
    name: "List of All Doraemon Movies",
    about: "It a webpage that contains list of all doraemon movies created using HTML, CSS & a little bit JS. It was created by me in 11th when I started learning frontend development.",

    repoName: "All_Doraemon_Movies-v3.5",
    languages: ["HTML", "CSS", "Java Script"],
    skills: ["Graphic Design", "Responsive Web Design", "Frontend Development"],
}]

export default function Projects({ showLimited = true, showSeeMoreBtn = true }) {
    const [projectDetails, setProjectDetails] = useState({
        repoName: "Repo-Name",
        description: "It's a Project",
        noOfCommits: 0,
        createdAt: '2024-04-27',
        languages: [],
        skills: []
    })
    const detailedProjectViewContainer = useRef();
    const closeBtn = useRef();
    async function fetchProjectDetails(repoName) {
        detailedProjectViewContainer.current.classList.add('active')
        closeBtn.current.classList.add('active')
        let newProjectDetails = {
            repoName: "Repo-Name",
            description: "It's a Project",
            noOfCommits: 0,
            createdAt: '2024-04-27',
            languages: [],
            skills: [],
            previewImageSrc: ""
        }
        const selectedProjectData = projectData.filter(e => e.repoName === repoName)[0]
        newProjectDetails.repoName = repoName;
        newProjectDetails.description = selectedProjectData.about;
        newProjectDetails.languages = selectedProjectData.languages;
        newProjectDetails.skills = selectedProjectData.skills;
        newProjectDetails.previewImageSrc = selectedProjectData.previewImageSrc;

        // //fetching commit count
        // try {
        //     let response = await fetch(`https://api.github.com/repos/Super7000/${repoName}/commits`)
        //     if (response.status === 200) {
        //         newProjectDetails.noOfCommits = await response.json();
        //         newProjectDetails.noOfCommits = await newProjectDetails.noOfCommits.length;
        //         setProjectDetails(newProjectDetails)
        //     }
        // } catch (error) {
        //     console.error("can't fetch project commit count")
        // }
        setProjectDetails(newProjectDetails)
        console.log(newProjectDetails)
    }

    return (
        <>
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
                moreDetailsOfProjectBtnClickHandler={moreDetailsOfProjectBtnClickHandler} />
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
    moreDetailsOfProjectBtnClickHandler = () => { }
}) {
    const [showAbout, setShowAbout] = useState(false)
    return (
        <div className="project-container">
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
    createdAt: '2024-04-27',
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
                <div className="right-side"></div>
            </div>
        </>
    )
}