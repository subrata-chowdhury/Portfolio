import { JSX } from "react";

const internshipArray: InternshipType[] = [{
    id: 'hirecream',
    title: "Web and Full Stack Development",
    company: "HireCream",
    location: "Remote",
    iconSrc: '/internships/companys/hirecream.webp',
    certificateSrc: '/internships/certificates/HireCream Internship Certificate.pdf',
    description: (<div>
        Contributed to the development of AI-driven solutions at AI4Chat, focusing on model-specific landing pages and robust backend integration.<br />

        <b>Landing Page Development:</b> Designed and deployed landing pages for various AI models, incorporating structured content sections, including features, FAQs, and user guides to enhance product accessibility.<br />

        <b>Backend Integration with Handlebars.js:</b> Created dynamic .hbs templates on the server-side, facilitating smooth rendering of model-specific content and improving page load efficiency.<br />

        <b>Database Management Using MongoDB:</b> Developed data retrieval mechanisms with MongoDB, ensuring up-to-date model data for frontend displays and maintaining data consistency across pages.<br />
    </div>),
    companyWebsiteLink: 'https://www.writecream.com/',
    linkedInLink: 'https://www.linkedin.com/company/hirecreamofficial/',
    workLinks: [
        {
            title: "AI4Chat",
            link: "https://www.ai4chat.co/",
            description: "AI4Chat - All in One AI platform - AI Chat, Image, Video, Music, Voice: All your favorite chatbots under one roof, including ChatGPT, OpenAI GPT4, Google Bard, Llama 2 & more. With multilingual support, voice & file chat and mobile apps.",
            iconSrc: '/internships/products/ai4chat.png'
        }
    ],
    skills: [
        "JavaScript",
        "GitHub",
        "Handlebars.js",
        "Bootstrap 5",
        "Express.js",
        "JSON",
        "CSS",
        "HTML",
        "Web Content Writing",
        "Web Development",
        "Back-End Web Development",
        "MongoDB",
        "Node.js",
        "Full-Stack Development",
        "Search Engine Optimization (SEO)",
        "Front-End Development"
    ],
    duration: "2 months (Sept 30, 2024 - Nov 30, 2024)",
    stipend: "5000₹/month",
    paySlips: [{
        link: '/internships/payslips/hirecream/Payslip for Nov 2024.pdf',
        title: 'Payslip for Nov 2024'
    }, {
        link: '/internships/payslips/hirecream/Payslip for Dec 2024.pdf',
        title: 'Payslip for Dec 2024'
    }],
}, {
    id: 'atg_world',
    title: "Web UI Developer & ReactJS Developer Intern ",
    company: "ATG World",
    location: "Remote",
    iconSrc: '/internships/companys/atg.webp',
    certificateSrc: '/internships/certificates/ATG World Internship Certificate.pdf',
    description: (<div>
        <ul>
            <li>Resolved <b>6,615 UI bugs</b> and <b>132 functional</b> frontend bugs, contributing significantly to the platform’s performance and user experience.</li>
            <li>Engaged in thorough bug analysis, reproduction, and resolution using React.js, Tailwind CSS, Redux Toolkit, CSS, and TypeScript.</li>
            <li>Gained in-depth understanding of the project workflow, including architectural diagrams like ER models, User Flow diagrams, and component hierarchies.</li>
            <li>Updated bug-tracking sheets daily to ensure task transparency and progress tracking.</li>
            <li>Managed and maintained GitHub repositories, including pull request creation, review, and merging, ensuring clean and stable code delivery.</li>
            <li>Participated in daily stand-up meetings, reporting completed tasks and blockers to maintain team alignment.</li>
        </ul>
        🧩 This internship was a cornerstone in my growth as a frontend developer, giving me hands-on experience with real-world SaaS products and high-level team collaboration.<br />
    </div>),
    companyWebsiteLink: 'https://www.atg.world/',
    linkedInLink: 'https://www.linkedin.com/company/across-the-globe-atg-/',
    workLinks: [
        {
            title: "Procurpal Web App",
            link: "https://procurpal.in/",
            description: "ProcUrPal is an AI-powered procurement platform designed for enterprises and governments. It simplifies sourcing, enhances supplier collaboration, and ensures compliance with smart automation and analytics. Founded by industry veteran Vikas Chadda, ProcUrPal delivers modern solutions to complex procurement challenges.",
            iconSrc: '/internships/products/procurpal.webp'
        }
    ],
    skills: [
        "React.js",
        "Redux.js",
        "TypeScript",
        "Tailwind CSS",
        "HTML",
        "CSS",
        "JavaScript",
        "Web Development",
        "Front-End Development",
        "Teamwork",
        "Communication",
        "Slack"
    ],
    duration: "6 months (July 27, 2024 - Jan 21, 2025)",
    stipend: "5000₹/month",
    paySlips: [{
        link: '/internships/payslips/atg-world/Payslip for Nov 2024.pdf',
        title: 'Payslip for Nov 2024'
    }, {
        link: '/internships/payslips/atg-world/Payslip for Dec 2024.pdf',
        title: 'Payslip for Dec 2024'
    }, {
        link: '/internships/payslips/atg-world/Payslip for Jan 2025.pdf',
        title: 'Payslip for Jan 2025'
    }],
}]

export default internshipArray;

export type InternshipType = {
    id: string;
    title: string;
    company: string;
    location: string;
    iconSrc: string;
    certificateSrc: string;
    description: JSX.Element;
    companyWebsiteLink: string;
    linkedInLink: string;
    workLinks: { title: string; link: string, description: JSX.Element | string, iconSrc: string }[];
    skills: string[];
    duration: string;
    stipend: string;
    paySlips: { link: string, title: string }[];
}