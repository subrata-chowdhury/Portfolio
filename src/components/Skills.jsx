import { useRef } from "react";
import "../style/skills.css"

export default function Skills({ forwardSkillContainerRef }) {
    return (
        <div className="screen-container">
            <div className="heading">My Skills</div>
            <SkillsContainer forwardSkillContainerRef={forwardSkillContainerRef} />
        </div>
    )
}

export function SkillsContainer({ forwardSkillContainerRef = useRef(), excludeIds = false, skillClickHandler = () => { } }) {
    let skills = [];
    const skillsData = [{
        name: "Frontend Development",
        iconSrc: "../icons/Frontend2.svg",
        id: "frontend-development"
    }, {
        name: "Backend Development",
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
    }, {
        name: "MySQL",
        iconSrc: "../icons/MySQL.svg",
        id: "mysql"
    }, {
        name: "NodeJS",
        iconSrc: "../icons/NodeJS.svg",
        id: "nodejs"
    }, {
        name: "React",
        iconSrc: "../icons/React.svg",
        id: "react"
    }];
    for (let index = 0; index < skillsData.length; index++) {
        skills.push(<Skill
            name={skillsData[index]["name"]}
            icon={skillsData[index]["iconSrc"]}
            id={excludeIds ? "" : skillsData[index]["id"]}
            data={excludeIds ? skillsData[index]["id"] : ""}
            key={skillsData[index]["id"]}
            onClickHandler={skillClickHandler}
        />)
    }
    return (
        <div className="skills-container" ref={forwardSkillContainerRef}>
            {skills}
        </div>
    )
}

function Skill({ name = "Skill", icon = "../icons/js.svg", id = "", data = "", onClickHandler = () => { } }) {
    return (
        <div className="skill-container" id={id} data-id={data} onClick={onClickHandler}>
            <div className="skill-name-container">
                <img src={icon} alt="icon" />
                <div className="skill-name">{name}</div>
            </div>
            <div className="skill-details"></div>
        </div>
    )
}