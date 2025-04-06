import React from 'react'
import Arrow from '../Icons/Arrow'
import "@/app/styles/Certification.css"
import { certificates } from '../data/certificates'

export default function Certifications() {
    return (
        <section className="screen-container">
            <div className="heading" id="certifications">
                <div>Certifications</div>
            </div>
            <CertificationContainer certifications={certificates} />
        </section>
    )
}

function CertificationContainer({ certifications }: { certifications: { title: string, link: string }[] }) {
    return (
        <div className="certification-container">
            {certifications.map(certification => <Certification {...certification} key={certification.title} />)}
        </div>
    )
}

function Certification({ title, link }: { title: string, link: string }) {
    return (
        <div className="certification education-card">
            <div>{title}</div>
            <a className="link-container" target="_blank" href={link}>
                <div className="project-link">View Here</div>
                <Arrow />
            </a>
        </div>
    )
}