import React from 'react'
import Arrow from '../Icons/Arrow'
import "../style/Certification.css"

const certifications = [
    {
        title: "Frontend Development (React) || HackerRank",
        link: "https://www.hackerrank.com/certificates/4a6f360b155e",
        // imgSrc: "./certifications/responsive-web-design.png"
    }, {
        title: "JavaScript (Intermediate) || HackerRank",
        link: "https://www.hackerrank.com/certificates/c58cd6bd1b6d",
        // imgSrc: "./certifications/javascript-algorithms-and-data-structures.png"
    }, {
        title: "Java (Basic) || HackerRank",
        link: "https://www.hackerrank.com/certificates/1460fea5d18d",
        // imgSrc: "./certifications/front-end-libraries.png"//
    }, {
        title: "Foundations: Data, Data, Everywhere || Coursera",
        link: "https://coursera.org/verify/GDZHXWY2ETMV",
    }
    //, {
    //     title: "APIs and Microservices",
    //     link: "https://www.freecodecamp.org/certification/fccf2b2f7d3-4b7d-4b3b-8b3b-3b3b3b3b3b3b/apis-and-microservices",
    //     imgSrc: "./certifications/apis-and-microservices.png"
    // }, {
    //     title: "Quality Assurance",
    //     link: "https://www.freecodecamp.org/certification/fccf2b2f7d3-4b7d-4b3b-8b3b-3b3b3b3b3b3b/quality-assurance-v7",
    //     imgSrc: "./certifications/quality-assurance.png"
    // }, {
    //     title: "Scientific Computing with Python",
    //     link: "https://www.freecodecamp.org/certification/fccf2b2f7d3-4b7d-4b3b-8b3b-3b3b3b3b3b3b/scientific-computing-with-python-v7",
    //     imgSrc: "./certifications/scientific-computing-with-python.png"
    // }, {
    //     title: "Data Analysis with Python",
    //     link: "https://www.freecodecamp.org/certification/fccf2b2f7d3-4b7d-4b3b-8b3b-3b3b3b3b3b3b/data-analysis-with-python-v7",
    // }
]

export default function Certifications() {
    return (
        <div className="screen-container">
            <div className="heading" id="project">
                <div>Certifications</div>
            </div>
            <CertificationContainer certifications={certifications} />
        </div>
    )
}

function CertificationContainer({ certifications }) {
    return (
        <div className="certification-container">
            {certifications.map(certification => <Certification {...certification} key={certification.title} />)}
        </div>
    )
}

function Certification({ title, link }) {
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