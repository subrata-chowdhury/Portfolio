import { useState } from "react";
import "@/app/styles/skills.css"
import { skillsData as defaultValue, Skill } from "../data/skills";
import Model from "./Model";
import { ProjectsContainer } from "@/app/Projects/components/Projects";
import { projectsData } from "../data/projects";
import Image from "next/image";

export default function Skills({ forwardSkillContainerRef }: { forwardSkillContainerRef: React.RefObject<HTMLDivElement | null> }) {
    const [skillsData, setSkillData] = useState(defaultValue);
    const [showOnlyTopSkills, setShowOnlyTopSkills] = useState(false);
    const [sortBy, setSortBy] = useState('name');

    return (
        <section className="screen-container">
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
        </section>
    )
}

export const SkillsContainer = ({
    skillsData = defaultValue,
    forwardSkillContainerRef = null,
    excludeIds = false,
    skillClickHandler = () => { },
    showOnlyTopSkills = false,
    hideLevel = false,
}: {
    skillsData?: Skill[],
    forwardSkillContainerRef?: React.RefObject<HTMLDivElement | null> | null,
    excludeIds?: boolean,
    skillClickHandler?: (e: React.MouseEvent<HTMLDivElement>) => void,
    showOnlyTopSkills?: boolean,
    hideLevel?: boolean
}) => {
    if (showOnlyTopSkills)
        skillsData = skillsData.filter(skill => skill["topSkill"] ? true : false)

    return (
        <div className="skills-container" ref={forwardSkillContainerRef} style={hideLevel ? { display: "inline-block" } : {}}>
            {
                skillsData.length > 0 ? skillsData.map((skill, index) => {
                    return <SkillCard
                        name={skill["name"]}
                        icon={skill["iconSrc"]}
                        id={excludeIds ? "" : skill["id"]}
                        data={excludeIds ? skill["id"].toLowerCase() : ""}
                        key={skill["id"]}
                        onClickHandler={skillClickHandler}
                        lvl={skill.lvl}
                        hideLevel={hideLevel}
                        animationDelay={index}
                    />
                }) :
                    <div className="no-skill">No Skill Found</div>
            }
        </div>
    )
}

function SkillCard({
    name = "Skill",
    icon,
    id = "",
    data = "",
    onClickHandler = () => { },
    lvl = 0,
    hideLevel = false,
    animationDelay = 0
}: {
    name: string,
    icon?: string,
    id: string,
    data: string,
    onClickHandler: (e: React.MouseEvent<HTMLDivElement>) => void,
    lvl: number,
    hideLevel: boolean,
    animationDelay: number
}) {
    const level = lvl === 1 ? 'Basic' : lvl === 2 ? 'Intermediate' : lvl === 3 ? 'Advance' : 'No Experience';
    const [showRelatedProjects, setShowRelatedProjects] = useState(false)

    return (
        <>
            <div
                className="skill-container"
                id={id}
                title={name + " (" + level + ")"}
                data-id={data}
                onClick={e => {
                    if (id !== "") setShowRelatedProjects(true)
                    onClickHandler(e)
                }}
                style={hideLevel ? { display: "inline-flex", margin: "0.3rem", animationDuration: animationDelay / 10 + 's' } : { animationDuration: animationDelay / 10 + 's' }}>
                <div className="sub-skill-container">
                    <div className="skill-name-container">
                        {icon && <img src={icon} alt="icon" style={hideLevel ? { width: '30px' } : {}} />}
                        <div className="skill-name">{name}</div>
                    </div>
                    {lvl && !hideLevel && <div className="skill-details">
                        <Image src={`/icons/star${(lvl === 1 || lvl === 2 || lvl === 3) ? '-fill' : ''}.svg`} width={15} height={15} alt="star-icon" />
                        <Image src={`/icons/star${(lvl === 2 || lvl === 3) ? '-fill' : ''}.svg`} width={15} height={15} alt="star-icon" />
                        <Image src={`/icons/star${(lvl === 3) ? '-fill' : ''}.svg`} width={15} height={15} alt="star-icon" />
                    </div>}
                </div>
            </div>

            {showRelatedProjects && <SkillDetailsPopUp skill={name} onClose={() => setShowRelatedProjects(false)} />}
        </>
    )
}

function SortButton({ onClickHandler = () => { }, active = false }) {
    return (
        <button className="sort btn" onClick={onClickHandler}>
            <div>{active ? 'Sort By Name' : 'Sort By Level'}</div>
            <Image src="/icons/sort.png" alt="sort-icon" width={20} height={20} style={{ height: 'auto' }} />
        </button>
    )
}

function FilterButton({ onClickHandler = () => { }, active = false }) {
    return (
        <button className="sort filter btn" onClick={onClickHandler}>
            <div>{active ? 'Show All Skills' : 'Show Top Skills'}</div>
            <Image src="/icons/sort.png" alt="sort-icon" width={20} height={20} style={{ height: 'auto' }} />
        </button>
    )
}

function SkillDetailsPopUp({ skill, onClose = () => { } }: { skill: string, onClose: () => void }) {
    return (
        <Model onClose={onClose}>
            <div className="skill-details-container">
                <div className="heading">Related Projects</div>
                <ProjectsContainer projectData={projectsData.filter(project => {
                    return project.mainSkills.includes(skill) || project.otherSkills.includes(skill)
                })} />
            </div>
        </Model>
    )
}