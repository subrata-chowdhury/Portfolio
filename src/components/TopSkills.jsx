import { SkillsContainer, skillsData } from "./Skills";

export default function TopSkills() {
    return (
        <div className="screen-container">
            <div className="heading" id="skills">
                <div>Top Skills</div>
                {/* <SortButton onClickHandler={() => {
                    const sortedArray = [...skillsData]
                    sortedArray.sort((a, b) => {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return b.lvl - a.lvl;
                    })
                    setSkillData(sortedArray)
                }} /> */}
            </div>
            <SkillsContainer skillsData={skillsData} showOnlyTopSkills={true} />
        </div>
    )
}