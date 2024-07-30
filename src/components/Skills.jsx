import { memo, useRef, useState } from "react";
import "../style/skills.css"
const defaultValue = [{
    name: "Frontend Development",
    iconSrc: "./icons/Frontend2.svg",
    id: "frontend-development",
    lvl: 3,
    topSkill: true
}, {
    name: "Web Development",
    iconSrc: "./icons/Web Development.svg",
    id: "web-development",
    lvl: 2
}, {
    name: "HTML",
    iconSrc: "./icons/html.svg",
    id: "html",
    lvl: 3,
    topSkill: true
}, {
    name: "CSS",
    iconSrc: "./icons/css.svg",
    id: "css",
    lvl: 3,
    topSkill: true
}, {
    name: "SASS",
    iconSrc: "./icons/sass.svg",
    id: "sass",
    lvl: 1
}, {
    name: "JavaScript",
    iconSrc: "./icons/js.svg",
    id: "java-script",
    lvl: 3,
    topSkill: true
}, {
    name: "TypeScript",
    iconSrc: "./icons/typescript.svg",
    id: "type-script",
    lvl: 3,
    topSkill: true
}, {
    name: "Bootstrap 5",
    iconSrc: "./icons/bootstrap-5.svg",
    id: "boostrap-5",
    lvl: 3,
    topSkill: true
}, {
    name: "MongoDB",
    iconSrc: "./icons/mongodb-icon-1.svg",
    id: "mongodb",
    lvl: 2,
    topSkill: true
}, {
    name: "PHP",
    iconSrc: "./icons/php.svg",
    id: "php",
    lvl: 1
}, {
    name: "C",
    iconSrc: "./icons/c.svg",
    id: "c",
    lvl: 2
}, {
    name: "C++",
    iconSrc: "./icons/cpp.svg",
    id: "cpp",
    lvl: 2
}, {
    name: "Java",
    iconSrc: "./icons/java.svg",
    id: "java",
    lvl: 2
}, {
    name: "OOPs",
    iconSrc: "./icons/oop.png",
    id: "oops",
    lvl: 2
}, {
    name: "DSA",
    iconSrc: "./icons/dsa.png",
    id: "dsa",
    lvl: 2
}, {
    name: "Python",
    iconSrc: "./icons/python.svg",
    id: "python",
    lvl: 1
}, {
    name: "MySQL",
    iconSrc: "./icons/MySQL.svg",
    id: "mysql",
    lvl: 2,
    topSkill: true
}, {
    name: "Node.js",
    iconSrc: "./icons/NodeJS.svg",
    id: "nodejs",
    lvl: 2,
    topSkill: true
}, {
    name: "Express.js",
    iconSrc: "./icons/express.png",
    id: "expressjs",
    lvl: 2,
    topSkill: true
}, {
    name: "React",
    iconSrc: "./icons/React.svg",
    id: "reactjs",
    lvl: 3,
    topSkill: true
}, {
    name: "React Native",
    iconSrc: "./icons/React.svg",
    id: "react-native",
    lvl: 3,
    topSkill: true
}, {
    name: "Redux",
    iconSrc: "./icons/redux.svg",
    id: "redux",
    lvl: 2,
}, {
    name: "Teamwork",
    iconSrc: "./icons/teamwork.svg",
    id: "teamwork",
    lvl: 2
}, {
    name: "Web Design",
    iconSrc: "./icons/web-design.png",
    id: "webDesign",
    lvl: 3,
    topSkill: true
}, {
    name: "Graphic Design",
    iconSrc: "./icons/graphic-design.png",
    id: "graphicDesign",
    lvl: 3
}, {
    name: "AI Tools",
    iconSrc: "./icons/ai.png",
    id: "ai",
    lvl: 2
}, {
    name: "DBMS",
    iconSrc: "./icons/database.png",
    id: "dbms",
    lvl: 2
}, {
    name: "Operating System",
    iconSrc: "./icons/os.png",
    id: "os",
    lvl: 2
}, {
    name: "Responsive Web Design",
    iconSrc: "./icons/ui-design.png",
    id: "responsiveWebDesign",
    lvl: 3,
    topSkill: true
}, {
    name: "Quick Learner",
    iconSrc: "./icons/laptop.png",
    id: "quickLearner",
    lvl: 2
}, {
    name: "Problem Solving",
    iconSrc: "./icons/problem-solving.png",
    id: "problemSolving",
    lvl: 2
}, {
    name: "REST API",
    iconSrc: "./icons/api.png",
    id: "restApi",
    lvl: 2,
    topSkill: true
}, {
    name: "Visual Basic",
    iconSrc: "./icons/vb-file.png",
    id: "visualBasic",
    lvl: 1
}, {
    name: "Word",
    iconSrc: "./icons/word.png",
    id: "word",
    lvl: 2
}, {
    name: "Excel",
    iconSrc: "./icons/excel.png",
    id: "excel",
    lvl: 2
}, {
    name: "PowerPoint",
    iconSrc: "./icons/powerpoint.png",
    id: "powerpoint",
    lvl: 1
}, {
    name: "Power Bi",
    iconSrc: "./icons/power-bi-2021.svg",
    id: "powerBi",
    lvl: 1
}, {
    name: "Figma",
    iconSrc: "./icons/figma.png",
    id: "figma",
    lvl: 1
}, {
    name: "IntelliJ IDEA",
    iconSrc: "./icons/intellij-idea.svg",
    id: "intellij-idea",
    lvl: 1
}, {
    name: "Android Studio",
    iconSrc: "./icons/android-studio.png",
    id: "android-studio",
    lvl: 1
}, {
    name: "Firebase",
    iconSrc: "./icons/Logomark_Full Color.svg",
    id: "firebase",
    lvl: 1
}]

