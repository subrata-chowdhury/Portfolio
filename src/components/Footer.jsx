import Facebook from "../Icons/Social Media/Facebook"
import GitHub from "../Icons/Social Media/GitHub"
import Instagram from "../Icons/Social Media/Instagram"
import LinkedIn from "../Icons/Social Media/LinkedIn"
import "../style/footer.css"
import { Menus } from "./Menubar"

export default function Footer({ activeMenuIndex }) {
    return (
        <div className="footer">
            <div className="top-part">
                <div className="logo"></div>
                <Menus activeIndex={activeMenuIndex} />
                <OtherPlatforms />
            </div>
            <div className="line"></div>
            <div className="bottom-part">
                <div className="author">Made by Subrata</div>
                <div className="privacy-policy-container">
                    <a className="item" href="">Privacy Policy</a>
                    <a className="item" href="">Term of Services</a>
                    <a className="item" href="">Cookies Settings</a>
                </div>
            </div>
        </div>
    )
}

function OtherPlatforms() {
    return (
        <div className="icon-container">
            <LinkedIcon Icon={Facebook} />
            <LinkedIcon Icon={Instagram} />
            <LinkedIcon Icon={GitHub} linkUrl="https://github.com/Super7000" />
            <LinkedIcon Icon={LinkedIn} linkUrl="https://www.linkedin.com/in/subratachowdhury7000/" />
        </div>
    )
}

function LinkedIcon({ linkUrl = "#", Icon }) {
    return (
        <a href={linkUrl}>
            <Icon />
        </a>
    )
}