"use client";

import React, { useRef, useEffect, useCallback, memo } from "react";
import { FaStar, FaQuoteRight } from "react-icons/fa";
import { projectsData } from "../data/projects";

// Deterministic color generator based on the name (Fixes Next.js Hydration Errors)
function getColorForName(name: string): string {
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

// Data aggregation
const feedbackData = [
  {
    id: "m-1",
    clientName: "Michael R.",
    company: "Local Plumbing Services",
    feedback:
      "Subrata completely transformed our outdated website. The new Next.js site is lightning fast, and we saw an immediate drop in bounce rates.",
    rating: 5,
    avatarColor: "#2f6ce5",
  },
  {
    id: "m-2",
    clientName: "Sarah J.",
    company: "Downtown Dental Clinic",
    feedback:
      "Professional, responsive, and easy to work with. He understood our needs perfectly, delivered a beautiful redesign.",
    rating: 4,
    avatarColor: "#374151",
  },
  {
    id: "m-3",
    clientName: "David W.",
    company: "Apex Roofing",
    feedback:
      "Our old site was practically broken on mobile. Subrata delivered a modern, responsive design that actually keeps visitors on the page.",
    rating: 5,
    avatarColor: "#1e4bb5",
  },
  {
    id: "m-4",
    clientName: "Emma L.",
    company: "Boutique E-commerce",
    feedback:
      "Great experience upgrading our storefront. The UI is incredibly clean. His development speed was top-notch.",
    rating: 4,
    avatarColor: "#4b5563",
  },
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
        avatarColor: getColorForName(name),
      };
    }),
];

export default function Feedback() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef<boolean>(false);
  const animationFrameRef = useRef<number>(0);

  // Safely pause and resume based strictly on user inputs, not JS scroll events
  const pauseAutoScroll = useCallback(() => {
    isInteractingRef.current = true;
  }, []);

  const resumeAutoScroll = useCallback(() => {
    isInteractingRef.current = false;
  }, []);

  // Dynamically calculate the exact pixel width required to loop seamlessly
  const getJumpPoint = useCallback(() => {
    const container = scrollContainerRef.current;
    const firstSet = firstSetRef.current;
    if (!container || !firstSet) return 0;

    // Safely parse the flex gap dynamically instead of hardcoding 24px
    const gap = parseFloat(window.getComputedStyle(container).columnGap) || 24;
    return firstSet.offsetWidth + gap;
  }, []);

  // Hybrid Scroll Logic: Syncs manual Native Scrolling bounds for the infinite loop
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const jumpPoint = getJumpPoint();
    if (jumpPoint === 0) return;

    // Native infinite scroll threshold checks
    if (container.scrollLeft >= jumpPoint) {
      container.scrollLeft -= jumpPoint;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft += jumpPoint;
    }
  }, [getJumpPoint]);

  // Main Auto-scroll Animation Loop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const play = () => {
      // Advance scrollLeft ONLY if the user is not actively interacting
      if (!isInteractingRef.current) {
        container.scrollLeft += 1; // Smooth, integer-safe progression

        const jumpPoint = getJumpPoint();
        if (jumpPoint > 0 && container.scrollLeft >= jumpPoint) {
          container.scrollLeft -= jumpPoint;
        }
      }
      animationFrameRef.current = requestAnimationFrame(play);
    };

    // Start loop
    animationFrameRef.current = requestAnimationFrame(play);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [getJumpPoint]);

  return (
    <section
      className="w-full max-w-[1440px] mx-auto px-[5%] mt-24 overflow-hidden"
      id="feedback"
    >
      <div className="flex flex-col items-center md:items-start mb-10">
        <h2 className="text-3xl md:text-4xl font-bold font-['Raleway'] text-gray-900 dark:text-gray-100">
          Client Feedback
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base max-w-2xl text-center md:text-left">
          Don&apos;t just take my word for it. Here is what my clients and
          collaborators have to say about the results I deliver.
        </p>
      </div>

      <div className="relative w-full py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div
          ref={scrollContainerRef}
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={resumeAutoScroll}
          onTouchStart={pauseAutoScroll}
          onTouchEnd={resumeAutoScroll}
          onScroll={handleScroll} // onScroll now only handles loop math, never pauses
          className="flex gap-6 overflow-x-auto w-full items-stretch pb-6 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] will-change-scroll"
        >
          {/* First Data Set - Wrapped to measure dynamic width */}
          <div ref={firstSetRef} className="flex gap-6 shrink-0">
            {feedbackData.map((item) => (
              <FeedbackCard key={`first-${item.id}`} {...item} />
            ))}
          </div>

          {/* Second Data Set - Required for visual continuity */}
          <div className="flex gap-6 shrink-0">
            {feedbackData.map((item) => (
              <FeedbackCard key={`second-${item.id}`} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// Sub-components
// ----------------------------------------------------------------------

interface FeedbackCardProps {
  clientName: string;
  company: string;
  feedback: string;
  rating: number;
  avatarColor: string;
}

const FeedbackCard = memo(function FeedbackCard({
  clientName,
  company,
  feedback,
  rating,
  avatarColor,
}: FeedbackCardProps) {
  return (
    <article className="group relative flex flex-col justify-between w-[300px] sm:w-[360px] shrink-0 h-auto p-7 bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-black/40 overflow-hidden box-border">
      {/* Decorative Background Quote Icon */}
      <FaQuoteRight className="absolute top-6 right-6 text-6xl text-gray-100 dark:text-white/5 opacity-50 pointer-events-none group-hover:scale-110 transition-transform duration-500" />

      <div className="relative z-10 flex flex-col h-full gap-5">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white shrink-0 shadow-inner"
            style={{ backgroundColor: avatarColor }}
            aria-hidden="true"
          >
            {clientName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <h3 className="text-base font-bold tracking-tight m-0">
              {clientName}
            </h3>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 m-0">
              {company}
            </p>
          </div>
        </div>

        {/* Feedback Text */}
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 opacity-95 m-0 grow">
          &quot;{feedback}&quot;
        </p>

        {/* Rating */}
        <div
          className="flex gap-1 mt-auto pt-2"
          aria-label={`Rating: ${rating} out of 5`}
        >
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`text-base ${
                index < rating
                  ? "text-amber-500"
                  : "text-gray-200 dark:text-gray-700"
              }`}
            />
          ))}
        </div>
      </div>
    </article>
  );
});
