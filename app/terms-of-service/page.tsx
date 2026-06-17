import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  FiArrowLeft,
  FiFileText,
  FiCode,
  FiLayout,
  FiCreditCard,
  FiGlobe,
  FiMessageSquare,
  FiCheckCircle,
  FiMail,
} from "react-icons/fi";

export const metadata: Metadata = {
  title: "Terms of Service | Subrata Chowdhury",
  description:
    "Terms of Service and freelance business agreements for Subrata Chowdhury, Web Developer.",
};

const termsData = [
  {
    id: "agreement",
    icon: FiFileText,
    title: "1. Agreement to Terms",
    content: (
      <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
        By accessing this website or engaging my freelance web development
        services, you agree to be bound by these Terms of Service. If you do not
        agree with any part of these terms, you may not access the website or
        use my services.
      </p>
    ),
  },
  {
    id: "services",
    icon: FiCode,
    title: "2. Services Provided",
    content: (
      <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
        I provide modern, responsive website redesigns, landing pages, and
        full-stack web applications. The specific scope of work, including
        deliverables, timelines, and technical requirements (such as the use of
        React, Next.js, and Tailwind CSS), will be agreed upon in writing before
        any development begins.
      </p>
    ),
  },
  {
    id: "mockup",
    icon: FiLayout,
    title: "3. The 'Free-to-Fee' Guarantee",
    content: (
      <div className="bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-lg border-l-2 border-blue-500">
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
          I operate on a risk-free "Free-to-Fee" model. You will receive a
          custom, high-quality Figma mockup of your new homepage completely free
          of charge. You are under no obligation to proceed or pay for services
          unless you explicitly approve the design and decide to move forward
          with development.
        </p>
      </div>
    ),
  },
  {
    id: "payment",
    icon: FiCreditCard,
    title: "4. Payment Terms",
    content: (
      <>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-4">
          Once the initial design mockup is approved, payments are structured to
          ensure mutual security:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 text-sm md:text-base">
          <li>
            <strong className="text-gray-800 dark:text-gray-200">
              Upfront Deposit:
            </strong>{" "}
            A 30% upfront payment is required before any code is written or
            infrastructure is set up.
          </li>
          <li>
            <strong className="text-gray-800 dark:text-gray-200">
              Final Payment:
            </strong>{" "}
            The remaining 70% balance is due only upon final live deployment and
            your complete approval of the working website.
          </li>
        </ul>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed mt-4">
          Payments are accepted via secure international processors (Wise,
          Payoneer, or PayPal).
        </p>
      </>
    ),
  },
  {
    id: "hosting",
    icon: FiGlobe,
    title: "5. Hosting & Domain",
    content: (
      <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
        To provide a seamless, end-to-end service, standard{" "}
        <strong className="text-gray-800 dark:text-gray-200">
          hosting and domain fees are included
        </strong>{" "}
        under the package plans. The specific details, such as the hosting
        platform (e.g., Vercel) and domain registration renewal terms, will be
        clearly outlined in our initial project agreement.
      </p>
    ),
  },
  {
    id: "communication",
    icon: FiMessageSquare,
    title: "6. Communication",
    content: (
      <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
        To maximize efficiency and maintain a documented trail of project
        decisions, my primary mode of communication is asynchronous (via email
        or direct messaging). This eliminates the need for scheduling live video
        meetings and ensures your project moves forward rapidly.
      </p>
    ),
  },
  {
    id: "ownership",
    icon: FiCheckCircle,
    title: "7. Intellectual Property & Ownership",
    content: (
      <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
        Upon receipt of the final 70% payment, full ownership of the deployed
        codebase and associated design assets is transferred to you. I reserve
        the right to display screenshots and links to the completed project in
        my professional portfolio and marketing materials unless a
        Non-Disclosure Agreement (NDA) is signed beforehand.
      </p>
    ),
  },
  {
    id: "contact",
    icon: FiMail,
    title: "8. Contact Information",
    content: (
      <>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-4">
          If you have any questions about these Terms of Service or wish to
          discuss a project, please reach out to me:
        </p>
        <address className="not-italic flex flex-col gap-1 text-sm md:text-base text-gray-800 dark:text-gray-200 font-medium bg-gray-50 dark:bg-[#121212] p-4 rounded-xl border border-gray-200 dark:border-white/5">
          <span className="font-bold text-gray-900 dark:text-white">
            Subrata Chowdhury
          </span>
          <span>Freelance Web Developer</span>
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

export default function TermsOfServicePage() {
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
            Terms of Service
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
          {termsData.map((section, index) => (
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
