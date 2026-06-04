import Arrow from "../Icons/Arrow";
import "@/app/styles/Education.css";
import Certifications from "./Certifications";

export default function Education() {
  return (
    <section className="screen-container" style={{ marginTop: "6rem" }}>
      <div className="edu-cert-grid">
        {/* Left Column: Education */}
        <div className="education-column">
          <h1 className="heading" id="education">
            My Education
          </h1>
          <div className="education-container">
            <EducationCard
              name="XII"
              duration="2020-2021"
              place="Barjora High School"
              location="Barjora, Bankura"
              marks="83.2%"
              animationDelay={0.2}
              certificateLink="/files/HS Marksheet.pdf"
            />
            <EducationCard
              name="B.Tech in CSE"
              duration="2021-2025"
              place="Bengal College of Engineering & Technology"
              location="Bidhannagar, Durgapure"
              marks="82%"
              animationDelay={0.4}
              certificateLink="/files/Provisional Certificate.pdf"
            />
          </div>
        </div>

        {/* Right Column: Certifications */}
        <div className="certifications-column">
          <Certifications />
        </div>
      </div>
    </section>
  );
}

function EducationCard({
  name = "X",
  duration = "2018-2019",
  place = "Barjora High School",
  location = "Barjora, Bankura",
  marks = "69.45%",
  animationDelay = 0,
  certificateLink = "#",
}) {
  return (
    <div className="education-wrapper">
      <div
        className="education-card"
        style={{ animationDelay: animationDelay + "s" }}
      >
        <div className="education-name">
          {name} <span className="duration">({duration})</span>
        </div>
        <div className="place">
          {place} <span className="location">({location})</span>
        </div>
        <div className="marks">{marks}</div>
        <a
          href={certificateLink}
          className="cerificate link-container"
          target="_blank"
          rel="noreferrer"
        >
          <div>View Certificate</div>
          <Arrow />
        </a>
      </div>
    </div>
  );
}
