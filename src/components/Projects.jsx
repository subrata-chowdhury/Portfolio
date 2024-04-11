import { Link } from "react-router-dom";
import "../style/projects.css"

export default function Projects({ showLimited = true, showSeeMoreBtn = true }) {
    const projectData = [{
        previewImageSrc: "assets/ATG World Croped.png",
        name: "ATG World",
        about: "It's a project contains a fully responsive webpage created using HTML, CSS and JavaScript."
    }, {
        previewImageSrc: "assets/Scroll Effect.png",
        name: "Scroll Effect",
        about: "It's a project contains a fully responsive webpage created using HTML, CSS and JavaScript."
    }, {
        previewImageSrc: "assets/Time_Table_Designer.png",
        name: "Time Table Designer",
        about: "It's a project contains a fully responsive webpage created using HTML, CSS and JavaScript."
    }, {
        previewImageSrc: "assets/Google Search Page.png",
        name: "Google Search Page",
        about: "It's a project contains a fully responsive webpage created using HTML, CSS and JavaScript."
    }, {
        previewImageSrc: "assets/All Doraemon Movies.png",
        name: "List of All Doraemon Movies",
        about: "It's a project contains a fully responsive webpage created using HTML, CSS and JavaScript."
    }]
    let projectElement = [];
    for (let index = 0; index < (showLimited ? 4 : projectData.length); index++) {
        projectElement.push(
            <Project
                previewImageSrc={projectData[index].previewImageSrc}
                name={projectData[index].name}
                about={projectData[index].about}
                key={projectData[index].name} />
        )
    }
    return (
        <div className="screen-container">
            <div className="heading" id="project">
                <div>My Projects</div>
                <GitHubButton />
            </div>
            <div className="projects-container">
                {projectElement}
            </div>
            {showSeeMoreBtn && (<div className="see-more-btn-container">
                <Link to={"/Projects"} className="btn">See More</Link>
            </div>)}
        </div>
    )
}

export function GitHubButton() {
    return (
        <a className="github-page-btn btn" href="https://github.com/Super7000">
            <img src="../icons/github-white.svg" alt="" />
            <div>View My Github Page</div>
        </a>
    )
}

export function Project({
    previewImageSrc = "assets/ATG World Croped.png",
    name = "ATG World",
    about = "It's a project contains a fully responsive webpage created using HTML, CSS and JavaScript.",
    projectLink = "#"
}) {
    return (
        <div className="project-container">
            <div className="project-image">
                <img src={previewImageSrc} alt="project image" />
            </div>
            <div className="details">
                <div className="project-name">{name}</div>
                <div className="about-project">{about}</div>
                <a className="project link-container" href={projectLink}>
                    <div className="project-link">View in Github</div>
                    <img src="../icons/Arrow.svg" alt="" />
                </a>
            </div>
        </div>
    )
}