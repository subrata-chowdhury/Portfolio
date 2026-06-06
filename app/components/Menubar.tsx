"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FiSearch, FiSun, FiMoon, FiMail, FiX, FiMenu } from "react-icons/fi";
import { skillsData } from "../data/skills";
import { projectsData } from "../data/projects";

export interface MenuLink {
  name: string;
  link: string;
  createHref?: boolean;
  isCta?: boolean;
}

const DEFAULT_LINKS: MenuLink[] = [
  { name: "Home", link: "/" },
  { name: "Education", link: "/#education" },
  { name: "Projects", link: "/projects" },
  { name: "Experiences", link: "/experiences" },
  { name: "Contact Me", link: "/#contact", isCta: true },
];

export default function Menubar({
  links = DEFAULT_LINKS,
}: {
  links?: MenuLink[];
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling on mobile menu open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
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

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  }, []);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full flex items-center justify-between px-6 lg:px-12 transition-all duration-300 z-50 ${
          isScrolled
            ? "h-16 shadow-sm bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-neutral-800/50"
            : "h-20 bg-transparent"
        }`}
      >
        {/* Left Side: Theme Toggle & Potential Logo */}
        <div className="flex items-center gap-4 z-50">
          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <SearchContainer closeMenu={closeMobileMenu} />
          <DesktopMenu links={links} />
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="lg:hidden p-2 -mr-2 z-[60] text-gray-800 dark:text-gray-200 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <FiX className="text-2xl" />
          ) : (
            <FiMenu className="text-2xl" />
          )}
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 right-0 w-[85%] max-w-[340px] h-screen bg-white dark:bg-neutral-900 shadow-2xl z-50 transform transition-transform duration-300 ease-out lg:hidden flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto px-6 py-20 gap-8">
          <div className="w-full">
            <SearchContainer closeMenu={closeMobileMenu} isMobile />
          </div>
          <MobileMenu links={links} onLinkClick={closeMobileMenu} />
        </div>
      </aside>

      {/* Mobile-Only Persistent Floating Contact Button */}
      <Link
        href="/#contact"
        className="lg:hidden fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full font-semibold shadow-lg shadow-blue-600/30 flex items-center gap-2 z-30 active:scale-95 transition-transform"
      >
        <FiMail className="text-xl" />
        <span className="text-sm">Contact</span>
      </Link>
    </>
  );
}

// --- SUB-COMPONENTS ---

const ThemeToggle = ({
  isDarkMode,
  toggleTheme,
}: {
  isDarkMode: boolean;
  toggleTheme: () => void;
}) => (
  <button
    onClick={toggleTheme}
    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors text-xl text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
    aria-label="Toggle Theme"
  >
    {isDarkMode ? (
      <FiSun className="text-yellow-400" />
    ) : (
      <FiMoon className="text-indigo-600" />
    )}
  </button>
);

const DesktopMenu = ({ links }: { links: MenuLink[] }) => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-6">
      {links.map((link) => {
        const isActive = link.link === pathname;

        if (link.isCta) {
          return (
            <Link
              key={link.link}
              href={link.link}
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/30 hover:bg-blue-700 transition-all text-sm tracking-wide"
            >
              {link.name}
            </Link>
          );
        }

        return (
          <Link
            key={link.link}
            href={link.link}
            className={`text-sm font-medium px-3 transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
              isActive
                ? "text-blue-600 dark:text-blue-500 font-semibold"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};

