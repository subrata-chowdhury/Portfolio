import React from "react";
import "@/app/styles/Packages.css";
import Link from "next/link";

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
    <section className="screen-container packages-section">
      <h1 className="heading" id="packages">
        Freelance Packages
      </h1>

      <div className="packages-container">
        {packagesData.map((tier) => (
          <PricingCard key={tier.id} {...tier} />
        ))}
      </div>

      <div className="packages-cta-container">
        <Link href="#contact" className="btn global-package-cta">
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
      href={"/#contact"}
      className={`package-card ${isPopular ? "popular" : ""}`}
    >
      {isPopular && <div className="popular-badge">MOST POPULAR</div>}

      <div className="package-header">
        <h2 className="package-title">{title}</h2>
        <p className="package-description">{description}</p>
      </div>

      <div className="package-price-container">
        <span className="package-currency">$</span>
        <span className="package-price">{price}</span>
        <span className="package-billing">/project</span>
      </div>

      <div className="package-divider"></div>

      <ul className="package-features">
        {features.map((feature, i) => (
          <li
            key={i}
            className={`feature-item ${!feature.included ? "excluded" : ""}`}
          >
            <span className="feature-icon" aria-hidden="true">
              {feature.included ? <CheckIcon /> : <CrossIcon />}
            </span>
            <span>{feature.name}</span>
          </li>
        ))}
      </ul>

      {addons && addons.length > 0 && (
        <>
          <div className="package-divider"></div>
          <div className="addons-section">
            <h4 className="addons-heading">Optional Add-ons:</h4>
            <ul className="package-addons">
              {addons.map((addon, i) => (
                <li key={i} className="addon-item">
                  <span className="addon-name">
                    <PlusIcon /> {addon.name}
                  </span>
                  <span className="addon-price">+${addon.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </Link>
  );
}

// Icons (Checkmark colored with theme blue)
function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--blue-color)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon-check"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon-cross"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon-plus"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
