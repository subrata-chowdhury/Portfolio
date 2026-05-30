import React from "react";
import "./style.css";
import internshipArray from "@/app/data/internships";
import Link from "next/link";
import Arrow from "@/app/Icons/Arrow";
import { SkillsContainer } from "@/app/components/Skills";
import { skillsData } from "@/app/data/skills";
import InternetIcon from "@/app/Icons/Internet";
import Image from "next/image";
import { Metadata } from "next";

// 1. Tell Next.js to revalidate this page in the background every 7 days
export const revalidate = 604800;

// 2. Generate static paths for all internships at build time
export async function generateStaticParams() {
  return internshipArray.map((internship) => ({
    id: internship.id,
  }));
}

// 3. Strict typing for the page props
interface PageProps {
  params: Promise<{ id: string }>;
}

// 4. ADDED DYNAMIC METADATA GENERATION
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

  // CRITICAL FIX: Since internship.description is a JSX.Element, it cannot be used for SEO tags.
  // Constructing a plain text string representation instead.
  const seoDescription = `${internship.title} at ${internship.company}. Duration: ${internship.duration}. Location: ${internship.location}.`;

  const pageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/experiences/${id}`; // Update with your actual domain
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
      card: "summary", // Using 'summary' instead of 'summary_large_image' since it's a square logo
      title: `${internship.title} at ${internship.company}`,
      description: seoDescription,
      images: [imageUrl],
    },
  };
}

const Page = async (props: PageProps) => {
  const { id } = await props.params;

  // Use .find() instead of .filter()[0] for better performance and safety
  const internship = internshipArray.find((e) => e.id === id);

  if (!internship) {
    return <div className="empty-heading">Internship not found</div>;
  }

  // Refactored the 'for' loop into a modern, declarative '.map()' array method
  const projectSkills = internship.skills.map((skillName) => {
    const foundSkill = skillsData.find((e) => e.name === skillName);

    if (foundSkill) {
      return foundSkill;
    }

    // Fallback if the skill isn't found in skillsData
    return {
      name: skillName,
      iconSrc: "/icons/skill.webp",
      id: skillName.toLowerCase().split(" ").join("-"),
      lvl: 1,
    };
  });

  return (
    <div className="internship-page-container">
      <h1 className="heading" style={{ marginBottom: "0.2rem" }}>
        {internship.title}
      </h1>
      <Link
        href={internship.companyWebsiteLink}
        target="_blank"
        style={{
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
          marginBottom: "0.5rem",
          color: "var(--heading-color)",
        }}
      >
        <Image
          src={internship.iconSrc}
          width={50}
          height={50}
          alt={`${internship.company} logo`} // Added meaningful alt text for accessibility
          style={{ borderRadius: "100%" }}
        />
        <h2 style={{ fontSize: "1.2rem", marginTop: 0, marginBottom: 0 }}>
          {internship.company}
        </h2>
        <Arrow style={{ width: 15, height: 15, marginLeft: "0.2rem" }} />
      </Link>

      <div>
        <span style={{ fontWeight: 600 }}>Location:</span> {internship.location}
      </div>
      <div>
        <span style={{ fontWeight: 600 }}>Duration:</span> {internship.duration}
      </div>
      <div>
        <span style={{ fontWeight: 600 }}>Stipend:</span> {internship.stipend}
      </div>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginTop: "0.5rem",
          flexWrap: "wrap",
        }}
      >
        <Link
          className="link-container liveurl-container"
          target="_blank"
          href={internship.certificateSrc}
        >
          <div className="project-link">View Certificate</div>
          <Arrow />
        </Link>
        <Link
          className="link-container liveurl-container"
          target="_blank"
          href={internship.companyWebsiteLink}
        >
          <div className="project-link">Company Website</div>
          <InternetIcon />
        </Link>
        <Link
          className="link-container liveurl-container"
          target="_blank"
          href={internship.linkedInLink}
        >
          <div className="project-link">LinkedIn</div>
          <Arrow />
        </Link>
      </div>

      <h2 className="heading">Responsibilities & Contributions</h2>
      <div>{internship.description}</div>

      <h2 className="heading">Skills</h2>
      <SkillsContainer skillsData={projectSkills} />

      <h2 className="heading">Projects</h2>
      <div>
        {internship.workLinks.map((link, index) => {
          return (
            <div
              style={{
                padding: "1rem 1.2rem",
                border: "2px solid rgba(0, 0, 0, 0.15)",
                borderRadius: "0.7rem",
                marginBottom: "1rem",
                background: "var(--card-container-color)",
              }}
              key={index}
            >
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <Image
                  src={link.iconSrc}
                  width={40}
                  height={40}
                  alt={`${link.title} icon`}
                  style={{ borderRadius: "100%" }}
                />
                <h2 style={{ fontSize: "1.2rem", marginTop: 0 }}>
                  {link.title}
                </h2>
              </div>
              <div style={{ marginBottom: "0.5rem" }}>{link.description}</div>
              <Link
                href={link.link}
                className="link-container liveurl-container"
                target="_blank"
              >
                <div className="project-link" style={{ fontSize: "1rem" }}>
                  Product Link
                </div>
                <InternetIcon size={18} />
              </Link>
            </div>
          );
        })}
      </div>

      {internship.paySlips.length > 0 && (
        <>
          <h2 className="heading">Pay Slips</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              marginTop: "0.5rem",
            }}
          >
            {internship.paySlips.map((link) => {
              return (
                <Link
                  href={link.link}
                  key={link.link}
                  className="link-container liveurl-container"
                  target="_blank"
                >
                  <div className="project-link" style={{ fontSize: "1rem" }}>
                    {link.title}
                  </div>
                  <Arrow />
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
