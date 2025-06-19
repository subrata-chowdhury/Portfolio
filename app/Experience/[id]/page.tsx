import React from 'react'
import './style.css'
import internshipArray from '@/app/data/internships';
import Link from 'next/link';
import Arrow from '@/app/Icons/Arrow';
import { SkillsContainer } from '@/app/components/Skills';
import { skillsData } from '@/app/data/skills';
import InternetIcon from '@/app/Icons/Internet';
import Image from 'next/image';

async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const internship = internshipArray.filter(e => e.id === id)[0];
    if (!internship) return <div className='empty-heading'>Internship not found</div>

    const projectSkills = [];
    for (let index = 0; index < internship.skills.length; index++) {
        const filterData = skillsData.filter(e => e.name === internship.skills[index])[0]
        if (filterData)
            projectSkills.push(filterData)
        else projectSkills.push({
            name: internship.skills[index],
            iconSrc: "/icons/skill.webp",
            id: internship.skills[index].toLowerCase().split(' ').join('-'),
            lvl: 1
        })
    }

    return (
        <div className='internship-page-container'>
            <h1 className='heading' style={{ marginBottom: '0.2rem' }}>{internship.title}</h1>
            <Link href={internship.companyWebsiteLink} target='_blank' style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--heading-color)' }}>
                <Image src={internship.iconSrc} width={50} height={50} alt='' style={{ borderRadius: '100%' }} />
                <h2 className="" style={{ fontSize: '1.2rem', marginTop: 0, marginBottom: 0 }}>{internship.company}</h2>
                <Arrow style={{ width: 15, height: 15, marginLeft: '0.2rem' }} />
            </Link>
            <div><span style={{ fontWeight: 600 }}>Location:</span> {internship.location}</div>
            <div><span style={{ fontWeight: 600 }}>Duration:</span> {internship.duration}</div>
            <div><span style={{ fontWeight: 600 }}>Stripend:</span> {internship.stipend}</div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                <Link className="link-container liveurl-container" target="_blank" href={internship.certificateSrc}>
                    <div className="project-link">View Certificate</div>
                    <Arrow />
                </Link>
                <Link className="link-container liveurl-container" target="_blank" href={internship.companyWebsiteLink}>
                    <div className="project-link">Company Website</div>
                    <InternetIcon />
                </Link>
                <Link className="link-container liveurl-container" target="_blank" href={internship.linkedInLink}>
                    <div className="project-link">LinkedIn</div>
                    <Arrow />
                </Link>
            </div>
            <h2 className='heading'>Responsibilities & Contributions</h2>
            <div>{internship.description}</div>
            <h2 className='heading'>Skills</h2>
            <SkillsContainer skillsData={projectSkills} />
            <h2 className='heading'>Project</h2>
            <div>
                {
                    internship.workLinks.map((link, index) => {
                        return (
                            <div style={{ padding: '1rem 1.2rem', border: '2px solid rgba(0, 0, 0, 0.15)', borderRadius: '0.7rem', marginBottom: '1rem', background: "var(--card-container-color)" }} key={index}>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <Image src={link.iconSrc} width={40} height={40} alt='' style={{ borderRadius: '100%' }} />
                                    <h2 style={{ fontSize: '1.2rem', marginTop: 0 }}>{link.title}</h2>
                                </div>
                                <div style={{ marginBottom: '0.5rem' }}>{link.description}</div>
                                <Link href={link.link} className="link-container liveurl-container" target="_blank">
                                    <div className="project-link" style={{ fontSize: '1rem' }}>Product Link</div>
                                    <InternetIcon size={18} />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
            <h2 className='heading'>Pay Slips</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
                {
                    internship.paySlips.map((link) => {
                        return (
                            <Link href={link.link} key={link.link} className="link-container liveurl-container" target="_blank">
                                <div className="project-link" style={{ fontSize: '1rem' }}>{link.title}</div>
                                <Arrow />
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default page