defaultValue.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return b.lvl - a.lvl;
})

export { defaultValue as skillsData }

export const skillCount = defaultValue.length

export default function Skills({ forwardSkillContainerRef }) {
    const [skillsData, setSkillData] = useState(defaultValue);
    const [showOnlyTopSkills, setShowOnlyTopSkills] = useState(false);
    const [sortBy, setSortBy] = useState('name');
    return (
        <div className="screen-container">
            <div className="heading" id="skills">
                <div>My Skills</div>
                <div className="btn-container">
                    <FilterButton onClickHandler={() => setShowOnlyTopSkills(val => !val)} active={showOnlyTopSkills} />
                    <SortButton onClickHandler={() => {
                        const sortedArray = [...skillsData]
                        if (sortBy === 'name') {
                            sortedArray.sort((a, b) => {
                                if (a.lvl < b.lvl) return 1;
                                if (a.lvl > b.lvl) return -1;
                                return b.lvl - a.lvl;
                            })
                        } else if (sortBy === 'level') {
                            sortedArray.sort((a, b) => {
                                if (a.name < b.name) return -1;
                                if (a.name > b.name) return 1;
                                return b.lvl - a.lvl;
                            })
                        }
                        setSkillData(sortedArray)
                        setSortBy(sortBy === 'name' ? 'level' : 'name')
                    }} active={sortBy === 'name' ? false : true} />
                </div>
            </div>
            <SkillsContainer skillsData={skillsData} forwardSkillContainerRef={forwardSkillContainerRef} showOnlyTopSkills={showOnlyTopSkills} />
        </div>
    )
}

export const SkillsContainer = memo(({
    skillsData = defaultValue,
    forwardSkillContainerRef = useRef(),
    excludeIds = false,
    skillClickHandler = () => { },
    showOnlyTopSkills = false,
    hideLevel = false,
}) => {
    let skills = [];
    if (showOnlyTopSkills)
        skillsData = skillsData.filter(skill => skill["topSkill"] ? true : false)

    for (let index = 0; index < skillsData.length; index++) {
        skills.push(<Skill
            name={skillsData[index]["name"]}
            icon={skillsData[index]["iconSrc"]}
            id={excludeIds ? "" : skillsData[index]["id"]}
            data={excludeIds ? skillsData[index]["id"].toLowerCase() : ""}
            key={skillsData[index]["id"]}
            onClickHandler={skillClickHandler}
            lvl={skillsData[index].lvl}
            hideLevel={hideLevel}
            animationDelay={index}
        />)
    }
    return (
        <div className="skills-container" ref={forwardSkillContainerRef} style={hideLevel ? { display: "inline-block" } : {}}>
            {skills}
        </div>
    )
})

function Skill({ name = "Skill", icon, id = "", data = "", onClickHandler = () => { }, lvl = 0, hideLevel = false, animationDelay = 0 }) {
    const level = lvl === 1 ? 'Basic' : lvl === 2 ? 'Intermediate' : lvl === 3 ? 'Advance' : 'No Experience';

    return (
        <div className="skill-container" id={id} title={name + " (" + level + ")"} data-id={data} onClick={onClickHandler} style={hideLevel ? { display: "inline-flex", margin: "0.3rem", animationDuration: animationDelay / 10 + 's' } : { animationDuration: animationDelay / 10 + 's' }}>
            <div className="sub-skill-container">
                <div className="skill-name-container">
                    {icon && <img src={icon} alt="icon" style={hideLevel ? { width: '30px' } : {}} />}
                    <div className="skill-name">{name}</div>
                </div>
                {lvl && !hideLevel && <div className="skill-details">
                    <img src={`./icons/star${(lvl === 1 || lvl === 2 || lvl === 3) ? '-fill' : ''}.svg`} alt="icon" />
                    <img src={`./icons/star${(lvl === 2 || lvl === 3) ? '-fill' : ''}.svg`} alt="icon" />
                    <img src={`./icons/star${(lvl === 3) ? '-fill' : ''}.svg`} alt="icon" />
                </div>}
            </div>
        </div>
    )
}

function SortButton({ onClickHandler = () => { }, active = false }) {
    return (
        <div className="sort btn" onClick={onClickHandler}>
            <div>{active ? 'Sort By Name' : 'Sort By Level'}</div>
            <img src="./icons/sort.png"></img>
        </div>
    )
}

function FilterButton({ onClickHandler = () => { }, active = false }) {
    return (
        <div className="sort filter btn" onClick={onClickHandler}>
            <div>{active ? 'Show All Skills' : 'Show Top Skills'}</div>
            <img src="./icons/sort.png"></img>
        </div>
    )
}