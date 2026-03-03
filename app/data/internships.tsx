import { JSX } from "react";

const internshipArray: InternshipType[] = [
  {
    id: "hirecream",
    title: "Web and Full Stack Development",
    company: "HireCream",
    location: "Remote",
    iconSrc: "/internships/companys/hirecream.webp",
    certificateSrc:
      "/internships/certificates/HireCream Internship Certificate.pdf",
    description: (
      <div>
        Contributed to the development of AI-driven solutions at AI4Chat,
        focusing on model-specific landing pages and robust backend integration.
        <br />
        <b>Landing Page Development:</b> Designed and deployed landing pages for
        various AI models, incorporating structured content sections, including
        features, FAQs, and user guides to enhance product accessibility.
        <br />
        <b>Backend Integration with Handlebars.js:</b> Created dynamic .hbs
        templates on the server-side, facilitating smooth rendering of
        model-specific content and improving page load efficiency.
        <br />
        <b>Database Management Using MongoDB:</b> Developed data retrieval
        mechanisms with MongoDB, ensuring up-to-date model data for frontend
        displays and maintaining data consistency across pages.
        <br />
      </div>
    ),
    companyWebsiteLink: "https://www.writecream.com/",
    linkedInLink: "https://www.linkedin.com/company/hirecreamofficial/",
    workLinks: [
      {
        title: "AI4Chat",
        link: "https://www.ai4chat.co/",
        description:
          "AI4Chat - All in One AI platform - AI Chat, Image, Video, Music, Voice: All your favorite chatbots under one roof, including ChatGPT, OpenAI GPT4, Google Bard, Llama 2 & more. With multilingual support, voice & file chat and mobile apps.",
        iconSrc: "/internships/products/ai4chat.png",
      },
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
      "Backend Development",
      "MongoDB",
      "Node.js",
      "Full Stack Development",
      "Search Engine Optimization (SEO)",
      "Frontend Development",
    ],
    duration: "2 months (Sept 30, 2024 - Nov 30, 2024)",
    stipend: "5000₹/month",
    paySlips: [
      {
        link: "/internships/payslips/hirecream/Payslip for Nov 2024.pdf",
        title: "Payslip for Nov 2024",
      },
      {
        link: "/internships/payslips/hirecream/Payslip for Dec 2024.pdf",
        title: "Payslip for Dec 2024",
      },
    ],
  },
  {
    id: "banao_technologies",
    title: "MERN Stack Developer Intern",
    company: "Banao Technologies",
    location: "Remote",
    iconSrc: "/internships/companys/banao.webp",
    certificateSrc: "/internships/certificates/Banao Offer Letter.pdf",
    description: (
      <div>
        <ul>
          <li>
            Resolved <strong>UI and functionality issues</strong> using{" "}
            <strong>React</strong>, <strong>TypeScript</strong>, and{" "}
            <strong>Redux Toolkit</strong> to optimize platform performance and
            user experience.
          </li>
          <li>
            Contributed to <strong>CI/CD pipelines</strong>, conducted{" "}
            <strong>pull request (PR) reviews</strong>, and managed{" "}
            <strong>bug tracking</strong> within{" "}
            <strong>Agile workflows</strong> to ensure stable code delivery.
          </li>
          <li>
            Managed <strong>concurrent development tasks</strong> across{" "}
            <strong>3 active projects</strong>, efficiently balancing priorities
            to meet strict project milestones.
          </li>
          <li>
            <strong>Promoted to Frontend Lead</strong>, taking ownership and
            successfully driving the <strong>technical delivery</strong> for{" "}
            <strong>2 key projects</strong>.
          </li>
        </ul>
        🧩 This role was a cornerstone in my growth as a{" "}
        <strong>frontend developer</strong>, giving me hands-on experience with{" "}
        <strong>real-world SaaS products</strong>, cross-functional
        collaboration, and <strong>technical leadership</strong>.
        <br />
      </div>
    ),
    companyWebsiteLink: "https://banao.tech/",
    linkedInLink: "https://www.linkedin.com/company/banao-tech",
    workLinks: [
      {
        title: "Vikaas AI App",
        link: "https://vikaas.ai/",
        description:
          "AI-powered lead generation and outreach platform that automates prospecting, enriches lead data, identifies high-intent prospects, and delivers personalized messaging with real-time signals—helping teams engage faster, qualify better, and convert more revenue.",
        iconSrc: "/internships/products/vikaas.webp",
      },
      {
        title: "ATG Meet Recorder",
        link: "https://meet.atg.party",
        description:
          "ATG Meet Recorder is an AI-powered meeting assistant that records, transcribes, summarizes, and analyzes your meetings.",
        iconSrc: "/internships/companys/atg.webp",
      },
      {
        title: "Banao Technologies",
        link: "https://banao.tech/",
        description:
          "Banao Technologies is a leading IT company specializing in web and mobile app development, UI/UX design, and digital marketing solutions.",
        iconSrc: "/internships/companys/banao.webp",
      },
    ],
    skills: [
      "React",
      "Redux",
      "TypeScript",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "JavaScript",
      "Web Development",
      "Frontend Development",
      "Teamwork",
      "Communication",
      "Slack",
    ],
    duration: "6 months (Nov 4, 2024 - Ongoing)",
    stipend: "10000₹/month",
    paySlips: [],
    // paySlips: [{
    //     link: '/internships/payslips/atg-world/Payslip for Nov 2024.pdf',
    //     title: 'Payslip for Nov 2024'
    // }, {
    //     link: '/internships/payslips/atg-world/Payslip for Dec 2024.pdf',
    //     title: 'Payslip for Dec 2024'
    // }, {
    //     link: '/internships/payslips/atg-world/Payslip for Jan 2025.pdf',
    //     title: 'Payslip for Jan 2025'
    // }],
  },
];

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
  workLinks: {
    title: string;
    link: string;
    description: JSX.Element | string;
    iconSrc: string;
  }[];
  skills: string[];
  duration: string;
  stipend: string;
  paySlips: { link: string; title: string }[];
};
