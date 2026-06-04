import React from "react";
import "@/app/styles/Feedback.css";
import Star from "../Icons/Star";
import { projectsData } from "../data/projects";

// Expanded mock data with avatar background colors
const feedbackData = [
  {
    id: 1,
    clientName: "Michael R.",
    company: "Local Plumbing Services",
    feedback:
      "Subrata completely transformed our outdated website. The new Next.js site is lightning fast, and we saw an immediate drop in bounce rates. The free mockup upfront showed me exactly what to expect.",
    rating: 5,
    avatarColor: "#3b82f6", // Blue
  },
  {
    id: 2,
    clientName: "Sarah J.",
    company: "Downtown Dental Clinic",
    feedback:
      "Professional, responsive, and easy to work with. He understood our needs perfectly, delivered a beautiful redesign, and the 30/70 payment structure made the process completely stress-free.",
    rating: 4,
    avatarColor: "#10b981", // Green
  },
  {
    id: 3,
    clientName: "David W.",
    company: "Apex Roofing",
    feedback:
      "Our old site was practically broken on mobile. Subrata delivered a modern, responsive design that actually keeps visitors on the page. His communication was clear and asynchronous.",
    rating: 5,
    avatarColor: "#f59e0b", // Amber
  },
  {
    id: 4,
    clientName: "Emma L.",
    company: "Boutique E-commerce",
    feedback:
      "Great experience upgrading our storefront. The UI is incredibly clean. I'm taking off one star just because our own internal delays slowed down the launch, but his development speed was top-notch.",
    rating: 4,
    avatarColor: "#8b5cf6", // Purple
  },
  {
    id: 5,
    clientName: "James T.",
    company: "Iron Core Fitness",
    feedback:
      "High-performance results. The new landing page is converting leads much faster than our old setup. Very impressed with his TypeScript and React skills.",
    rating: 5,
    avatarColor: "#ef4444", // Red
  },
  ...projectsData
    .filter((project) => project.ownerDetails && project.ownerDetails.feedback)
    .map((project) => ({
      id: project.repoName,
      clientName: project.ownerDetails?.name || "Client",
      company: project.ownerDetails?.role || "Company",
      feedback: project.ownerDetails?.feedback || "No feedback provided.",
      rating: project.ownerDetails?.stars || 5, // Default to 5 stars if not provided
      avatarColor: getRandomColor(), // Random color for project feedback
    })),
];

function getRandomColor(): string {
  const colors = [
    "#6b7280", // Gray
    "#3b82f6", // Blue
    "#10b981", // Green
    "#f59e0b", // Amber
    "#8b5cf6", // Purple
    "#ef4444", // Red
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

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
