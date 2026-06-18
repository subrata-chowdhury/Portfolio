"use client";

import {
  FiExternalLink,
  FiArrowRight,
  FiCheckCircle,
  FiTarget,
  FiZap,
} from "react-icons/fi";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Gallery from "./Gallery";
import { ProjectType } from "@/app/data/projects";

export default function DetailedProjectView(project: ProjectType) {
  const {
    name,
    description,
    challenge,
    solution,
    outcomes,
    previewImageSrc,
    previewUiImages = [],
    liveUrl,
    ownerDetails,
    clientProject,
  } = project;

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 px-6 max-w-7xl mx-auto mt-22 md:mt-25 mb-20">
      {/* LEFT COLUMN: The Narrative (Challenge, Solution, Gallery) */}
      <div className="lg:col-span-8 order-2 lg:order-1 flex flex-col">
        {/* Header Section */}
        <div className="mb-6 md:mb-8 pb-5 border-b border-gray-200/75 dark:border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              {name}
            </h1>
            {clientProject && (
              <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 text-[0.6rem] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 mt-1">
                Client Success
              </span>
            )}
          </div>
          <p className="text-sm md:text-[0.95rem] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
            {description}
          </p>
        </div>

        {/* The "Numbers Park" / Business Outcomes */}
        {outcomes && outcomes.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {outcomes.map((metric, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-sm hover:-translate-y-0.5 transition-transform"
              >
                <span className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-tight mb-0.5">
                  {metric.value}
                </span>
                <span className="text-[0.65rem] md:text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Engaging Challenge & Solution Narrative */}
        <div className="flex flex-col gap-5 mb-10">
          {challenge && (
            <section className="relative p-5 md:p-6 bg-red-50/50 dark:bg-red-900/10 border-l-4 border-red-500 rounded-r-xl">
              <h2 className="text-sm md:text-base font-bold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2 uppercase tracking-wide">
                <FiTarget className="text-lg" aria-hidden="true" />
                The Problem
              </h2>
              <p className="text-[0.9rem] md:text-[0.95rem] text-gray-700 dark:text-gray-300 leading-relaxed m-0">
                {challenge}
              </p>
            </section>
          )}

          {solution && (
            <section className="relative p-5 md:p-6 bg-emerald-50/50 dark:bg-emerald-900/10 border-l-4 border-emerald-500 rounded-r-xl">
              <h2 className="text-sm md:text-base font-bold text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2 uppercase tracking-wide">
                <FiZap className="text-lg" aria-hidden="true" />
                The Solution
              </h2>
              <p className="text-[0.9rem] md:text-[0.95rem] text-gray-700 dark:text-gray-300 leading-relaxed m-0">
                {solution}
              </p>
            </section>
          )}
        </div>

        {/* Visual Gallery */}
        {previewUiImages.length > 0 && (
          <div className="pt-2">
            <Gallery images={previewUiImages} />
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: The Sticky Sidebar (Testimonial, Links, CTA) */}
      <div className="lg:col-span-4 order-1 lg:order-2">
        <div className="sticky top-28 flex flex-col gap-5">
          {/* Main Hero Image */}
          {previewImageSrc && (
            <div className="w-full rounded-xl overflow-hidden shadow-sm bg-gray-50 dark:bg-[#121212] border border-gray-100 dark:border-white/5">
              <Image
                src={"/" + previewImageSrc}
                alt={`${name} Dashboard Preview`}
                width={600}
                height={400}
                className="w-full h-auto object-cover object-top"
                priority
              />
            </div>
          )}

          {/* Call to Action for This Project */}
          <div className="flex flex-col gap-2.5">
            {liveUrl ? (
              <Link
                href={liveUrl}
                className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-blue-600/20 hover:-translate-y-0.5 focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 dark:focus:ring-offset-[#121212]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>View Live Project</span>
                <FiExternalLink aria-hidden="true" />
              </Link>
            ) : null}

            <Link
              href="/#contact"
              className="w-full inline-flex items-center justify-center gap-2 bg-gray-100 dark:bg-[#1a1a1a] hover:bg-gray-200 dark:hover:bg-[#252525] text-gray-900 dark:text-white px-5 py-3 rounded-lg text-sm font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 dark:focus:ring-offset-[#121212]"
            >
              <span>Request Similar Project</span>
              <FiArrowRight aria-hidden="true" />
            </Link>
          </div>

          {/* Social Proof / Testimonial */}
          {ownerDetails && (
            <div className="p-5 bg-white dark:bg-[#121212] rounded-xl border border-gray-200/75 dark:border-white/5 shadow-sm flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white bg-blue-600 shrink-0">
                    {ownerDetails.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[0.85rem] font-bold text-gray-900 dark:text-white leading-tight">
                      {ownerDetails.name}
                    </div>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {ownerDetails.role}
                    </div>
                  </div>
                </div>
                <FaQuoteLeft className="text-gray-200 dark:text-gray-800 text-lg shrink-0" />
              </div>

              <p className="text-[0.85rem] text-gray-600 dark:text-gray-300 leading-relaxed italic m-0">
                &quot;{ownerDetails.feedback}&quot;
              </p>

              {ownerDetails.stars !== undefined && (
                <div className="flex gap-0.5 pt-1">
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

          {/* New Tag/Badge Based "Project Highlights" Section */}
          <div className="mt-2 pt-5 border-t border-gray-200/75 dark:border-white/5">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
              <FiCheckCircle className="text-blue-500" aria-hidden="true" />
              Project Highlights
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium border border-emerald-100 dark:border-emerald-800/30">
                SEO Optimized
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-medium border border-blue-100 dark:border-blue-800/30">
                High Performance
              </span>
              {project.mainSkills?.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-xs font-medium border border-gray-200/75 dark:border-white/5"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