const MobileMenu = ({
  links,
  onLinkClick,
}: {
  links: MenuLink[];
  onLinkClick: () => void;
}) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-full gap-2">
      {links.map((link) => {
        const isActive = link.link === pathname;

        if (link.isCta) {
          return (
            <Link
              key={link.link}
              href={link.link}
              onClick={onLinkClick}
              className="mt-6 w-full bg-blue-600 text-white px-6 py-3.5 rounded-xl font-semibold text-center active:scale-[0.98] transition-transform text-base shadow-md shadow-blue-600/20"
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
            className={`text-lg px-5 py-3 rounded-xl transition-colors active:bg-gray-100 dark:active:bg-neutral-800 ${
              isActive
                ? "font-bold text-blue-600 dark:text-blue-500 bg-blue-50 dark:bg-blue-900/10"
                : "text-gray-800 dark:text-gray-200 font-medium"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};

const SearchContainer = ({
  closeMenu,
  isMobile = false,
}: {
  closeMenu: () => void;
  isMobile?: boolean;
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
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

  const handleNavigation = useCallback(
    (type: "skill" | "project", idOrRepo: string) => {
      setIsOpen(false);
      setQuery("");
      closeMenu();

      if (type === "skill") {
        if (pathname === "/") {
          document
            .querySelector(`.skill-container#${idOrRepo}`)
            ?.scrollIntoView({ behavior: "smooth" });
          window.location.hash = `#${idOrRepo}`;
        } else {
          router.push(`/#${idOrRepo}`);
        }
      } else {
        router.push(`/projects/${idOrRepo}`);
      }
    },
    [pathname, router, closeMenu],
  );

  return (
    <div
      className={`relative w-full ${isMobile ? "" : "lg:w-64 xl:w-72"}`}
      ref={searchContainerRef}
    >
      <div className="relative flex items-center w-full">
        <FiSearch className="absolute left-3 text-gray-400 text-lg" />
        <input
          className="w-full bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 rounded-full py-2.5 pl-10 pr-4 text-sm outline-none border border-transparent focus:border-blue-500/50 focus:bg-white dark:focus:bg-neutral-900 transition-all placeholder:text-gray-500"
          type="text"
          placeholder="Search skills or projects..."
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <FiX />
          </button>
        )}
      </div>

      {isOpen && query.trim() !== "" && (
        <div
          className={`absolute ${
            isMobile
              ? "top-[calc(100%+8px)] w-full relative mt-2 shadow-none border-none bg-transparent"
              : "top-[calc(100%+8px)] right-0 w-[320px] bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 shadow-xl"
          } rounded-xl overflow-hidden z-[100] flex flex-col`}
        >
          {!hasResults ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400 text-sm">
              No results found for &quot;{query}&quot;
            </div>
          ) : (
            <div className="max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-neutral-700">
              {filteredSkills.length > 0 && (
                <div className="flex flex-col pb-2">
                  <div className="px-4 pt-3 pb-2 text-[0.7rem] uppercase font-bold tracking-widest text-gray-400 dark:text-gray-500">
                    Skills
                  </div>
                  {filteredSkills.map((skill) => (
                    <button
                      key={skill.id}
                      className="flex items-center w-full text-left gap-3 px-4 py-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors"
                      onClick={() => handleNavigation("skill", skill.id)}
                    >
                      <div className="p-1.5 bg-gray-100 dark:bg-neutral-800 rounded-md shrink-0">
                        <Image
                          src={skill.iconSrc}
                          alt={skill.name}
                          width={18}
                          height={18}
                          className="object-contain"
                        />
                      </div>
                      <span className="font-medium text-sm text-gray-800 dark:text-gray-200 truncate">
                        {skill.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {filteredProjects.length > 0 && (
                <div className="flex flex-col pb-2">
                  <div className="px-4 pt-3 pb-2 text-[0.7rem] uppercase font-bold tracking-widest text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-neutral-700">
                    Projects
                  </div>
                  {filteredProjects.map((project) => (
                    <button
                      key={project.repoName}
                      className="flex items-center w-full text-left gap-3 px-4 py-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors"
                      onClick={() =>
                        handleNavigation("project", project.repoName)
                      }
                    >
                      <Image
                        src={`/${project.previewImageSrc}`}
                        alt={project.name}
                        width={36}
                        height={24}
                        className="object-cover rounded shadow-sm shrink-0"
                      />
                      <div className="flex flex-col flex-1 overflow-hidden">
                        <span className="font-medium text-sm text-gray-800 dark:text-gray-200 truncate">
                          {project.name}
                        </span>
                        {project.clientProject && (
                          <span className="text-[0.65rem] text-blue-600 dark:text-blue-400 font-medium">
                            Client Project
                          </span>
                        )}
                      </div>
                    </button>
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
