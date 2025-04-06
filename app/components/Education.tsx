import Arrow from "../Icons/Arrow"
import "@/app/styles/Education.css"

export default function Education() {
    return (
        <section className="screen-container">
            <div className="heading" id="education">
                <div>My Education</div>
            </div>
            <div className="education-container">
                <EducationCard
                    name="X"
                    duration="2018-2019"
                    place="Barjora High School"
                    location="Barjora, Bankura"
                    marks="69.45%"
                    animationDelay={0}
                    certificateLink="https://drive.google.com/file/d/16p1AJ5RHY8ACH7nFcQnelHk6nDr4vmTN/view?usp=drive_link" />
                <EducationCard
                    name="XII"
                    duration="2020-2021"
                    place="Barjora High School"
                    location="Barjora, Bankura"
                    marks="83.2%"
                    animationDelay={0.2}
                    certificateLink="https://drive.google.com/file/d/1gfUDUisqqbctTwH2EptCGoo35OPahHVh/view?usp=drive_link" />
                <EducationCard
                    name="B.Tech in CSE"
                    duration="2021-2025"
                    place="Bengal College of Engineering & Technology"
                    location="Bidhannagar, Durgapure"
                    marks="82%"
                    animationDelay={0.4}
                    certificateLink="https://drive.google.com/drive/folders/1yQp9B98id7vU6IQkjEYx2sKHg7GE_nIa?usp=drive_linkv" />
            </div>
        </section>
    )
}

function EducationCard({
    name = "X",
    duration = "2018-2019",
    place = "Barjora High School",
    location = "Barjora, Bankura",
    marks = "69.45%",
    animationDelay = 0,
    certificateLink = '#'
}) {
    return (
        <div className="education-wrapper">
            {/* <div className="education-card-icon-con">
                <div className="education-dot"></div>
                <div className="education-line"></div>
            </div> */}
            <div className="education-card" style={{ animationDelay: animationDelay + 's' }}>
                <div className="education-name">{name} <span className="duration">({duration})</span></div>
                <div className="place">{place} <span className="location">({location})</span></div>
                <div className="marks">{marks}</div>
                <a href={certificateLink} className="cerificate link-container" target="_blank">
                    <div>View Certificate</div>
                    <Arrow />
                </a>
            </div>
        </div>
    )
}