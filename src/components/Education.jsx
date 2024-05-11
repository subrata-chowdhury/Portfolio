import Arrow from "../Icons/Arrow"
import "../style/Education.css"

export default function Education() {
    return (
        <div className="screen-container">
            <div className="heading" id="education">
                <div>My Education</div>
            </div>
            <div className="education-container">
                <EducationCard name="X" duration="2018-2019" place="Barjora High School" location="Barjora, Bankura" marks="69.45%" animationDelay={0} />
                <EducationCard name="XII" duration="2020-2021" place="Barjora High School" location="Barjora, Bankura" marks="83.2%" animationDelay={0.2} />
                <EducationCard name="B.Tech in CSE" duration="2021-2025" place="Bengal College of Engineering & Technology" location="Bidhannagar, Durgapure" marks="82%" animationDelay={0.4} />
            </div>
        </div>
    )
}

function EducationCard({ name = "X", duration = "2018-2019", place = "Barjora High School", location = "Barjora, Bankura", marks = "69.45%", animationDelay = 0 }) {
    return (
        <div className="education-card" style={{ animationDelay: animationDelay + 's' }}>
            <div className="education-name">{name} <span className="duration">({duration})</span></div>
            <div className="place">{place} <span className="location">({location})</span></div>
            <div className="marks">{marks}</div>
            <a href="" className="cerificate link-container">
                <div>View Certificate</div>
                <Arrow />
            </a>
        </div>
    )
}