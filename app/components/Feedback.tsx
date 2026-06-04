import React from "react";
import "@/app/styles/Feedback.css";
import Star from "../Icons/Star";
import { projectsData } from "../data/projects";

// Deterministic color generator based on the name (Fixes Next.js Hydration Errors)
function getColorForName(name: string): string {
  // A professional palette aligned with the site's blue/dark theme
  const colors = [
    "#2f6ce5", // Primary Brand Blue
    "#1e4bb5", // Darker Brand Blue
    "#4f87f6", // Lighter Brand Blue
    "#374151", // Slate Gray (Dark)
    "#4b5563", // Slate Gray (Medium)
    "#272829", // Primary Text Color (Almost Black)
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

// Expanded mock data with avatar background colors
const feedbackData = [
  {
    id: 1,
    clientName: "Michael R.",
    company: "Local Plumbing Services",
    feedback:
      "Subrata completely transformed our outdated website. The new Next.js site is lightning fast, and we saw an immediate drop in bounce rates. The free mockup upfront showed me exactly what to expect.",
    rating: 5,
    avatarColor: "#2f6ce5", // Primary Blue
  },
  {
    id: 2,
    clientName: "Sarah J.",
    company: "Downtown Dental Clinic",
    feedback:
      "Professional, responsive, and easy to work with. He understood our needs perfectly, delivered a beautiful redesign, and the 30/70 payment structure made the process completely stress-free.",
    rating: 4,
    avatarColor: "#374151", // Slate Gray
  },
  {
    id: 3,
    clientName: "David W.",
    company: "Apex Roofing",
    feedback:
      "Our old site was practically broken on mobile. Subrata delivered a modern, responsive design that actually keeps visitors on the page. His communication was clear and asynchronous.",
    rating: 5,
    avatarColor: "#1e4bb5", // Darker Blue
  },
  {
    id: 4,
    clientName: "Emma L.",
    company: "Boutique E-commerce",
    feedback:
      "Great experience upgrading our storefront. The UI is incredibly clean. I'm taking off one star just because our own internal delays slowed down the launch, but his development speed was top-notch.",
    rating: 4,
    avatarColor: "#4b5563", // Medium Slate
  },
  {
    id: 5,
    clientName: "James T.",
    company: "Iron Core Fitness",
    feedback:
      "High-performance results. The new landing page is converting leads much faster than our old setup. Very impressed with his TypeScript and React skills.",
    rating: 5,
    avatarColor: "#272829", // Primary Text Color
  },
  // Map dynamic feedback from your projectsData
  ...projectsData
    .filter((project) => project.ownerDetails && project.ownerDetails.feedback)
    .map((project) => {
      const name = project.ownerDetails?.name || "Client";
      return {
        id: project.repoName,
        clientName: name,
        company: project.ownerDetails?.role || "Company",
        feedback: project.ownerDetails?.feedback || "No feedback provided.",
        rating: project.ownerDetails?.stars || 5,
        avatarColor: getColorForName(name), // Fixed hydration mismatch here
      };
    }),
];

export default function Feedback() {
  return (
    <section className="screen-container feedback-section">
      <h1 className="heading" id="feedback">
        Client Feedback
      </h1>

      <div className="marquee-wrapper">
        <div className="marquee-track">
          {/* Duplicate the array to create a seamless infinite scroll loop */}
          {[...feedbackData, ...feedbackData].map((item, index) => (
            <FeedbackCard key={`${item.id}-${index}`} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeedbackCard({
  clientName,
  company,
  feedback,
  rating,
  avatarColor,
}: {
  clientName: string;
  company: string;
  feedback: string;
  rating: number;
  avatarColor: string;
}) {
  return (
    <div className="feedback-card">
      <div className="feedback-header">
        <div
          className="feedback-avatar"
          style={{ backgroundColor: avatarColor }}
          aria-hidden="true"
        >
          {clientName.charAt(0)}
        </div>
        <div className="feedback-info">
          <div className="feedback-client-name">{clientName}</div>
          <div className="feedback-company">{company}</div>
        </div>
      </div>

      <div className="feedback-stars" aria-label={`Rating: ${rating} out of 5`}>
        {[...Array(5)].map((_, index) => (
          <Star key={index} filled={index < rating} />
        ))}
      </div>

      <p className="feedback-text">&quot;{feedback}&quot;</p>
    </div>
  );
}
