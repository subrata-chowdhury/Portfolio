'use client'
import { memo, useEffect, useRef, useState } from "react";
import "@/app/styles/menubar.css"
import { SkillsContainer } from "./Skills";
import { skillsData } from "../data/skills";
import { SearchIcon } from "../Icons/SearchIcon";
import Brightness from "../Icons/Brightness";
import MoonAndStars from "../Icons/MoonAndStars";
import Link from "next/link";

export default function Menubar({ onThemeChange = () => { }, links, skillsContainerRef }) {
    const [onDarkMode, setOnDarkMode] = useState(false)

    const menubar = useRef();

    useEffect(() => {
        function activeMenubarOnScroll() {
            window.onscroll = () => {
                if (document.documentElement.scrollTop > 50 && window.innerWidth > 650) {
                    menubar.current.classList.add("active");
                } else {
                    menubar.current.classList.remove("active");
                }
            }
        }
        activeMenubarOnScroll()
    }, [])

    function changeTheme() {
        setOnDarkMode(val => !val)
        onThemeChange(onDarkMode ? "light" : "dark")
    }

    function toggleMenubar() {
        if (hasElement(menubar.current.classList, "active") !== -1) {
            menubar.current?.classList.remove("active");
        } else {
            menubar.current?.classList.add("active");
        }
    }

    return (
        <>
            <img src="./icons/menubar.webp" className="menubar-toggle-icon" role="presentation" alt="" onClick={toggleMenubar} />
            <nav className="menubar" ref={menubar}>
                <div className="theme-container">
                    <div className="logo light-mode" onClick={changeTheme}>
                        {onDarkMode ? <MoonAndStars /> : <Brightness />}
                    </div>
                </div>
                <SearchContainer skillsContainerRef={skillsContainerRef} />
                <Menus links={links} />
            </nav>
        </>
    )
}

const SearchContainer = ({ skillsContainerRef }) => {
    const searchInputBox = useRef();

    const [filteredSkillData, setFilterSkillsData] = useState('')
    // const location = useRouter();
    // const navigator = useNavigate();

    function inputBoxInputHandler(searchData) {
        if (searchData !== "") {
            let newSkillsData = skillsData;
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
                    searchInputBox.current.focus();
                }}>
                    <SearchIcon />
                </div>
                {filteredSkillData.length > 0 && <SearchResultContainer skillsData={filteredSkillData} skillClickHandler={(e) => {
                    if (location.pathname === "/")
                        skillsContainerRef.current.querySelector(".skill-container#" + e.currentTarget.dataset.id).scrollIntoView()
                    else navigator("/#" + e.currentTarget.dataset.id)
                }} />}
            </div>
        </>
    )
}

export function SearchResultContainer({ skillsData, skillClickHandler = () => { } }) {
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
    name: "Internships",
    link: "/Internships"
}, {
    name: "Contact Me",
    link: "/#contact",
}] }) => {
    // const route = useLocation();
    let route = { pathname: "/" }

    return (
        <div className="menus-container">
            {links.map((link) => {
                return (
                    link.createHref === true || link.link.indexOf("#") === 0 ?
                        <a key={link.link} className={"menu" + (link.link === route.pathname ? " active" : "")} href={link.link}>{link.name}</a> :
                        <Link href={link.link} key={link.link}>
                            <div className={"menu" + (link.link === route.pathname ? " active" : "")}>{link.name}</div>
                        </Link>)
            })}
        </div>
    )
}

function hasElement(array, key) {
    for (let index = 0; index < array.length; index++) {
        if (array[index] === key) return index;
    }
    return -1
}