import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  FiArrowLeft,
  FiShield,
  FiDatabase,
  FiActivity,
  FiShare2,
  FiLock,
  FiGlobe,
  FiMail,
} from "react-icons/fi";

export const metadata: Metadata = {
  title: "Privacy Policy | Subrata Chowdhury",
  description:
    "Privacy Policy and data handling practices for Subrata Chowdhury, Freelance Full-Stack Web Developer.",
};

const policyData = [
  {
    id: "introduction",
    icon: FiShield,
    title: "1. Introduction",
    content: (
      <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
        Welcome to the portfolio of Subrata Chowdhury ("I", "me", "my"). I am a
        Freelance Full-Stack Web Developer based in West Bengal, India. I am
        committed to protecting your personal information and your right to
        privacy. This Privacy Policy explains how I collect, use, and safeguard
        your information when you visit my website or engage my web development
        services.
      </p>
    ),
  },
  {
    id: "collection",
    icon: FiDatabase,
    title: "2. Information I Collect",
    content: (
      <>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-4">
          I collect personal information that you voluntarily provide to me when
          expressing an interest in obtaining information about my services.
          This may include:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 text-sm md:text-base">
          <li>
            <strong className="text-gray-800 dark:text-gray-200">
              Contact Information:
            </strong>{" "}
            Name, email address, and messaging handles required for asynchronous
            communication.
          </li>
          <li>
            <strong className="text-gray-800 dark:text-gray-200">
              Business Information:
            </strong>{" "}
            Website URLs, business requirements, design assets, and project
            constraints needed to deliver Next.js applications and custom
            designs.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "usage",
    icon: FiActivity,
    title: "3. How I Use Your Information",
    content: (
      <>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-4">
          I use the information collected exclusively to deliver high-quality
          web experiences. Specifically, I use it to:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 text-sm md:text-base">
          <li>
            Facilitate the delivery of services (e.g., creating Figma mockups
            and coding layouts).
          </li>
          <li>Respond to inquiries and provide asynchronous support.</li>
          <li>Manage billing, invoicing, and the 30/70 payment structure.</li>
          <li>Request testimonials or feedback upon project completion.</li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    icon: FiShare2,
    title: "4. Information Sharing",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
          I do not sell, rent, or trade your personal information. Information
          is only shared with essential third-party service providers needed to
          operate my business, such as:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 text-sm md:text-base">
          <li>
            <strong className="text-gray-800 dark:text-gray-200">
              Payment Processors:
            </strong>{" "}
            Wise, Payoneer, or PayPal. I do not directly collect or store your
            credit card or bank details.
          </li>
          <li>
            <strong className="text-gray-800 dark:text-gray-200">
              Hosting Infrastructure:
            </strong>{" "}
            Vercel and GitHub for staging and deploying your projects.
          </li>
          <li>
            <strong className="text-gray-800 dark:text-gray-200">
              Domain Registrars:
            </strong>{" "}
            Because your plan includes domain registration, your business
            contact details will be shared with the registrar to legally
            register the domain name in your name, as required by ICANN.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "security",
    icon: FiLock,
    title: "5. Data Retention & Security",
    content: (
      <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
        I keep your personal information for as long as it is necessary for the
        purposes set out in this Privacy Policy, unless a longer retention
        period is required by law. I implement appropriate technical and
        organizational security measures to protect the security of any personal
        information I process.
      </p>
    ),
  },
  {
    id: "international",
    icon: FiGlobe,
    title: "6. International Transfers",
    content: (
      <div className="bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-lg border-l-2 border-blue-500">
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
          As I operate primarily in international markets (including the USA,
          UK, and Australia), your information may be transferred to, stored,
          and processed in India or other regions where my service providers
          operate. By using my services, you consent to these transfers.
        </p>
      </div>
    ),
  },
  {
    id: "contact",
    icon: FiMail,
    title: "7. Contact Me",
    content: (
      <>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-4">
          If you have questions or comments about this notice, you may email me
          or contact me by post at:
        </p>
        <address className="not-italic flex flex-col gap-1 text-sm md:text-base text-gray-800 dark:text-gray-200 font-medium bg-gray-50 dark:bg-[#121212] p-4 rounded-xl border border-gray-200 dark:border-white/5">
          <span className="font-bold text-gray-900 dark:text-white">
            Subrata Chowdhury
          </span>
          <span>Freelance Web Developer</span>
          {/* <span>Barjora, West Bengal, Pin: 722202</span> */}
          <span>India</span>
          <a
            href="mailto:subrata.chowdhury1001@gmail.com"
            className="text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
          >
            subrata.chowdhury1001@gmail.com
          </a>
        </address>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Background wave matching the Header component */}
      <div className="fixed inset-0 w-full min-h-screen opacity-40 bg-no-repeat bg-cover bg-center -z-10 bg-[url('/wave.svg')] dark:opacity-50 pointer-events-none" />

      <section className="px-6 py-12 md:py-24 max-w-4xl mx-auto w-full relative z-10">
        {/* Navigation / Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors mb-10 md:mb-14 group"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
            <FiArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
          </div>
          Return to Portfolio
        </Link>

        {/* Page Header */}
        <div className="flex items-center gap-5 mb-12 md:mb-16">
          <h1 className="font-['Raleway'] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50 animate-[slide-right_1s_ease-out]">
            Privacy Policy
          </h1>
          <div className="h-[1px] flex-1 bg-gray-200 dark:bg-gray-800 hidden sm:block animate-[fade-in_1s_ease-out]" />
        </div>

        {/* Last Updated Tag */}
        <div className="mb-10 animate-[fade-in_1s_ease-out_0.2s]">
          <span className="inline-flex items-center px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-100 dark:border-blue-800/50 uppercase tracking-wide">
            Last Updated: June 2026
          </span>
        </div>

        {/* Content Modules */}
        <div className="flex flex-col gap-6 md:gap-8">
          {policyData.map((section, index) => (
            <article
              key={section.id}
              className="group flex flex-col bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/5 rounded-2xl p-6 md:p-8 hover:bg-white dark:hover:bg-gray-800 hover:border-blue-200 dark:hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/5 animate-[slide-up_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 group-hover:scale-105 transition-transform duration-300">
                  <section.icon className="text-xl text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                  {section.title}
                </h2>
              </div>
              <div className="pl-0 md:pl-16">{section.content}</div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
