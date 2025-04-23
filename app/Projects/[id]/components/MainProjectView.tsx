'use client'
// import Model from "@/app/components/Model";
import { SkillsContainer } from "@/app/components/Skills";
import { skillsData } from "@/app/data/skills";
import Arrow from "@/app/Icons/Arrow";
import InternetIcon from "@/app/Icons/Internet";
import Link from "next/link";

export default function DetailedProjectView({
    name = "Name",
    repoName,
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
                    <div style={{ paddingBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                        <h1 className="heading" style={{ marginBottom: 0 }}>{name}</h1>
                        <div style={{ fontSize: '0.8rem', color: 'var(--heading-color)' }}>{createdAt + ' - ' + updatedAt}</div>
                    </div>
                    <div className="project-description">{description}</div>
                    <h2 className="heading">Main Skills</h2>
                    <SkillsContainer skillsData={newSkillsData} excludeIds={true} />
                    <h2 className="heading">Other Skills</h2>
                    <SkillsContainer skillsData={projectSkills} excludeIds={true} />
                    <div className="project-link-container" style={{ marginTop: "2rem", justifyContent: 'start', gap: '1rem' }}>
                        {liveUrl && <Link href={liveUrl} className="link-container liveurl-container" style={{ padding: '0.7rem  1rem' }} target="_blank">
                            <div className="project-link" style={{ fontSize: '1rem' }}>Live Demo</div>
                            <InternetIcon size={18} />
                        </Link>}
                        <Link className="link-container liveurl-container" style={{ padding: '0.7rem  1rem' }} target="_blank" href={(repoName ? `https://github.com/Super7000/${repoName}` : "")}>
                            <div className="project-link">{repoName ? "View in Github" : "View Here"}</div>
                            <Arrow />
                        </Link>
                    </div>
                </div>
                <div className="right-side">
                    {/* {createdAt && <div className="project-commit-details-container"><b>Created At: </b>{createdAt}</div>}
                    {updatedAt && <div className="project-commit-details-container"><b>Updated At: </b>{updatedAt}</div>} */}
                    {noOfCommits && (noOfCommits > 0) && <div className="project-commit-details-container"><b>No of Commits: </b>{noOfCommits}</div>}
                </div>
            </div>
        </>
    )
}