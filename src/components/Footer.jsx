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
            <LinkedIcon iconSrc="../icons/facebook.svg" />
            <LinkedIcon iconSrc="../icons/instagram.svg" />
            <LinkedIcon iconSrc="../icons/github.svg" linkUrl="https://github.com/Super7000" />
            <LinkedIcon iconSrc="../icons/linkedin.svg" linkUrl="https://www.linkedin.com/in/subratachowdhury7000/" />
        </div>
    )
}

function LinkedIcon({ linkUrl = "#", iconSrc = "../icons/github.svg" }) {
    return (
        <a href={linkUrl}>
            <img src={iconSrc} alt="icon" />
        </a>
    )
}