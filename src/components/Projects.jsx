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
        about: "This is a webpage which is focused on scrolling animation created using HTML, CSS and JS."
    }, {
        previewImageSrc: "assets/Time_Table_Designer.png",
        name: "Time Table Creator",
        about: "It's a web application UI created using ReactJS through which a Time Table can be created manually and also automatically using AI."
    }, {
        previewImageSrc: "assets/Google Search Page.png",
        name: "Google Search Page",
        about: "It's a mimic of Google search engine webpage which allow more customize feature."
    }, {
        previewImageSrc: "assets/Focus.png",
        name: "Focus",
        about: "This is a landing page created using HTML, CSS & JS. It's provide a feature like fully custom theme, bookmark, search bar (use Google search engine) and some simple apps like calculator, live weather broadcast etc."
    }, {
        previewImageSrc: "assets/A Music Player.png",
        name: "A Music Player",
        about: "It's a simple music player UI created using ReactJS and redux."
    }, {
        previewImageSrc: "assets/Menubar_Style.png",
        name: "Menubar Style",
        about: "It is a website created using HTML, CSS and JavaScript which is mainly focused on menubar style."
    }, {
        previewImageSrc: "assets/All Doraemon Movies.png",
        name: "List of All Doraemon Movies",
        about: "It a webpage that contains list of all doraemon movies created using HTML, CSS & a little bit JS. It was created by me in 11th when I started learning frontend development."
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
                <div className="about-project">{about.length > 70 ? about.slice(0, 65) + '...' : about}</div>
                <a className="project link-container" href={projectLink}>
                    <div className="project-link">View in Github</div>
                    <img src="../icons/Arrow.svg" alt="" />
                </a>
            </div>
        </div>
    )
}