"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import "@/app/styles/menubar.css";
import { skillsData } from "../data/skills";
import { projectsData } from "../data/projects";
import { SearchIcon } from "../Icons/SearchIcon";
import Brightness from "../Icons/Brightness";
import MoonAndStars from "../Icons/MoonAndStars";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";

export interface MenuLink {
  name: string;
  link: string;
  createHref?: boolean;
  isCta?: boolean;
}

export default function Menubar({ links }: { links?: MenuLink[] }) {
  // Separated scroll state from mobile menu open state for better stability
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`menubar ${isScrolled ? "scrolled" : ""} ${
          isMobileMenuOpen ? "mobile-open" : ""
        }`}
      >
        <div className="theme-container">
          <div className="logo light-mode" onClick={toggleTheme}>
            {theme === "dark" ? <MoonAndStars /> : <Brightness />}
          </div>
        </div>

        {/* Wrapper to handle Desktop Grid vs Mobile Dropdown seamlessly */}
        <div className="menubar-content">
          <SearchContainer closeMenu={() => setIsMobileMenuOpen(false)} />
          <Menus links={links} onLinkClick={() => setIsMobileMenuOpen(false)} />
        </div>

        {/* Mobile-Only Header Actions */}
        <div className="mobile-nav-actions">
          <div
            className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Mobile-Only Persistent Floating Contact Button */}
      <Link href="/#contact" className="mobile-contact-fab">
        <MailIcon />
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
    if (searchInputRef.current) searchInputRef.current.blur();

    if (pathname === "/") {
      const skillElement = document.querySelector(`.skill-container#${id}`);
      if (skillElement) {
        skillElement.scrollIntoView({ behavior: "smooth" });
        window.location.hash = `#${id}`;
      }
    } else {
      router.push(`/#${id}`);
    }
  };

  const navigateToProject = (repoName: string) => {
    setIsOpen(false);
    setQuery("");
    closeMenu();
    if (searchInputRef.current) searchInputRef.current.blur();
    router.push(`/projects/${repoName}`);
  };

  return (
    <div className="search-container" ref={searchContainerRef}>
      <input
        className="search-box"
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
      <div
        className="search-icon"
        onClick={() => searchInputRef.current?.focus()}
      >
        <SearchIcon />
      </div>

      {isOpen && query.trim() !== "" && (
        <div className="custom-search-dropdown">
          {!hasResults ? (
            <div className="search-no-results">
              No results found for &quot;{query}&quot;
            </div>
          ) : (
            <div className="search-results-wrapper">
              {filteredSkills.length > 0 && (
                <div className="search-group">
                  <div className="search-group-title">Skills</div>
                  {filteredSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="search-item"
                      onClick={() => navigateToSkill(skill.id)}
                    >
                      <Image
                        src={skill.iconSrc}
                        alt={skill.name}
                        width={20}
                        height={20}
                        className="search-item-img"
                      />
                      <span className="search-item-text">{skill.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {filteredProjects.length > 0 && (
                <div className="search-group">
                  <div className="search-group-title">Projects</div>
                  {filteredProjects.map((project) => (
                    <div
                      key={project.repoName}
                      className="search-item"
                      onClick={() => navigateToProject(project.repoName)}
                    >
                      <Image
                        src={`/${project.previewImageSrc}`}
                        alt={project.name}
                        width={32}
                        height={20}
                        className="search-item-img project-img"
                      />
                      <div className="search-item-details">
                        <span className="search-item-text">{project.name}</span>
                        {project.clientProject && (
                          <span className="search-item-badge">Client</span>
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
    <div className="menus-container">
      {links.map((link) => {
        const isActive = link.link === pathname ? " active" : "";
        const isCta = link.isCta ? " cta-button" : "";
        const combinedClassName = `menu${isActive}${isCta}`;

        return link.link.indexOf("#") === 0 ? (
          <Link
            key={link.link}
            className={combinedClassName}
            href={link.link}
            onClick={onLinkClick}
          >
            {link.name}
          </Link>
        ) : (
          <Link href={link.link} key={link.link}>
            <div className={combinedClassName} onClick={onLinkClick}>
              {link.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

// Simple embedded icon for the mobile Floating Action Button
function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
