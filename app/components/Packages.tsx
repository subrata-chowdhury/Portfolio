import React from "react";
import Link from "next/link";
import { FiCheck, FiX, FiPlus } from "react-icons/fi";

// Types for strict typing
type Feature = { name: string; included: boolean };
type Addon = { name: string; price: number | string };

interface PackageTier {
  id: string;
  title: string;
  description: string;
  price: number | string;
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
    features: [
      { name: "1 Page Website", included: true },
      { name: "Responsive Mobile UI", included: true },
      { name: "Free Figma Mockup Upfront", included: true },
      { name: "Contact/Lead Form", included: true },
      { name: "Dynamic CMS", included: false },
      { name: "Admin Dashboard", included: false },
    ],
    addons: [{ name: "Advanced Local SEO", price: 25 }],
  },
  {
    id: "pro",
    title: "UI/UX Redesign",
    description:
      "For growing businesses replacing outdated sites with high-performance frameworks.",
    price: 150,
    isPopular: true,
    features: [
      { name: "Up to 5 Pages", included: true },
      { name: "Responsive Mobile UI", included: true },
      { name: "Free Figma Mockup Upfront", included: true },
      { name: "Contact/Lead Form", included: true },
      { name: "Dynamic Content Integration", included: true },
      { name: "Admin Dashboard", included: false },
    ],
    addons: [
      { name: "Advanced SEO Setup", price: 40 },
      { name: "Extra Pages", price: "20/ea" },
    ],
  },
  {
    id: "ultra",
    title: "Website Innovation",
    description:
      "Full-stack web applications, databases, and custom SaaS MVPs.",
    price: 300,
    features: [
      { name: "Unlimited Pages", included: true },
      { name: "Responsive Mobile UI", included: true },
      { name: "Free Figma Mockup Upfront", included: true },
      { name: "Secure API Integration", included: true },
      { name: "Dynamic MongoDB Database", included: true },
      { name: "User Authentication", included: true },
    ],
    addons: [
      { name: "Custom Admin Control", price: 100 },
      { name: "Payment Gateway", price: 50 },
    ],
  },
];

export default function Packages() {
  return (
    <section className="px-[5%] mt-24 max-w-8xl mx-auto w-full" id="packages">
      <h2 className="text-3xl md:text-4xl font-bold font-['Raleway'] text-gray-900 dark:text-gray-100 mb-10 text-center md:text-left">
        Freelance Packages
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch max-w-sm md:max-w-7xl mx-auto">
        {packagesData.map((tier) => (
          <PricingCard key={tier.id} {...tier} />
        ))}
      </div>

      <div className="flex justify-center mt-14">
        <Link
          href="#contact"
          className="inline-flex items-center justify-center bg-blue-600 text-white font-bold text-lg px-10 py-4 rounded-full shadow-[0_6px_20px_rgba(0,118,255,0.3)] hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          Get in Touch to Start
        </Link>
      </div>
    </section>
  );
}

function PricingCard({
  title,
  description,
  price,
  isPopular,
  features,
  addons,
}: PackageTier) {
  return (
    <Link
      href="#contact"
      className={`relative flex flex-col bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 text-gray-900 dark:text-gray-100 transition-all duration-300 group
        ${
          isPopular
            ? "border-2 border-blue-600 dark:border-blue-500 shadow-lg shadow-blue-600/10 lg:scale-105 z-10 lg:hover:-translate-y-1 lg:hover:scale-105"
            : "border border-gray-200 dark:border-white/10 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-black/50"
        }
      `}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[0.7rem] font-extrabold uppercase tracking-wide px-3 py-1 rounded-full z-20 whitespace-nowrap">
          Most Popular
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-xl font-extrabold mb-1">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex items-baseline mb-2">
        <span className="text-xl font-extrabold mr-0.5">$</span>
        <span className="text-4xl font-black tracking-tight">{price}</span>
        <span className="text-sm text-gray-500 ml-1 font-medium">/project</span>
      </div>

      <div className="w-full h-px bg-gray-200 dark:bg-white/10 my-4 shrink-0" />

      <ul className="flex flex-col gap-3 grow m-0 p-0 list-none">
        {features.map((feature, i) => (
          <li
            key={i}
            className={`flex items-center gap-3 text-sm font-medium ${
              !feature.included ? "opacity-40" : ""
            }`}
          >
            <span
              className={`flex items-center justify-center w-5 h-5 rounded-full shrink-0 ${
                feature.included
                  ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
                  : "text-gray-400 dark:text-gray-500"
              }`}
              aria-hidden="true"
            >
              {feature.included ? (
                <FiCheck className="text-[10px] stroke-[3]" />
              ) : (
                <FiX className="text-xs stroke-[2.5]" />
              )}
            </span>
            <span className="leading-snug">{feature.name}</span>
          </li>
        ))}
      </ul>

      {addons && addons.length > 0 && (
        <>
          <div className="w-full h-px bg-gray-200 dark:bg-white/10 my-4 shrink-0" />
          <div className="mt-auto">
            <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2.5">
              Optional Add-ons:
            </h4>
            <ul className="flex flex-col gap-2 m-0 p-0 list-none">
              {addons.map((addon, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center text-[0.8rem] bg-gray-50 dark:bg-white/5 px-3 py-2 rounded-lg border border-dashed border-gray-300 dark:border-white/10"
                >
                  <span className="flex items-center gap-1.5 font-semibold">
                    <FiPlus className="opacity-70" /> {addon.name}
                  </span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    +${addon.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </Link>
  );
}
