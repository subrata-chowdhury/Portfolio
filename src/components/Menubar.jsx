import { useEffect, useRef, useState } from "react";
import "../style/menubar.css"
import { SkillsContainer } from "./Skills";

export default function Menubar({ bodyRef = useRef(), skillsContainerRef }) {
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
            <Menus />
        </div>
    )
}

function SearchContainer({ skillsContainerRef }) {
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
}

export function SearchResultContainer({ forwardRef = useRef(), skillClickHandler = () => { } }) {
    return (
        <div className="search-result-container" ref={forwardRef}>
            <SkillsContainer excludeIds={true} skillClickHandler={skillClickHandler} />
        </div>
    )
}

export function Menus() {
    return (
        <div className="menus-container">
            <a className="menu active" href="#">Home</a>
            <a className="menu" href="">About</a>
            <a className="menu" href="#project">Projects</a>
            <a className="menu" href="">Internships</a>
            <a className="menu" href="#contact">Contact Me</a>
        </div>
    )
}

function hasElement(array, key) {
    for (let index = 0; index < array.length; index++) {
        if (array[index] === key) return index;
    }
    return -1
}