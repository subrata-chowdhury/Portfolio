import "../style/skills.css"

export default function Skills() {
    let skills = [];
    const skillsData = [{
        name: "Frontend Development",
        iconSrc: "../icons/Frontend2.svg",
        id: "frontend-development"
    }, {
        name: "Web Development",
        iconSrc: "../icons/Web Development.svg",
        id: "web-development"
    }, {
        name: "HTML",
        iconSrc: "../icons/html.svg",
        id: "html"
    }, {
        name: "CSS",
        iconSrc: "../icons/css.svg",
        id: "css"
    }, {
        name: "SASS",
        iconSrc: "../icons/sass.svg",
        id: "scaa"
    }, {
        name: "Java Script",
        iconSrc: "../icons/js.svg",
        id: "js"
    }, {
        name: "PHP",
        iconSrc: "../icons/php.svg",
        id: "php"
    }, {
        name: "C",
        iconSrc: "../icons/c.svg",
        id: "c"
    }, {
        name: "C++",
        iconSrc: "../icons/cpp.svg",
        id: "cpp"
    }, {
        name: "Java",
        iconSrc: "../icons/java.svg",
        id: "java"
    }, {
        name: "Python",
        iconSrc: "../icons/python.svg",
        id: "python"
    }];
    for (let index = 0; index < skillsData.length; index++) {
        skills.push(<Skill
            name={skillsData[index]["name"]}
            icon={skillsData[index]["iconSrc"]}
            id={skillsData[index]["id"]} 
            key={skillsData[index]["id"]}
        />)
    }
    return (
        <div className="screen-container">
            <div className="heading">My Skills</div>
            <div className="skills-container">
                {skills}
            </div>
        </div>
    )
}

function Skill({ name = "Skill", icon = "../icons/js.svg", id = "" }) {
    return (
        <div className="skill-container" id={id}>
            <div className="skill-name-container">
                <img src={icon} alt="icon" />
                <div className="skill-name">{name}</div>
            </div>
            <div className="skill-details"></div>
        </div>
    )
}