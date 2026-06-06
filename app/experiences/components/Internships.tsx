import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiArrowRight,
  FiExternalLink,
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";
import internshipArray, { InternshipType } from "@/app/data/internships";

function Internships({
  containerStyle = {},
}: {
  containerStyle?: React.CSSProperties;
}) {
  return (
    <section
      className="px-6 py-12 md:py-20 max-w-7xl mx-auto w-full"
      style={containerStyle}
      id="experiences"
    >
      <div className="mb-8 md:mb-10">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 mb-2 md:mb-3 animate-[slide-right_1s_ease-out]">
          Experiences
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-xl leading-relaxed animate-[slide-right_1s_ease-out_0.2s]">
          My professional journey, internships, and roles in software
          development.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {internshipArray.map((internship, index) => (
          <InternshipCard
            key={internship.id}
            internship={internship}
            animationDelay={index}
          />
        ))}
      </div>
    </section>
  );
}

export default Internships;

const InternshipCard = ({
  internship,
  animationDelay,
}: {
  internship: InternshipType;
  animationDelay: number;
}) => {
  // Display only the first 3 skills to keep the card minimalist
  const visibleSkills = internship.skills.slice(0, 3);
  const remainingSkillsCount = internship.skills.length - visibleSkills.length;

  return (
    <article
      className="group flex flex-col h-full bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/5 rounded-2xl p-6 hover:bg-white dark:hover:bg-gray-800 hover:border-blue-200 dark:hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/5 animate-[slide-up_0.5s_ease-out_forwards]"
      style={{ animationDelay: `${animationDelay * 0.15 + 0.3}s` }}
    >
      {/* Header section: Logo and Titles */}
      <div className="flex items-start gap-4 mb-5">
        <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 group-hover:scale-105 transition-transform duration-300">
          <Image
            src={internship.iconSrc}
            width={32}
            height={32}
            alt={`${internship.company} logo`}
            className="object-contain rounded w-8 h-8 md:w-9 md:h-9"
          />
        </div>

        <div className="flex flex-col pt-1">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-50 leading-tight">
            {internship.title}
          </h3>
          <Link
            href={internship.linkedInLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-1 text-sm font-medium text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors w-max"
            aria-label={`Visit ${internship.company} LinkedIn page`}
          >
            <span>{internship.company}</span>
            <FiExternalLink aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Meta Information: Timeline & Location */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-5 text-sm text-gray-600 dark:text-gray-400 font-medium">
        <div className="flex items-center gap-2">
          <FiCalendar
            className="text-gray-400 dark:text-gray-500 shrink-0"
            aria-hidden="true"
          />
          <span>{internship.duration.split(" (")[0]}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiMapPin
            className="text-gray-400 dark:text-gray-500 shrink-0"
            aria-hidden="true"
          />
          <span>{internship.location}</span>
        </div>
      </div>

      {/* Skills Snapshot */}
      <div className="flex flex-wrap gap-2 mb-4">
        {visibleSkills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 text-xs font-semibold bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg shadow-sm"
          >
            {skill}
          </span>
        ))}
        {remainingSkillsCount > 0 && (
          <span className="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 rounded-lg border border-transparent">
            +{remainingSkillsCount} more
          </span>
        )}
      </div>

      {/* Footer Actions */}
      <div className="mt-auto pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 dark:border-gray-800/50">
        {internship.certificateSrc ? (
          <Link
            href={internship.certificateSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors order-2 sm:order-1"
          >
            <span>View Certificate</span>
            <FiArrowRight aria-hidden="true" />
          </Link>
        ) : (
          <div className="order-2 sm:order-1 hidden sm:block" />
        )}

        <Link
          href={`/experiences/${internship.id}`}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-blue-600/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 dark:focus:ring-offset-gray-900 text-sm text-center order-1 sm:order-2"
        >
          More Details
        </Link>
      </div>
    </article>
  );
};
