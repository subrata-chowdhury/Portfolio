import React from "react";
import internshipArray from "@/app/data/internships";
import Link from "next/link";
import { SkillsContainer } from "@/app/components/Skills";
import { skillsData } from "@/app/data/skills";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
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
          Internship Not Found
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          The experience you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  const projectSkills = internship.skills.map((skillName) => {
    const foundSkill = skillsData.find((e) => e.name === skillName);

    if (foundSkill) {
      return foundSkill;
    }

    return {
      name: skillName,
      iconSrc: "/icons/skill.webp",
      id: skillName.toLowerCase().split(" ").join("-"),
      lvl: 1,
    };
  });

  return (
    <div className="px-[5%] max-w-5xl mx-auto mt-24 mb-20 flex-grow text-gray-900 dark:text-gray-100">
      {/* Header Section */}
      <div className="flex flex-col items-start border-b border-gray-200 dark:border-white/10 pb-6 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-['Raleway'] m-0 mb-3">
          {internship.title}
        </h1>
        <Link
          href={internship.companyWebsiteLink}
          target="_blank"
          className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-max"
        >
          <div className="bg-white rounded-full p-1 border border-black/10 shadow-sm shrink-0">
            <Image
              src={internship.iconSrc}
              width={40}
              height={40}
              alt={`${internship.company} logo`}
              className="rounded-full object-contain"
            />
          </div>
          <h2 className="text-xl font-bold m-0">{internship.company}</h2>
          <FiExternalLink className="text-lg opacity-70" />
        </Link>
      </div>

      {/* Meta Information */}
      <div className="flex flex-col gap-2 mb-8 text-[1.05rem]">
        <div>
          <span className="font-bold text-gray-800 dark:text-gray-200 mr-2">
            Location:
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            {internship.location}
          </span>
        </div>
        <div>
          <span className="font-bold text-gray-800 dark:text-gray-200 mr-2">
            Duration:
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            {internship.duration}
          </span>
        </div>
        <div>
          <span className="font-bold text-gray-800 dark:text-gray-200 mr-2">
            Stipend:
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            {internship.stipend}
          </span>
        </div>
      </div>

      {/* Primary Action Links */}
      <div className="flex flex-wrap gap-4 mb-12">
        {internship.certificateSrc && (
          <Link
            href={internship.certificateSrc}
            target="_blank"
            className="inline-flex items-center gap-2 bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors px-5 py-2.5 rounded-lg font-bold"
          >
            <span>View Certificate</span>
            <FiArrowRight className="text-lg" />
          </Link>
        )}
        <Link
          href={internship.companyWebsiteLink}
          target="_blank"
          className="inline-flex items-center gap-2 bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors px-5 py-2.5 rounded-lg font-bold"
        >
          <span>Company Website</span>
          <FiExternalLink className="text-lg" />
        </Link>
        <Link
          href={internship.linkedInLink}
          target="_blank"
          className="inline-flex items-center gap-2 bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors px-5 py-2.5 rounded-lg font-bold"
        >
          <span>LinkedIn</span>
          <FiExternalLink className="text-lg" />
        </Link>
      </div>

      {/* Main Content Areas */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b-2 border-blue-500 w-max pb-1">
        Responsibilities & Contributions
      </h2>
      <div className="text-[1.05rem] leading-relaxed text-gray-700 dark:text-gray-300 mb-12">
        {internship.description}
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b-2 border-blue-500 w-max pb-1">
        Skills
      </h2>
      <div className="mb-12">
        <SkillsContainer skillsData={projectSkills} />
      </div>

      {/* Projects Undertaken */}
      {internship.workLinks.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b-2 border-blue-500 w-max pb-1">
            Projects
          </h2>
          <div className="flex flex-col gap-6 mb-12">
            {internship.workLinks.map((link, index) => (
              <div
                key={index}
                className="p-6 border-2 border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-[#1a1a1a] shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-white rounded-full p-1 border border-black/5 shadow-sm shrink-0">
                    <Image
                      src={link.iconSrc}
                      width={48}
                      height={48}
                      alt={`${link.title} icon`}
                      className="rounded-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold m-0">{link.title}</h3>
                </div>

                <div className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {link.description}
                </div>

                <Link
                  href={link.link}
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-blue-50 dark:bg-white/5 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-white/10 hover:bg-blue-100 dark:hover:bg-white/10 transition-colors px-4 py-2 rounded-lg font-bold text-sm w-max"
                >
                  <span>Product Link</span>
                  <FiExternalLink className="text-base" />
                </Link>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Pay Slips */}
      {internship.paySlips.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b-2 border-blue-500 w-max pb-1">
            Pay Slips
          </h2>
          <div className="flex flex-wrap gap-4 mt-2">
            {internship.paySlips.map((link) => (
              <Link
                href={link.link}
                key={link.link}
                target="_blank"
                className="inline-flex items-center gap-2 bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors px-5 py-2.5 rounded-lg font-bold"
              >
                <span>{link.title}</span>
                <FiArrowRight className="text-lg" />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
