"use client";
import React, { useRef, useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scrolling Logic
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;

    const play = () => {
      // Only auto-scroll if the user isn't hovering, touching, or manually scrolling
      if (!isInteracting) {
        el.scrollLeft += 1; // Speed of the auto-scroll

        // Reset scroll position seamlessly when reaching the end of the first duplicated set
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(play);
    };

    animationFrameId = requestAnimationFrame(play);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInteracting]);

  // Pause scrolling explicitly when the user swipes or uses mouse-wheel
  const handleScroll = () => {
    if (!isInteracting) setIsInteracting(true);

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    // Resume auto-scroll 500ms after the user stops scrolling
    scrollTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 500);
  };

  return (
    <section
      className="px-[5%] mt-24 max-w-8xl mx-auto w-full overflow-hidden"
      id="feedback"
    >
      <h2 className="text-3xl md:text-4xl font-bold font-['Raleway'] text-gray-900 dark:text-gray-100 mb-8 text-center md:text-left">
        Client Feedback
      </h2>

      <div className="relative w-full py-4 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] -webkit-[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => setIsInteracting(false)}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto w-full items-stretch pb-4 cursor-grab active:cursor-grabbing"
        >
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
    <div className="flex flex-col gap-4 w-[320px] sm:w-[380px] shrink-0 h-auto p-6 bg-white dark:bg-[#1a1a1a] rounded-xl border-2 border-black/15 dark:border-white/10 text-gray-900 dark:text-gray-100 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-50 dark:hover:bg-white/5 hover:shadow-lg whitespace-normal box-border">
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold text-white shrink-0 opacity-90 shadow-sm"
          style={{ backgroundColor: avatarColor }}
          aria-hidden="true"
        >
          {clientName.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="text-base font-bold leading-tight">{clientName}</div>
          <div className="text-[0.8rem] font-medium text-gray-600 dark:text-gray-400">
            {company}
          </div>
        </div>
      </div>

      <div className="flex gap-1" aria-label={`Rating: ${rating} out of 5`}>
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`text-lg ${index < rating ? "text-amber-500" : "text-gray-300 dark:text-gray-700"}`}
          />
        ))}
      </div>

      <p className="text-[0.9rem] leading-relaxed italic opacity-90 m-0 grow">
        &quot;{feedback}&quot;
      </p>
    </div>
  );
}
