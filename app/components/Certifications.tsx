import React from 'react'
import Arrow from '../Icons/Arrow'
import "@/app/styles/Certification.css"
import { certificates } from '../data/certificates'
import Image from 'next/image'

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

function CertificationContainer({ certifications }: { certifications: { title: string, link: string, imgSrc: string }[] }) {
    return (
        <div className="certification-container">
            {certifications.map(certification => <Certification {...certification} key={certification.title} />)}
        </div>
    )
}

function Certification({ title, link, imgSrc }: { title: string, link: string, imgSrc: string }) {
    return (
        <div className="certification education-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Image src={imgSrc} width={40} height={40} alt={title} style={{ objectFit: 'contain', objectPosition: 'center center' }} />
                <div> {title}</div>
            </div>
            <a className="link-container" target="_blank" href={link}>
                <div className="project-link">View Here</div>
                <Arrow />
            </a>
        </div>
    )
}