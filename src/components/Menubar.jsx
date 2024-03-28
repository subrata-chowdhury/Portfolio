import { useEffect, useRef, useState } from "react";
import "../style/menubar.css"

export default function Menubar({ bodyRef = useRef() }) {
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
            if (hasElement(bodyRef.current.classList,"light") >= 0) {
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
            <SearchContainer />
            <Menus />
        </div>
    )
}

function SearchContainer() {
    return (
        <div className="search-container">
            <input className="search-box" type="text" name="" id="" placeholder="Search a Skill" />
            <div className="search-icon">
                <img src="../icons/Search_icon.svg" alt="" />
            </div>
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

function hasElement(array, key){
    for (let index = 0; index < array.length; index++) {
        if(array[index] === key) return index;
    }
    return -1
}