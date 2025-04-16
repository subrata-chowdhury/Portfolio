'use client'
// import Model from "@/app/components/Model";
import { SkillsContainer } from "@/app/components/Skills";
import { skillsData } from "@/app/data/skills";
import Arrow from "@/app/Icons/Arrow";

export default function DetailedProjectView({
    name = "Name",
    // repoName,
    description = "It's a Project",
    noOfCommits,
    createdAt,
    updatedAt,
    mainSkills = [],
    otherSkills = [],
    // previewImageSrc = '',
    liveUrl = null,

    // onClose = () => { }
}: {
    name: string,
    repoName?: string | null,
    description?: string,
    noOfCommits?: number | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    mainSkills?: string[],
    otherSkills?: string[],
    previewImageSrc?: string,
    liveUrl?: string | null,

    onClose?: () => void
}) {
    const newSkillsData = [];
    for (let index = 0; index < mainSkills.length; index++) {
        const filterData = skillsData.filter(e => e.name === mainSkills[index])[0]
        if (filterData) newSkillsData.push(filterData)
    }

    const projectSkills = [];
    for (let index = 0; index < otherSkills.length; index++) {
        const filterData = skillsData.filter(e => e.name === otherSkills[index])[0]
        if (filterData)
            projectSkills.push(filterData)
        else projectSkills.push({
            name: otherSkills[index],
            iconSrc: "/icons/skill.webp",
            id: otherSkills[index].toLowerCase().split(' ').join('-'),
            lvl: 1
        })
    }

    return (
        <>
            <div className="detailed-project-view-container">
                <div className="left-side">
                    <div className="heading">{name}</div>
                    <div className="project-description">{description}</div>
                    <div className="heading">Main Skills</div>
                    <SkillsContainer hideLevel={true} skillsData={newSkillsData} excludeIds={true} />
                    <div className="heading">Other Skills</div>
                    <SkillsContainer hideLevel={true} skillsData={projectSkills} excludeIds={true} />
                    {liveUrl && <div className="project-link-container">
                        <a className="link-container" style={{ marginTop: '2rem' }} target="_blank" href={liveUrl}>
                            <div className="project-link">Live Demo</div>
                            <Arrow />
                        </a>
                    </div>}
                </div>
                <div className="right-side">
                    {createdAt && <div className="project-commit-details-container"><b>Created At: </b>{createdAt}</div>}
                    {updatedAt && <div className="project-commit-details-container"><b>Updated At: </b>{updatedAt}</div>}
                    {noOfCommits && (noOfCommits > 0) && <div className="project-commit-details-container"><b>No of Commits: </b>{noOfCommits}</div>}
                </div>
            </div>
        </>
    )
}