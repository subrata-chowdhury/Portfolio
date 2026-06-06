"use client";

import { FiExternalLink, FiGithub, FiCalendar } from "react-icons/fi";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Gallery from "./Gallery";

export default function DetailedProjectView({
  name = "Name",
  repoName,
  description = "It's a Project",
  noOfCommits,
  createdAt,
  updatedAt,
  mainSkills = [],
  otherSkills = [],
  previewImageSrc,
  previewUiImages = [],
  liveUrl = null,
  ownerDetails,
}: {
  name: string;
  repoName?: string | null;
  description?: string;
  noOfCommits?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  mainSkills?: string[];
  otherSkills?: string[];
  previewImageSrc?: string;
  previewUiImages?: string[];
  liveUrl?: string | null;
  ownerDetails?: {
    name: string;
    role: string;
    url: string | null;
    feedback: string;
    stars?: number;
  };
}) {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 px-6 max-w-7xl mx-auto mt-22 md:mt-25 mb-20">
      {/* RIGHT COLUMN (Desktop) / TOP (Mobile) */}
      <div className="lg:col-span-5 order-2 flex flex-col gap-6">
        {previewImageSrc && (
          <div className="w-full rounded-2xl overflow-hidden border border-gray-200/75 dark:border-white/5 shadow-sm bg-gray-50 dark:bg-[#121212]">
            <Image
              src={"/" + previewImageSrc}
              alt={`${name} Main Preview`}
              width={800}
              height={450}
              className="w-full h-auto object-cover object-top"
              priority
            />
          </div>
        )}

        {/* Minimalist Commit Stat */}
        <div className="flex items-center justify-between w-full bg-white dark:bg-[#121212] border border-gray-200/75 dark:border-white/5 px-5 py-4 rounded-xl shadow-sm">
          <span className="text-sm font-medium text-gray-500">
            Total commits
          </span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {noOfCommits !== null && (noOfCommits || 0) > 0 ? (
              noOfCommits
            ) : (
              <span className="text-sm font-medium text-gray-400">Private</span>
            )}
          </span>
        </div>

        {/* Immediately Visible Grid Gallery */}
        {previewUiImages.length > 0 && <Gallery images={previewUiImages} />}
      </div>

      {/* LEFT COLUMN (Desktop) / BOTTOM (Mobile) */}
      <div className="lg:col-span-7 order-1 flex flex-col">
        {/* Header Section */}
        <div className="flex flex-col items-start pb-3 border-b border-gray-200/75 dark:border-white/5 mb-3">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {name}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <FiCalendar className="shrink-0" aria-hidden="true" />
            {createdAt && updatedAt
              ? `${new Date(createdAt).toLocaleDateString(undefined, { month: "short", year: "numeric" })} — ${new Date(updatedAt).toLocaleDateString(undefined, { month: "short", year: "numeric" })}`
              : "Timeline: N/A"}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          {description}
        </p>

        {/* Scaled-down Call to Actions */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {liveUrl && (
            <Link
              href={liveUrl}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 dark:focus:ring-offset-[#121212]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Live project</span>
              <FiExternalLink aria-hidden="true" />
            </Link>
          )}
          {noOfCommits !== null && (noOfCommits || 0) > 0 && repoName && (
            <Link
              href={`https://github.com/subrata-chowdhury/${repoName}`}
              className="inline-flex items-center justify-center gap-2 bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-neutral-700 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 dark:focus:ring-offset-[#121212]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Source code</span>
              <FiGithub aria-hidden="true" />
            </Link>
          )}
        </div>

        {/* Custom Minimalist Skill Chips */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Tech stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {mainSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-md border border-gray-200/50 dark:border-white/5"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {otherSkills.length > 0 && (
          <div className="mb-10">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Tools & methodologies
            </h2>
            <div className="flex flex-wrap gap-2">
              {otherSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-gray-50 dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-400 text-xs font-medium rounded-md border border-gray-200/50 dark:border-white/5"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Owner Feedback */}
        {ownerDetails && (
          <div className="mt-2 p-5 md:p-6 bg-white dark:bg-[#121212] rounded-2xl border border-gray-200/75 dark:border-white/5 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white bg-blue-600 shrink-0 shadow-sm">
                  {ownerDetails.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <div className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {ownerDetails.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {ownerDetails.role}
                  </div>
                </div>
              </div>
              <FaQuoteLeft
                className="text-gray-200 dark:text-gray-800 text-lg shrink-0"
                aria-hidden="true"
              />
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed m-0 italic">
              &quot;{ownerDetails.feedback}&quot;
            </p>

            {ownerDetails.stars !== undefined && (
              <div
                className="flex gap-1"
                aria-label={`Rating: ${ownerDetails.stars} out of 5`}
              >
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`text-xs ${
                      index < (ownerDetails.stars || 5)
                        ? "text-amber-400"
                        : "text-gray-200 dark:text-gray-800"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
