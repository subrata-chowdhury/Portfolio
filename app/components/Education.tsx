import { FiExternalLink } from "react-icons/fi";
import Certifications from "./Certifications";

const educationData = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    period: "2021 - 2025",
    institution: "Bengal College of Engineering & Technology",
    location: "Durgapur, India",
    marks: "82.0%",
    certificateLink: "/files/Provisional Certificate.pdf",
  },
  {
    degree: "Higher Secondary (Class XII)",
    period: "2020 - 2021",
    institution: "Barjora High School",
    location: "Bankura, India",
    marks: "83.2%",
    certificateLink: "/files/HS Marksheet.pdf",
  },
];

export default function Education() {
  return (
    <section
      className="px-6 py-12 md:py-20 max-w-7xl mx-auto w-full"
      id="education"
    >
      <div className="flex items-center gap-5 mb-10 md:mb-14">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 animate-[slide-right_1s_ease-out]">
          Education & Background
        </h2>
        <div className="h-[1px] flex-1 bg-gray-200 dark:bg-gray-800 hidden sm:block" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left Column: Education Timeline */}
        <div className="flex flex-col">
          <div className="relative border-l border-gray-200 dark:border-gray-800 ml-3 md:ml-4 space-y-8 md:space-y-16">
            {educationData.map((item, index) => (
              <EducationTimelineItem
                key={index}
                {...item}
                animationDelay={index * 0.2}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Certifications */}
        <div className="flex flex-col w-full h-full">
          <Certifications />
        </div>
      </div>
    </section>
  );
}

function EducationTimelineItem({
  degree,
  period,
  institution,
  location,
  marks,
  certificateLink,
  animationDelay,
}: {
  degree: string;
  period: string;
  institution: string;
  location: string;
  marks: string;
  certificateLink: string;
  animationDelay: number;
}) {
  return (
    <div
      className="relative pl-6 md:pl-8 group animate-[fade-in_0.8s_ease-out_forwards]"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      {/* Timeline Dot */}
      <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-[6.5px] top-1.5 ring-4 ring-white dark:ring-[#121212] group-hover:scale-125 transition-transform duration-300" />

      <div className="flex flex-col gap-1.5 md:gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
            {degree}
          </h3>
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 shrink-0">
            {period}
          </span>
        </div>

        <div className="text-[0.95rem] text-gray-700 dark:text-gray-300 font-medium">
          {institution}
          <span className="text-gray-500 dark:text-gray-400 font-normal ml-1">
            • {location}
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-3 mt-2">
          {/* Minimalist Grade Badge */}
          <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-bold border border-blue-100 dark:border-blue-800/50">
            Score: {marks}
          </div>

          <a
            href={certificateLink}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group/link"
            target="_blank"
            rel="noreferrer"
            aria-label={`View certificate for ${degree}`}
          >
            <span>View Document</span>
            <FiExternalLink className="text-xs" />
          </a>
        </div>
      </div>
    </div>
  );
}
