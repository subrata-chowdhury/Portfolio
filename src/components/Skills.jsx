import { useRef, useState } from "react";
import "../style/skills.css"

export default function Skills({ forwardSkillContainerRef }) {
    const [skillsData, setSkillData] = useState([{
        name: "Frontend Development",
        iconSrc: "../icons/Frontend2.svg",
        id: "frontend-development",
        lvl: 3
    }, {
        name: "Web Development",
        iconSrc: "../icons/Web Development.svg",
        id: "web-development",
        lvl: 2
    }, {
        name: "HTML",
        iconSrc: "../icons/html.svg",
        id: "html",
        lvl: 3
    }, {
        name: "CSS",
        iconSrc: "../icons/css.svg",
        id: "css",
        lvl: 3
    }, {
        name: "SASS",
        iconSrc: "../icons/sass.svg",
        id: "scaa",
        lvl: 1
    }, {
        name: "Java Script",
        iconSrc: "../icons/js.svg",
        id: "js",
        lvl: 3
    }, {
        name: "PHP",
        iconSrc: "../icons/php.svg",
        id: "php",
        lvl: 1
    }, {
        name: "C",
        iconSrc: "../icons/c.svg",
        id: "c",
        lvl: 2
    }, {
        name: "C++",
        iconSrc: "../icons/cpp.svg",
        id: "cpp",
        lvl: 2
    }, {
        name: "Java",
        iconSrc: "../icons/java.svg",
        id: "java",
        lvl: 2
    }, {
        name: "Python",
        iconSrc: "../icons/python.svg",
        id: "python",
        lvl: 1
    }, {
        name: "MySQL",
        iconSrc: "../icons/MySQL.svg",
        id: "mysql",
        lvl: 2
    }, {
        name: "NodeJS",
        iconSrc: "../icons/NodeJS.svg",
        id: "nodejs",
        lvl: 1
    }, {
        name: "React",
        iconSrc: "../icons/React.svg",
        id: "react",
        lvl: 3
    }, {
        name: "Teamwork",
        iconSrc: "../icons/teamwork.svg",
        id: "teamwork",
        lvl: 2
    }, {
        name: "Web Design",
        iconSrc: "../icons/web-design.png",
        id: "webDesign",
        lvl: 3
    }, {
        name: "Graphic Design",
        iconSrc: "../icons/graphic-design.png",
        id: "graphicDesign",
        lvl: 3
    }, {
        name: "AI Tools",
        iconSrc: "../icons/ai.png",
        id: "ai",
        lvl: 2
    }, {
        name: "Database",
        iconSrc: "../icons/database.png",
        id: "database",
        lvl: 2
    }, {
        name: "Responsive Web Design",
        iconSrc: "../icons/ui-design.png",
        id: "responsiveWebDesign",
        lvl: 3
    }, {
        name: "Quick Learner",
        iconSrc: "../icons/laptop.png",
        id: "quickLearner",
        lvl: 2
    }, {
        name: "Problem Solving",
        iconSrc: "../icons/problem-solving.png",
        id: "problemSolving",
        lvl: 2
    }, {
        name: "REST API",
        iconSrc: "../icons/api.png",
        id: "restApi",
        lvl: 2
    }, {
        name: "Visual Basic",
        iconSrc: "../icons/vb-file.png",
        id: "visualBasic",
        lvl: 1
    }, {
        name: "Word",
        iconSrc: "../icons/word.png",
        id: "word",
        lvl: 2
    }, {
        name: "Excel",
        iconSrc: "../icons/excel.png",
        id: "excel",
        lvl: 2
    }, {
        name: "Power Point",
        iconSrc: "../icons/powerpoint.png",
        id: "powerpoint",
        lvl: 2
    }, {
        name: "Power Bi",
        iconSrc: "../icons/power-bi-2021.svg",
        id: "powerBi",
        lvl: 2
    }, {
        name: "Figma",
        iconSrc: "../icons/figma.png",
        id: "figma",
        lvl: 1
    }]);
    return (
        <div className="screen-container">
            <div className="heading" id="skills">
                <div>My Skills</div>
                <SortButton onClickHandler={() => {
                    const sortedArray = [...skillsData]
                    sortedArray.sort((a, b) => {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return b.lvl - a.lvl; // Descending order for price
                    })
                    setSkillData(sortedArray)
                }} />
            </div>
            <SkillsContainer skillsData={skillsData} forwardSkillContainerRef={forwardSkillContainerRef} />
        </div>
    )
}

export function SkillsContainer({ skillsData = [], forwardSkillContainerRef = useRef(), excludeIds = false, skillClickHandler = () => { } }) {
    let skills = [];
    for (let index = 0; index < skillsData.length; index++) {
        skills.push(<Skill
            name={skillsData[index]["name"]}
            icon={skillsData[index]["iconSrc"]}
            id={excludeIds ? "" : skillsData[index]["id"]}
            data={excludeIds ? skillsData[index]["id"] : ""}
            key={skillsData[index]["id"]}
            onClickHandler={skillClickHandler}
            lvl={skillsData[index].lvl}
        />)
    }
    return (
        <div className="skills-container" ref={forwardSkillContainerRef}>
            {skills}
        </div>
    )
}

function Skill({ name = "Skill", icon = "../icons/js.svg", id = "", data = "", onClickHandler = () => { }, lvl = 0 }) {
    return (
        <div className="skill-container" id={id} title={lvl === 1 ? 'Basic' : lvl === 2 ? 'Intermediate' : lvl === 3 ? 'Advance' : 'No Experience'} data-id={data} onClick={onClickHandler}>
            <div className="skill-name-container">
                <img src={icon} alt="icon" />
                <div className="skill-name">{name}</div>
            </div>
            <div className="skill-details">
                <img src={`../icons/star${(lvl === 1 || lvl === 2 || lvl === 3) ? '-fill' : ''}.svg`} alt="icon" />
                <img src={`../icons/star${(lvl === 2 || lvl === 3) ? '-fill' : ''}.svg`} alt="icon" />
                <img src={`../icons/star${(lvl === 3) ? '-fill' : ''}.svg`} alt="icon" />
            </div>
        </div>
    )
}

function SortButton({ onClickHandler = () => { } }) {
    return (
        <div className="sort btn" onClick={onClickHandler}>
            <div>Sort By</div>
            <img src="../icons/sort.png"></img>
        </div>
    )
}