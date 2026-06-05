import { FiArrowRight } from "react-icons/fi";
import Certifications from "./Certifications";

export default function Education() {
  return (
    <section className="px-[5%] mt-24 max-w-8xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
        {/* Left Column: Education */}
        <div className="flex flex-col">
          <h2
            className="text-3xl md:text-4xl font-bold font-['Raleway'] text-gray-900 dark:text-gray-100 mb-6"
            id="education"
          >
            My Education
          </h2>
          <div className="flex flex-col gap-4">
            <EducationCard
              name="XII"
              duration="2020-2021"
              place="Barjora High School"
              location="Barjora, Bankura"
              marks="83.2%"
              certificateLink="/files/HS Marksheet.pdf"
            />
            <EducationCard
              name="B.Tech in CSE"
              duration="2021-2025"
              place="Bengal College of Engineering & Technology"
              location="Bidhannagar, Durgapur"
              marks="82%"
              certificateLink="/files/Provisional Certificate.pdf"
            />
          </div>
        </div>

        {/* Right Column: Certifications */}
        <div className="flex flex-col">
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
  certificateLink = "#",
}: {
  name?: string;
  duration?: string;
  place?: string;
  location?: string;
  marks?: string;
  certificateLink?: string;
}) {
  return (
    <div className="w-full">
      {/* Removed opacity-0 and custom animation classes here */}
      <div className="w-full px-6 py-5 bg-white dark:bg-[#1a1a1a] rounded-xl border-2 border-black/15 dark:border-white/10 text-gray-900 dark:text-gray-100 flex flex-col gap-1 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
        <div className="text-[1.4rem] font-bold">
          {name}{" "}
          <span className="font-normal text-lg text-gray-600 dark:text-gray-400">
            ({duration})
          </span>
        </div>
        <div className="text-base font-medium text-gray-700 dark:text-gray-300">
          {place}{" "}
          <span className="font-normal text-gray-500 dark:text-gray-400">
            ({location})
          </span>
        </div>
        <div className="text-[1.6rem] text-blue-600 dark:text-blue-500 font-bold mt-1">
          {marks}
        </div>
        <a
          href={certificateLink}
          className="flex items-center gap-2 text-gray-900 dark:text-gray-100 font-bold w-max hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          target="_blank"
          rel="noreferrer"
        >
          <div>View Certificate</div>
          <FiArrowRight />
        </a>
      </div>
    </div>
  );
}
