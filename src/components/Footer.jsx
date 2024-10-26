import Facebook from "../Icons/Social Media/Facebook"
import GitHub from "../Icons/Social Media/GitHub"
import Instagram from "../Icons/Social Media/Instagram"
import LinkedIn from "../Icons/Social Media/LinkedIn"
import "../style/footer.css"
import { Menus } from "./Menubar"

export default function Footer({ activeMenuIndex }) {
    return (
        <footer className="footer">
            <div className="top-part">
                <div className="logo"></div>
                <Menus />
                <OtherPlatforms />
            </div>
            <div className="line"></div>
            <div className="bottom-part">
                <div className="author">Made with ❤️ by Subrata</div>
                <div className="privacy-policy-container">
                    <a className="item" href="">Privacy Policy</a>
                    <a className="item" href="">Term of Services</a>
                    <a className="item" href="">Cookies Settings</a>
                </div>
            </div>
        </footer>
    )
}

export function OtherPlatforms({ className = "" }) {
    return (
        <div className={"icon-container" + (className ? (" " + className) : "")}>
            <LinkedIcon Icon={Facebook} alt={"Facebook Page"} />
            <LinkedIcon Icon={Instagram} alt={"Instagram Page"} />
            <LinkedIcon Icon={GitHub} linkUrl="https://github.com/Super7000" alt={"GitHub Page"} />
            <LinkedIcon Icon={LinkedIn} linkUrl="https://www.linkedin.com/in/subrata7000/" alt={"LinkedIn Page"} />
        </div>
    )
}

function LinkedIcon({ linkUrl = "#", Icon, alt }) {
    return (
        <a href={linkUrl} target="_blank" aria-label={alt} >
            <Icon />
        </a>
    )
}