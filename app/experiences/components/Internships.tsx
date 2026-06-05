import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import internshipArray, { InternshipType } from "@/app/data/internships";

function Internships({
  containerStyle = {},
}: {
  containerStyle?: React.CSSProperties;
}) {
  return (
    <div
      className="px-[5%] mt-24 max-w-8xl mx-auto flex-grow w-full"
      style={containerStyle}
    >
      <h1 className="text-3xl md:text-4xl font-bold font-['Raleway'] text-gray-900 dark:text-gray-100 mb-8">
        Experiences
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {internshipArray.map((internship) => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
      </div>
    </div>
  );
}

export default Internships;

const InternshipCard = ({ internship }: { internship: InternshipType }) => {
  return (
    <div className="flex flex-col bg-white dark:bg-[#1a1a1a] rounded-xl border-2 border-black/15 dark:border-white/10 p-5 lg:p-6 text-gray-900 dark:text-gray-100 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
      {/* Header: Icon and Title */}
      <div className="flex items-center gap-4 mb-4">
        <div className="shrink-0 bg-white rounded-full p-1 border border-black/10 shadow-sm">
          <Image
            src={internship.iconSrc}
            width={45}
            height={45}
            alt={`${internship.company} logo`}
            className="rounded-full object-contain"
          />
        </div>
        <h2 className="text-[1.3rem] lg:text-[1.4rem] font-bold leading-tight">
          {internship.title}
        </h2>
      </div>

      {/* Company Link */}
      <Link
        className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold hover:underline w-max mb-2 text-[1.05rem]"
        target="_blank"
        href={internship.linkedInLink}
      >
        <span>{internship.company}</span>
        <FiExternalLink className="text-sm" />
      </Link>

      {/* Meta Info: Location & Duration */}
      <div className="flex flex-col gap-1 mb-2">
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            Location:
          </span>{" "}
          {internship.location}
        </div>
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            Duration:
          </span>{" "}
          {internship.duration}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between items-center mt-auto pt-3 flex-wrap gap-4">
        {internship.certificateSrc ? (
          <Link
            className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            target="_blank"
            href={internship.certificateSrc}
          >
            <span>View Certificate</span>
            <FiArrowRight className="text-sm" />
          </Link>
        ) : (
          <div /> /* Empty div to keep 'More Details' aligned right if no certificate */
        )}

        <Link
          href={`/experiences/${internship.id}`}
          className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-blue-700 active:bg-blue-800"
        >
          More Details
        </Link>
      </div>
    </div>
  );
};
