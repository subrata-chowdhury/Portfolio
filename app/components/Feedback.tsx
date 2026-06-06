"use client";

import React, { useRef, useEffect, useCallback, memo } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { projectsData } from "../data/projects";

// Deterministic color generator based on the name
function getColorForName(name: string): string {
  const colors = [
    "#2563eb", // Blue 600
    "#4f46e5", // Indigo 600
    "#0d9488", // Teal 600
    "#059669", // Emerald 600
    "#ea580c", // Orange 600
    "#d97706", // Amber 600
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
      "Subrata completely transformed our outdated website. It loads instantly and we're getting more calls. Highly recommended.",
    rating: 5,
    avatarColor: getColorForName("Michael R."),
  },
  {
    id: "m-2",
    clientName: "Sarah J.",
    company: "Downtown Dental Clinic",
    feedback:
      "Professional, quick, and easy to work with. He delivered a beautiful redesign that makes booking appointments effortless.",
    rating: 5,
    avatarColor: getColorForName("Sarah J."),
  },
  {
    id: "m-3",
    clientName: "David W.",
    company: "Apex Roofing",
    feedback:
      "Our old site was a mess on mobile. Subrata built a clean, modern page that works perfectly on every device.",
    rating: 5,
    avatarColor: getColorForName("David W."),
  },
  {
    id: "m-4",
    clientName: "Emma L.",
    company: "Boutique E-commerce",
    feedback:
      "Great experience upgrading our online store. The layout is much cleaner, easier to navigate, and communication was excellent.",
    rating: 4,
    avatarColor: getColorForName("Emma L."),
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
  const exactScrollPosRef = useRef<number>(0);

  const pauseAutoScroll = useCallback(() => {
    isInteractingRef.current = true;
  }, []);

  const resumeAutoScroll = useCallback(() => {
    isInteractingRef.current = false;
  }, []);

  const getJumpPoint = useCallback(() => {
    const container = scrollContainerRef.current;
    const firstSet = firstSetRef.current;
    if (!container || !firstSet) return 0;
    const gap = parseFloat(window.getComputedStyle(container).columnGap) || 24;
    return firstSet.offsetWidth + gap;
  }, []);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const jumpPoint = getJumpPoint();
    if (jumpPoint === 0) return;

    if (container.scrollLeft >= jumpPoint) {
      container.scrollLeft -= jumpPoint;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft += jumpPoint;
    }
    exactScrollPosRef.current = container.scrollLeft;
  }, [getJumpPoint]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    exactScrollPosRef.current = container.scrollLeft;

    const play = () => {
      if (!isInteractingRef.current) {
        exactScrollPosRef.current += 0.3; // Speed of auto-scroll
        container.scrollLeft = exactScrollPosRef.current;

        const jumpPoint = getJumpPoint();
        if (jumpPoint > 0 && container.scrollLeft >= jumpPoint) {
          exactScrollPosRef.current -= jumpPoint;
          container.scrollLeft = exactScrollPosRef.current;
        }
      }
      animationFrameRef.current = requestAnimationFrame(play);
    };

    animationFrameRef.current = requestAnimationFrame(play);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [getJumpPoint]);

  return (
    <section
      className="w-full max-w-7xl mx-auto px-6 mt-20 mb-24 overflow-hidden"
      id="feedback"
    >
      <div className="flex flex-col items-center md:items-start mb-10 lg:mb-14 max-w-2xl mx-auto md:mx-0">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 mb-3 animate-[slide-right_1s_ease-out]">
          Client Feedback
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed text-center md:text-left animate-[slide-right_1s_ease-out_0.2s]">
          Don&apos;t just take my word for it. Here is what my clients and
          collaborators have to say about the results I deliver.
        </p>
      </div>

      <div className="relative w-full py-4 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div
          ref={scrollContainerRef}
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={resumeAutoScroll}
          onTouchStart={pauseAutoScroll}
          onTouchEnd={resumeAutoScroll}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto w-full items-stretch pb-8 pt-2 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] will-change-scroll"
        >
          {/* First Data Set */}
          <div ref={firstSetRef} className="flex gap-6 shrink-0">
            {feedbackData.map((item) => (
              <FeedbackCard key={`first-${item.id}`} {...item} />
            ))}
          </div>

          {/* Second Data Set (For seamless infinite loop) */}
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
    <article className="group relative flex flex-col h-full w-[85vw] sm:w-[340px] md:w-[380px] shrink-0 bg-white dark:bg-[#121212] border border-gray-200/75 dark:border-white/5 rounded-[1.25rem] p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] dark:hover:shadow-none dark:hover:border-white/10">
      {/* Header: Avatar, Info & Quote Icon */}
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-3.5">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-sm"
            style={{ backgroundColor: avatarColor }}
            aria-hidden="true"
          >
            {clientName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-gray-100 leading-tight">
              {clientName}
            </h3>
            <p className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">
              {company}
            </p>
          </div>
        </div>
        <FaQuoteLeft
          className="text-gray-200 dark:text-gray-800 text-xl md:text-2xl shrink-0"
          aria-hidden="true"
        />
      </div>

      {/* Feedback Body */}
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed grow mb-6">
        &quot;{feedback}&quot;
      </p>

      {/* Footer: Rating */}
      <div
        className="flex items-center gap-1 mt-auto"
        aria-label={`Rating: ${rating} out of 5`}
      >
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`text-sm md:text-base ${
              index < rating
                ? "text-amber-400"
                : "text-gray-200 dark:text-gray-800"
            }`}
          />
        ))}
      </div>
    </article>
  );
});
