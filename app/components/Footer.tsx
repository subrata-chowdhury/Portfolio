import React from "react";
import Link from "next/link";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-50 dark:bg-[#050505] pt-16 pb-8 mt-20 transition-colors duration-300">
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto flex flex-col gap-7">
        {/* Top Section: Brand, Links, and Socials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-8 lg:gap-12">
          {/* Brand & Mission */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-5">
            <div>
              <Link
                href="/"
                className="text-2xl font-bold font-['Raleway'] text-gray-900 dark:text-gray-100"
              >
                Subrata Chowdhury
              </Link>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                Freelance Full-Stack Developer crafting fast, modern, and
                high-performance web experiences.
              </p>
            </div>

            {/* Elevated Call-to-Action */}
            <a
              href="mailto:subrata.chowdhury1001@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaEnvelope className="text-lg" />
              Let&apos;s build something
            </a>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start space-y-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Quick Links
            </h3>
            <nav className="flex flex-col items-center md:items-start gap-3.5 text-sm text-gray-600 dark:text-gray-400">
              <Link
                href="/#education"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Education
              </Link>
              <Link
                href="/projects"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/experiences"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Experiences
              </Link>
              <Link
                href="/#contact"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact Me
              </Link>
            </nav>
          </div>

          {/* Social Platforms */}
          <div className="flex flex-col items-center md:items-start space-y-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Connect With Me
            </h3>
            <OtherPlatforms />
          </div>
        </div>

        {/* Gradient Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-400 dark:via-neutral-800 to-transparent" />

        {/* Bottom Section: Copyright & Legal */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 text-sm text-gray-500 dark:text-gray-500">
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} Subrata Chowdhury. All rights reserved.
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <Link
              href="#"
              className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function OtherPlatforms({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 md:gap-4 ${className}`}>
      <LinkedIcon
        Icon={FaGithub}
        linkUrl="https://github.com/subrata-chowdhury"
        alt="GitHub Page"
      />
      <LinkedIcon
        Icon={FaLinkedin}
        linkUrl="https://www.linkedin.com/in/subrata1001/"
        alt="LinkedIn Page"
      />
      <LinkedIcon Icon={FaFacebook} linkUrl="#" alt="Facebook Page" />
      <LinkedIcon Icon={FaInstagram} linkUrl="#" alt="Instagram Page" />
    </div>
  );
}

interface LinkedIconProps {
  linkUrl?: string;
  Icon: React.ElementType;
  alt: string;
}

function LinkedIcon({ linkUrl = "#", Icon, alt }: LinkedIconProps) {
  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={alt}
      className="p-3 rounded-xl bg-white dark:bg-neutral-900 text-gray-600 dark:text-gray-400 shadow-sm border border-gray-100 dark:border-neutral-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 hover:-translate-y-1 transition-all duration-300"
    >
      <Icon className="text-xl" />
    </a>
  );
}
