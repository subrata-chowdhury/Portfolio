'use client'
import { useEffect, useRef, useState } from "react";
import "@/app/styles/menubar.css"
import { SkillsContainer } from "./Skills";
import { Skill, skillsData } from "../data/skills";
import { SearchIcon } from "../Icons/SearchIcon";
import Brightness from "../Icons/Brightness";
import MoonAndStars from "../Icons/MoonAndStars";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";

export default function Menubar({
    links,
}: {
    links?: {
        name: string,
        link: string,
        createHref?: boolean
    }[],
}) {
    const [isActive, setIsActive] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        function activeMenubarOnScroll() {
            window.onscroll = () => {
                if (document.documentElement.scrollTop > 50 && window.innerWidth > 650) {
                    setIsActive(true);
                } else {
                    setIsActive(false);
                }
            }
        }
        activeMenubarOnScroll()
    }, [])

    return (
        <>
            <Image width={30} height={30} src="/icons/menubar.webp" className="menubar-toggle-icon" role="presentation" alt="" onClick={() => setIsActive(prevVal => !prevVal)} />
            <nav className={"menubar " + (isActive ? 'active' : '')}>
                <div className="theme-container">
                    <div className="logo light-mode" onClick={toggleTheme}>
                        {theme === 'dark' ? <MoonAndStars /> : <Brightness />}
                    </div>
                </div>
                <SearchContainer />
                <Menus links={links} />
            </nav>
        </>
    )
}

const SearchContainer = () => {
    const searchInputBox = useRef<HTMLInputElement>(null);

    const [filteredSkillData, setFilterSkillsData] = useState<Skill[]>([])
    const pathname = usePathname();
    const router = useRouter();

    function inputBoxInputHandler(searchData: string) {
        if (searchData !== "") {
            let newSkillsData: Skill[] = skillsData;
            newSkillsData = newSkillsData.filter(skill => skill.name.toLowerCase().includes(searchData.toLowerCase()))
            setFilterSkillsData(newSkillsData)
        } else {
            setFilterSkillsData([])
        }
    }

    return (
        <>
            <div className="search-container">
                <input
                    className="search-box"
                    type="text"
                    placeholder="Search a Skill"
                    ref={searchInputBox}
                    onChange={e => {
                        inputBoxInputHandler(e.target.value.trim())
                    }} />
                <div className="search-icon" onClick={() => {
                    searchInputBox.current?.focus();
                }}>
                    <SearchIcon />
                </div>
                {filteredSkillData.length > 0 && <SearchResultContainer skillsData={filteredSkillData} skillClickHandler={(e) => {
                    if (pathname === "/") {
                        const skillElement = document.querySelector(".skill-container#" + e.currentTarget.dataset.id);
                        if (skillElement) {
                            skillElement.scrollIntoView();
                        }
                    } else router.push("/#" + e.currentTarget.dataset.id);
                }} />}
            </div>
        </>
    )
}

export function SearchResultContainer({ skillsData, skillClickHandler = () => { } }: { skillsData: Skill[], skillClickHandler: (e: React.MouseEvent<HTMLDivElement>) => void }) {
    return (
        <div className="search-result-container active">
            <SkillsContainer skillsData={skillsData} excludeIds={true} skillClickHandler={skillClickHandler} />
        </div>
    )
}

export const Menus = ({ links = [{
    name: "Home",
    link: "/"
}, {
    name: "Education",
    link: "/#education",
}, {
    name: "Projects",
    link: "/Projects",
}, {
    name: "Experience",
    link: "/Experience"
}, {
    name: "Contact Me",
    link: "/#contact",
}] }) => {
    const pathname = usePathname();

    return (
        <div className="menus-container">
            {links.map((link) => {
                return (
                    // link?.createHref === true || 
                    link.link.indexOf("#") === 0 ?
                        <a key={link.link} className={"menu" + (link.link === pathname ? " active" : "")} href={link.link}>{link.name}</a> :
                        <Link href={link.link} key={link.link}>
                            <div className={"menu" + (link.link === pathname ? " active" : "")}>{link.name}</div>
                        </Link>)
            })}
        </div>
    )
}

// function hasElement(array: string[], key: string) {
//     for (let index = 0; index < array.length; index++) {
//         if (array[index] === key) return index;
//     }
//     return -1
// }