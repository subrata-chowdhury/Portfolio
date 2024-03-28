import "../style/projects.css"

export default function Projects() {
    return (
        <div className="screen-container">
            <div className="heading" id="project">
                <div>My Projects</div>
                <a className="github-page-btn" href="https://github.com/Super7000">
                    <img src="../icons/github-white.svg" alt="" />
                    <div>View My Github Page</div>
                </a>
            </div>
            <div className="projects-container">
                <Project
                    previewImageSrc="assets/ATG World Croped.png"
                    name="ATG World"
                    about="It's a project contains a fully responsive webpage created using HTML, CSS and JavaScript." />
                <Project
                    previewImageSrc="assets/Scroll Effect.png"
                    name="Scroll Effect"
                    about="It's a project contains a fully responsive webpage created using HTML, CSS and JavaScript." />
                <Project
                    previewImageSrc="assets/All Doraemon Movies.png"
                    name="List of All Doraemon Movies"
                    about="It's a project contains a fully responsive webpage created using HTML, CSS and JavaScript." />
                <Project
                    previewImageSrc="assets/Google Search Page.png"
                    name="Google Search Page"
                    about="It's a project contains a fully responsive webpage created using HTML, CSS and JavaScript." />
            </div>
        </div>
    )
}

function Project({
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
                <a className="project-link-container" href={projectLink}>
                    <div className="project-link">View in Github</div>
                    <img src="../icons/Arrow.svg" alt="" />
                </a>
            </div>
        </div>
    )
}