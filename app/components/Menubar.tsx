"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FiSearch, FiSun, FiMoon, FiMail } from "react-icons/fi";
import { skillsData } from "../data/skills";
import { projectsData } from "../data/projects";

export interface MenuLink {
  name: string;
  link: string;
  createHref?: boolean;
  isCta?: boolean;
}

export default function Menubar({ links }: { links?: MenuLink[] }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling on mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
  }, [isMobileMenuOpen]);

  // Handle Native Tailwind Dark Mode Initialization
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isSystemDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const hasDarkClass = document.documentElement.classList.contains("dark");
      setIsDarkMode(hasDarkClass || isSystemDark);

      if (hasDarkClass || isSystemDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  // Toggle Dark Mode natively
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full flex items-center justify-between px-6 lg:px-12 transition-all duration-300 z-50 ${
          isScrolled || isMobileMenuOpen
            ? "h-16 lg:h-16 shadow-md bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm"
            : "h-20 bg-transparent"
        }`}
      >
        {/* Logo & Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors text-2xl text-gray-800 dark:text-gray-200 focus:outline-none"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? (
            <FiSun className="text-yellow-400" />
          ) : (
            <FiMoon className="text-indigo-600" />
          )}
        </button>

        {/* Desktop & Mobile Menu Content */}
        <div
          className={`
            absolute top-16 left-0 w-full h-[calc(100vh-4rem)] bg-slate-50 dark:bg-neutral-900 flex flex-col items-start px-6 pt-8 pb-10 gap-8 transition-all duration-300 overflow-y-auto
            lg:static lg:w-auto lg:h-auto lg:bg-transparent lg:dark:bg-transparent lg:flex-row lg:items-center lg:px-0 lg:py-0 lg:gap-12 lg:overflow-visible
            ${isMobileMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4 lg:opacity-100 lg:visible lg:translate-y-0"}
          `}
        >
          <SearchContainer closeMenu={() => setIsMobileMenuOpen(false)} />
          <Menus links={links} onLinkClick={() => setIsMobileMenuOpen(false)} />
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="lg:hidden flex flex-col gap-[5px] p-2 z-[100] focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span
            className={`w-6 h-[3px] bg-gray-900 dark:bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? "translate-y-[8px] rotate-45" : ""}`}
          />
          <span
            className={`w-6 h-[3px] bg-gray-900 dark:bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 -translate-x-2" : ""}`}
          />
          <span
            className={`w-6 h-[3px] bg-gray-900 dark:bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? "-translate-y-[8px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile-Only Persistent Floating Contact Button */}
      <Link
        href="/#contact"
        className="lg:hidden fixed bottom-8 right-6 bg-blue-600 text-white px-5 py-3 rounded-full font-bold shadow-lg shadow-blue-600/40 flex items-center gap-2 z-40 hover:scale-95 transition-transform"
      >
        <FiMail className="text-xl" />
        <span>Contact</span>
      </Link>
    </>
  );
}

const SearchContainer = ({ closeMenu }: { closeMenu: () => void }) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        event.target instanceof Node &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSkills = useMemo(() => {
    if (!query.trim()) return [];
    return skillsData.filter((skill) =>
      skill.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  const filteredProjects = useMemo(() => {
    if (!query.trim()) return [];
    return projectsData.filter((project) =>
      project.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  const hasResults = filteredSkills.length > 0 || filteredProjects.length > 0;

  const navigateToSkill = (id: string) => {
    setIsOpen(false);
    setQuery("");
    closeMenu();
    searchInputRef.current?.blur();

    if (pathname === "/") {
      document
        .querySelector(`.skill-container#${id}`)
        ?.scrollIntoView({ behavior: "smooth" });
      window.location.hash = `#${id}`;
    } else {
      router.push(`/#${id}`);
    }
  };

  const navigateToProject = (repoName: string) => {
    setIsOpen(false);
    setQuery("");
    closeMenu();
    searchInputRef.current?.blur();
    router.push(`/projects/${repoName}`);
  };

  return (
    <div className="relative w-full lg:w-64 xl:w-80" ref={searchContainerRef}>
      <div className="flex items-center border-b border-gray-400 dark:border-gray-600 pb-1 px-2">
        <input
          className="bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 w-full text-lg lg:text-base placeholder:text-gray-500 dark:placeholder:text-gray-400"
          type="text"
          placeholder="Search skills or projects..."
          ref={searchInputRef}
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
        />
        <button
          className="text-gray-600 dark:text-gray-400 p-1 cursor-pointer focus:outline-none hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          onClick={() => searchInputRef.current?.focus()}
        >
          <FiSearch className="text-xl lg:text-lg" />
        </button>
      </div>

      {isOpen && query.trim() !== "" && (
        <div className="absolute top-[calc(100%+10px)] left-0 w-full lg:w-[340px] bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-xl overflow-hidden z-[100] flex flex-col">
          {!hasResults ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400 text-sm">
              No results found for &quot;{query}&quot;
            </div>
          ) : (
            <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-600">
              {filteredSkills.length > 0 && (
                <div className="flex flex-col border-b border-gray-100 dark:border-neutral-700 pb-2">
                  <div className="px-4 pt-3 pb-1 text-xs uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500">
                    Skills
                  </div>
                  {filteredSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors text-gray-800 dark:text-gray-200"
                      onClick={() => navigateToSkill(skill.id)}
                    >
                      <Image
                        src={skill.iconSrc}
                        alt={skill.name}
                        width={20}
                        height={20}
                        className="object-contain shrink-0"
                      />
                      <span className="font-medium text-sm truncate">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {filteredProjects.length > 0 && (
                <div className="flex flex-col pb-2">
                  <div className="px-4 pt-3 pb-1 text-xs uppercase font-bold tracking-wider text-gray-400 dark:text-gray-500">
                    Projects
                  </div>
                  {filteredProjects.map((project) => (
                    <div
                      key={project.repoName}
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors text-gray-800 dark:text-gray-200"
                      onClick={() => navigateToProject(project.repoName)}
                    >
                      <Image
                        src={`/${project.previewImageSrc}`}
                        alt={project.name}
                        width={32}
                        height={20}
                        className="object-cover rounded shadow-sm shrink-0"
                      />
                      <div className="flex items-center gap-2 flex-1 overflow-hidden">
                        <span className="font-medium text-sm truncate">
                          {project.name}
                        </span>
                        {project.clientProject && (
                          <span className="text-[0.65rem] bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded font-bold uppercase shrink-0">
                            Client
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const Menus = ({
  links = [
    { name: "Home", link: "/" },
    { name: "Education", link: "/#education" },
    { name: "Projects", link: "/projects" },
    { name: "Experiences", link: "/experiences" },
    { name: "Contact Me", link: "/#contact", isCta: true },
  ],
  onLinkClick = () => {},
}: {
  links?: MenuLink[];
  onLinkClick?: () => void;
}) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center w-full lg:w-auto gap-6 lg:gap-8">
      {links.map((link) => {
        const isActive = link.link === pathname;

        if (link.isCta) {
          return (
            <Link
              key={link.link}
              href={link.link}
              onClick={onLinkClick}
              // Changed text-xl to text-base for standardizing the button size on mobile
              className="mt-4 lg:mt-0 w-full lg:w-auto bg-blue-600 text-white px-6 py-3 lg:py-2 rounded-full font-medium text-center hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/30 hover:bg-blue-700 transition-all text-base"
            >
              {link.name}
            </Link>
          );
        }

        return (
          <Link
            key={link.link}
            href={link.link}
            onClick={onLinkClick}
            // Changed text-2xl to text-lg for mobile, keeping text-base for desktop (lg)
            className={`text-lg mx-2 lg:text-base transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
              isActive
                ? "font-bold text-blue-600 dark:text-blue-500"
                : "text-gray-800 dark:text-gray-300"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};
