import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Menus } from "./Menubar";

export default function Footer() {
  return (
    <footer className="w-full bg-blue-50/30 dark:bg-[#151515] pt-12 pb-8 mt-20 border-t border-black/5 dark:border-white/5 transition-colors duration-300">
      <div className="w-full px-[5%] max-w-8xl mx-auto flex flex-col gap-8 lg:gap-12">
        {/* Top Part: Logo, Menus, Socials */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
          {/* Logo Placeholder (Hidden on mobile as per original CSS) */}
          <div className="hidden lg:flex w-1/4 justify-start">
            <div className="text-2xl font-bold font-['Raleway'] tracking-widest text-gray-900 dark:text-gray-100">
              SC.
            </div>
          </div>

          {/* Centered Menus */}
          <div className="flex-1 flex justify-center w-full lg:w-auto">
            <Menus />
          </div>

          {/* Right-aligned Socials */}
          <div className="w-full lg:w-1/4 flex justify-center lg:justify-end">
            <OtherPlatforms />
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-gray-300 dark:bg-white/10 shrink-0" />

        {/* Bottom Part: Copyright & Policies */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 text-[0.85rem] font-medium text-gray-600 dark:text-gray-400">
          <div className="text-center md:text-left">
            Made with ❤️ by Subrata
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-8">
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Cookies Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function OtherPlatforms({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <LinkedIcon Icon={FaFacebook} alt="Facebook Page" />
      <LinkedIcon Icon={FaInstagram} alt="Instagram Page" />
      <LinkedIcon
        Icon={FaGithub}
        linkUrl="https://github.com/subrata-chowdhury"
        alt="GitHub Page"
      />
      <LinkedIcon
        Icon={FaLinkedin}
        linkUrl="https://www.linkedin.com/in/subrata7000/"
        alt="LinkedIn Page"
      />
    </div>
  );
}

function LinkedIcon({
  linkUrl = "#",
  Icon,
  alt,
}: {
  linkUrl?: string;
  Icon: React.ElementType;
  alt: string;
}) {
  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={alt}
      className="text-xl text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:-translate-y-1 transition-all duration-300"
    >
      <Icon />
    </a>
  );
}
