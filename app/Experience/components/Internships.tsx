import internshipArray, { InternshipType } from '@/app/data/internships';
import '../style.css'
import React from 'react'
import Link from 'next/link';
import Arrow from '@/app/Icons/Arrow';
import Image from 'next/image';

function Internships() {
    return (
        <div className='internships-page-container'>
            <h1 className='heading'>Internships</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {
                    internshipArray.map(internship =>
                        <InternshipCard key={internship.id} internship={internship} />
                    )
                }
            </div>
        </div>
    )
}

export default Internships;

const InternshipCard = ({ internship }: { internship: InternshipType }) => {
    return (
        <div style={{ padding: '0.8rem 1.2rem', borderRadius: '0.6rem', border: '2px solid rgba(0,0,0,0.15)', background: "var(--card-container-color)", color: "var(--text-color)" }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                <Image src={internship.iconSrc} width={50} height={50} alt='' style={{ borderRadius: '100%' }} />
                <h2 style={{ fontSize: '1.4rem' }}>{internship.title}</h2>
            </div>
            <Link className="link-container" target="_blank" href={internship.linkedInLink}>
                <div className="project-link">{internship.company}</div>
                <Arrow />
            </Link>
            <div>{internship.location}</div>
            <div>{internship.duration}</div>
            <div className='project-link-containe' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <Link className="link-container" target="_blank" href={internship.certificateSrc}>
                    <div className="project-link">View Certificate</div>
                    <Arrow />
                </Link>
                <Link href={'/Experience/' + internship.id} style={{ padding: '0.5rem 0.85rem' }} className="more-details btn">More Details</Link>
            </div>
            {/* <div className="">{internship.description}</div> */}
        </div>
    )
}