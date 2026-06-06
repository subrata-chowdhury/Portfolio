import React from "react";
import internshipArray from "@/app/data/internships";
import Link from "next/link";
import {
  FiArrowRight,
  FiExternalLink,
  FiMapPin,
  FiCalendar,
  FiDollarSign,
  FiAward,
  FiFileText,
} from "react-icons/fi";
import Image from "next/image";
import { Metadata } from "next";

export const revalidate = 604800;

export async function generateStaticParams() {
  return internshipArray.map((internship) => ({
    id: internship.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { id } = await props.params;
  const internship = internshipArray.find((e) => e.id === id);

  if (!internship) {
    return {
      title: "Experience Not Found",
      description:
        "The experience or internship you are looking for does not exist.",
    };
  }

  const seoDescription = `${internship.title} at ${internship.company}. Duration: ${internship.duration}. Location: ${internship.location}.`;
  const pageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/experiences/${id}`;
  const imageUrl = `/${internship.iconSrc}`;

  return {
    title: `${internship.title} at ${internship.company} | Experience`,
    description: seoDescription,
    openGraph: {
      title: `${internship.title} at ${internship.company}`,
      description: seoDescription,
      url: pageUrl,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 400,
          height: 400,
          alt: `${internship.company} Logo`,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${internship.title} at ${internship.company}`,
      description: seoDescription,
      images: [imageUrl],
    },
  };
}

const Page = async (props: PageProps) => {
  const { id } = await props.params;
  const internship = internshipArray.find((e) => e.id === id);

  if (!internship) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center mt-20 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Experience Not Found
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          The role you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-16 px-6 max-w-7xl mx-auto mt-20 md:mt-30 mb-24">
      {/* RIGHT COLUMN (Desktop) / TOP (Mobile) - Meta & Actions */}
      <div className="lg:col-span-4 order-1 lg:order-2 flex flex-col gap-6">
        {/* Company Card */}
        <div className="flex flex-col bg-gray-50 dark:bg-[#121212] border border-gray-200/75 dark:border-white/5 p-6 rounded-[1.25rem] shadow-sm">
          <div className="flex items-center gap-4 border-b border-gray-200/75 dark:border-white/5 pb-5 mb-5">
            <div className="w-14 h-14 bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-center shrink-0">
              <Image
                src={internship.iconSrc}
                width={36}
                height={36}
                alt={`${internship.company} logo`}
                className="object-contain w-9 h-9"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">
                {internship.company}
              </h2>
              <Link
                href={internship.companyWebsiteLink}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline mt-0.5"
              >
                <span>Visit Website</span>
                <FiExternalLink aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-sm font-medium text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-3">
              <FiCalendar
                className="text-gray-400 dark:text-gray-500 text-base shrink-0"
                aria-hidden="true"
              />
              <span>{internship.duration}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiMapPin
                className="text-gray-400 dark:text-gray-500 text-base shrink-0"
                aria-hidden="true"
              />
              <span>{internship.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiDollarSign
                className="text-gray-400 dark:text-gray-500 text-base shrink-0"
                aria-hidden="true"
              />
              <span>{internship.stipend}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {internship.certificateSrc && (
            <Link
              href={internship.certificateSrc}
              target="_blank"
              className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 dark:focus:ring-offset-[#121212]"
            >
              <FiAward className="text-lg" aria-hidden="true" />
              <span>View Certificate</span>
            </Link>
          )}
          <Link
            href={internship.linkedInLink}
            target="_blank"
            className="w-full inline-flex items-center justify-center gap-2 bg-white dark:bg-[#1a1a1a] hover:bg-gray-50 dark:hover:bg-neutral-800 text-gray-900 dark:text-white border border-gray-200/75 dark:border-white/5 px-6 py-3 rounded-xl font-medium transition-colors shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 dark:focus:ring-offset-[#121212]"
          >
            <span>Company LinkedIn</span>
            <FiExternalLink aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* LEFT COLUMN (Desktop) / BOTTOM (Mobile) - Main Content */}
      <div className="lg:col-span-8 order-2 lg:order-1 flex flex-col">
        {/* Header */}
        <div className="pb-3 border-b border-gray-200/75 dark:border-white/5 mb-4">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
            {internship.title}
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400">
            Professional Experience & Contributions
          </p>
        </div>

        {/* Responsibilities */}
        <div className="mb-12">
          <div className="text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300 [&>div>ul]:list-disc [&>div>ul]:pl-5 [&>div>ul>li]:mb-2 [&>div>b]:text-gray-900 dark:[&>div>b]:text-white [&>div>strong]:text-gray-900 dark:[&>div>strong]:text-white">
            {internship.description}
          </div>
        </div>

        {/* Minimalist Skills Chips */}
        {internship.skills && internship.skills.length > 0 && (
          <div className="mb-12">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Technologies & Skills Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {internship.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 text-xs font-medium rounded-md border border-gray-200/50 dark:border-white/5"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects Undertaken (Sleeker UI) */}
        {internship.workLinks && internship.workLinks.length > 0 && (
          <div className="mb-12">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Key Projects Delivered
            </h2>
            <div className="flex flex-col gap-4">
              {internship.workLinks.map((link, index) => (
                <div
                  key={index}
                  className="p-5 md:p-6 md:py-4 bg-white dark:bg-[#121212] border border-gray-200/75 dark:border-white/5 rounded-2xl shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg border border-gray-100 dark:border-white/5 flex items-center justify-center shrink-0 p-1">
                      <Image
                        src={link.iconSrc}
                        width={32}
                        height={32}
                        alt={`${link.title} icon`}
                        className="object-contain rounded-md"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">
                      {link.title}
                    </h3>
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                    {link.description}
                  </div>

                  <Link
                    href={link.link}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors w-max group"
                  >
                    <span>View Product</span>
                    <FiArrowRight
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documents / Pay Slips */}
        {internship.paySlips && internship.paySlips.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Official Documents
            </h2>
            <div className="flex flex-wrap gap-3">
              {internship.paySlips.map((doc) => (
                <Link
                  href={doc.link}
                  key={doc.link}
                  target="_blank"
                  className="inline-flex items-center gap-2.5 bg-gray-50 dark:bg-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#252525] border border-gray-200/75 dark:border-white/5 text-gray-700 dark:text-gray-300 transition-colors px-4 py-2.5 rounded-lg text-sm font-medium"
                >
                  <FiFileText
                    className="text-gray-400 dark:text-gray-500 text-lg shrink-0"
                    aria-hidden="true"
                  />
                  <span>{doc.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
