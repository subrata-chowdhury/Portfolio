"use client";
import React from "react";
import Link from "next/link";
import { FiCheck, FiX, FiPlus, FiStar } from "react-icons/fi";
import { useContactModal } from "@/app/contexts/ContactModel";

// Types for strict typing
type Feature = {
  name: string;
  included: boolean;
  highlight?: boolean;
};
type Addon = {
  name: string;
  price: number | string;
};

interface PackageTier {
  id: string;
  title: string;
  description: string;
  price: number;
  upfront: number;
  isPopular?: boolean;
  features: Feature[];
  addons?: Addon[];
}

// Package Data aligned with your freelance strategy
const packagesData: PackageTier[] = [
  {
    id: "basic",
    title: "Landing Page",
    description:
      "Perfect for local businesses needing a fast, modern digital storefront.",
    price: 60,
    upfront: 30, // 30% upfront
    features: [
      { name: "Free Figma Mockup Upfront", included: true, highlight: true },
      { name: "1 Page Custom Website", included: true },
      { name: "Responsive Mobile UI", included: true },
      { name: "Contact/Lead Form", included: true },
      { name: "Dynamic CMS", included: false },
    ],
    addons: [{ name: "Advanced Local SEO", price: 25 }],
  },
  {
    id: "pro",
    title: "UI/UX Redesign",
    description:
      "Replace your outdated site with a high-performance modern framework.",
    price: 150,
    upfront: 30, // 30% upfront
    isPopular: true,
    features: [
      { name: "Free Figma Mockup Upfront", included: true, highlight: true },
      { name: "Up to 5 Pages", included: true },
      { name: "Responsive Mobile UI", included: true },
      { name: "Contact/Lead Form", included: true },
      { name: "Dynamic Content Setup", included: true },
    ],
    addons: [
      { name: "Advanced SEO Setup", price: 40 },
      { name: "Extra Pages", price: "20/ea" },
    ],
  },
  {
    id: "ultra",
    title: "Web App / SaaS",
    description:
      "Full-stack web applications, databases, and custom SaaS MVPs.",
    price: 300,
    upfront: 30, // 30% upfront
    features: [
      { name: "Free Figma Mockup Upfront", included: true, highlight: true },
      { name: "Unlimited Pages", included: true },
      { name: "Secure API Integration", included: true },
      { name: "MongoDB Database", included: true },
      { name: "User Authentication", included: true },
    ],
    addons: [
      { name: "Custom Admin Panel", price: 100 },
      { name: "Payment Gateway", price: 50 },
    ],
  },
];

export default function Packages() {
  return (
    <section
      className="px-6 mt-20 mb-24 max-w-7xl mx-auto w-full"
      id="packages"
    >
      <div className="mb-10 lg:mb-14 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold font-['Raleway'] text-gray-900 dark:text-gray-100 mb-3 animate-[slide-right_1s_ease-out]">
          My Services
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed animate-[slide-right_1s_ease-out_0.2s]">
          Risk-free development. You receive a free custom Figma mockup before
          paying. Once approved, it&apos;s just 30% upfront to begin coding.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start max-w-sm md:max-w-none mx-auto">
        {packagesData.map((tier, index) => (
          <PricingCard key={tier.id} tier={tier} animationDelay={index} />
        ))}
      </div>
    </section>
  );
}

function PricingCard({
  tier,
  animationDelay,
}: {
  tier: PackageTier;
  animationDelay: number;
}) {
  const { openContactModal } = useContactModal();

  return (
    <article
      className={`relative flex flex-col h-full bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 md:p-8 transition-transform duration-300 animate-[slide-up_0.5s_ease-out_forwards]
        ${
          tier.isPopular
            ? "border-2 border-blue-600 dark:border-blue-500 lg:-translate-y-2"
            : "border-2 border-gray-100 dark:border-white/5 mt-0 lg:mt-4"
        }
      `}
      style={{ animationDelay: `${animationDelay * 0.15 + 0.2}s` }}
      onClick={(e) => {
        openContactModal(
          `Hi Subrata, I'm interested in the ${tier.title} package at $${tier.price}. I'd like to discuss the free Figma mockup.`,
        );
      }}
    >
      {tier.isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[0.65rem] md:text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full z-10 flex items-center gap-1">
          <FiStar className="fill-current" /> Most Popular
        </div>
      )}

      {/* Header */}
      <div className="mb-6 text-center">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
          {tier.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 min-h-[40px]">
          {tier.description}
        </p>
      </div>

      {/* Pricing */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-start justify-center">
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-1 mr-1">
            $
          </span>
          <span className="text-5xl font-black tracking-tight text-gray-900 dark:text-white">
            {tier.price}
          </span>
        </div>
        <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-md">
          Only {tier.upfront}% to initiate
        </div>
      </div>

      <button
        onClick={() =>
          openContactModal(
            `Hi Subrata, I'm interested in the ${tier.title} package at $${tier.price}. I'd like to discuss the free Figma mockup.`,
          )
        }
        className={`w-full text-center py-3 px-6 rounded-xl font-semibold transition-colors duration-200 mb-8 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600 dark:focus-visible:ring-offset-[#1a1a1a]
          ${
            tier.isPopular
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-neutral-700"
          }
        `}
      >
        Choose {tier.title}
      </button>

      {/* Features */}
      <div className="flex flex-col grow">
        <h4 className="text-xs uppercase tracking-wider font-bold text-gray-400 dark:text-gray-500 mb-4">
          What&apos;s included
        </h4>
        <ul className="flex flex-col gap-3 m-0 p-0 list-none">
          {tier.features.map((feature, i) => (
            <li
              key={i}
              className={`flex items-start gap-3 text-sm ${
                !feature.included ? "opacity-40" : ""
              } ${feature.highlight ? "font-bold text-gray-900 dark:text-gray-100" : "font-medium text-gray-700 dark:text-gray-300"}`}
            >
              <span
                className={`flex items-center justify-center w-5 h-5 rounded-full shrink-0 mt-0.5 ${
                  feature.highlight
                    ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
                    : feature.included
                      ? "bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400"
                      : "text-gray-400 dark:text-gray-600"
                }`}
                aria-hidden="true"
              >
                {feature.included ? (
                  <FiCheck className="text-[11px] stroke-[3]" />
                ) : (
                  <FiX className="text-xs stroke-[2.5]" />
                )}
              </span>
              <span className="leading-snug">{feature.name}</span>
            </li>
          ))}
        </ul>

        {/* Addons Section */}
        {tier.addons && tier.addons.length > 0 && (
          <div className="mt-6 pt-6 border-t border-dashed border-gray-200 dark:border-white/10">
            <h4 className="text-xs uppercase tracking-wider font-bold text-gray-400 dark:text-gray-500 mb-3">
              Optional Add-ons
            </h4>
            <ul className="flex flex-col gap-2 m-0 p-0 list-none">
              {tier.addons.map((addon, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center text-xs font-medium text-gray-600 dark:text-gray-400"
                >
                  <span className="flex items-center gap-1.5">
                    <FiPlus className="opacity-60" aria-hidden="true" />{" "}
                    {addon.name}
                  </span>
                  <span className="font-bold text-gray-900 dark:text-gray-200">
                    +${addon.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
