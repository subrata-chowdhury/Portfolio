import { memo, useEffect, useRef, useState } from "react";
import "../style/menubar.css"
import { SkillsContainer } from "./Skills";
import { Link } from "react-router-dom";

export default function Menubar({ bodyRef = useRef(), skillsContainerRef, activeIndex = 0 }) {
    const [themeIconSrc, setThemeIconSrc] = useState("../icons/brightness.svg")
    const menubar = useRef();
    useEffect(() => {
        function activeMenubarOnScroll() {
            window.onscroll = () => {
                if (document.documentElement.scrollTop > 150) {
                    menubar.current.classList.add("active");
                } else {
                    menubar.current.classList.remove("active");
                }
            }
        }
        activeMenubarOnScroll()
    }, [])
    function changeTheme() {
        if (hasElement(bodyRef.current.classList, "light") >= 0) {
            bodyRef.current.classList.remove("light");
            bodyRef.current.classList.add("dark");
            setThemeIconSrc("../icons/moon-stars.svg")
        } else {
            bodyRef.current.classList.remove("dark");
            bodyRef.current.classList.add("light");
            setThemeIconSrc("icons/brightness.svg");
        }
    }
    return (
        <div className="menubar" ref={menubar}>
            <div className="theme-container">
                <div className="logo light-mode" onClick={changeTheme}>
                    <img src={themeIconSrc} alt="theme icon" />
                </div>
            </div>
            <SearchContainer skillsContainerRef={skillsContainerRef} />
            <Menus activeIndex={activeIndex} />
        </div>
    )
}

const SearchContainer = memo(({ skillsContainerRef }) => {
    const searchInputBox = useRef()
    const searchResultContainer = useRef()
    function inputBoxInputHandler(event) {
        if (event.target.value === "") {
            searchResultContainer.current.classList.remove("active")
        } else {
            searchResultContainer.current.classList.add("active")
            let skills = searchResultContainer.current.querySelectorAll(".skill-container")
            for (let index = 0; index < skills.length; index++) {
                if (skills[index].dataset.id.indexOf(event.target.value.toLowerCase()) >= 0)
                    skills[index].style.cssText = "display: grid"
                else skills[index].style.cssText = "display: none"
            }
        }
    }
    return (
        <>
            <div className="search-container">
                <input
                    className="search-box"
                    type="text"
                    name=""
                    id=""
                    placeholder="Search a Skill"
                    ref={searchInputBox}
                    onInput={inputBoxInputHandler} />
                <div className="search-icon" onClick={() => {
                    searchInputBox.current.focus();
                }}>
                    <img src="../icons/Search_icon.svg" alt="" />
                </div>
                <SearchResultContainer forwardRef={searchResultContainer} skillClickHandler={(e) => {
                    skillsContainerRef.current.querySelector(".skill-container#" + e.currentTarget.dataset.id).scrollIntoView()
                }} />
            </div>
        </>
    )
})

export function SearchResultContainer({ forwardRef = useRef(), skillClickHandler = () => { } }) {
    return (
        <div className="search-result-container" ref={forwardRef}>
            <SkillsContainer excludeIds={true} skillClickHandler={skillClickHandler} />
        </div>
    )
}

export const Menus = memo(({ links = [{
    name: "Home",
    link: "/"
}, {
    name: "Education",
    link: "#education"
}, {
    name: "Projects",
    link: "#project"
}, {
    name: "Internships",
    link: "/Internships"
}, {
    name: "Contact Me",
    link: "#contact"
}], activeIndex = 0 }) => {
    let linkElement = [];
    for (let index = 0; index < links.length; index++) {
        if (links[index].link.indexOf("#") === 0)
            linkElement.push(
                <a key={index} className={"menu" + (activeIndex === index ? " active" : "")} href={links[index].link}>{links[index].name}</a>
            )
        else linkElement.push(
            <Link to={links[index].link} key={index}>
                <div className={"menu" + (activeIndex === index ? " active" : "")}>{links[index].name}</div>
            </Link>
        )
    }
    return (
        <div className="menus-container">
            {linkElement}
        </div>
    )
})

function hasElement(array, key) {
    for (let index = 0; index < array.length; index++) {
        if (array[index] === key) return index;
    }
    return -1
}