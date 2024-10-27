const skillsData = [{
    name: "Frontend Development",
    iconSrc: "./icons/Frontend2.svg",
    id: "frontend-development",
    lvl: 3,
    topSkill: true
}, {
    name: "Web Development",
    iconSrc: "./icons/Web Development.svg",
    id: "web-development",
    lvl: 2
}, {
    name: "HTML",
    iconSrc: "./icons/html.svg",
    id: "html",
    lvl: 3,
    topSkill: true
}, {
    name: "CSS",
    iconSrc: "./icons/css.svg",
    id: "css",
    lvl: 3,
    topSkill: true
}, {
    name: "SASS",
    iconSrc: "./icons/sass.svg",
    id: "sass",
    lvl: 1
}, {
    name: "JavaScript",
    iconSrc: "./icons/js.svg",
    id: "java-script",
    lvl: 3,
    topSkill: true
}, {
    name: "TypeScript",
    iconSrc: "./icons/typescript.svg",
    id: "type-script",
    lvl: 3,
    topSkill: true
}, {
    name: "Bootstrap 5",
    iconSrc: "./icons/bootstrap-5.svg",
    id: "boostrap-5",
    lvl: 3,
    topSkill: true
}, {
    name: "MongoDB",
    iconSrc: "./icons/mongodb-icon-1.svg",
    id: "mongodb",
    lvl: 2,
    topSkill: true
}, {
    name: "PHP",
    iconSrc: "./icons/php.svg",
    id: "php",
    lvl: 1
}, {
    name: "C",
    iconSrc: "./icons/c.svg",
    id: "c",
    lvl: 2
}, {
    name: "C++",
    iconSrc: "./icons/cpp.svg",
    id: "cpp",
    lvl: 2
}, {
    name: "Java",
    iconSrc: "./icons/java.svg",
    id: "java",
    lvl: 2
}, {
    name: "OOPs",
    iconSrc: "./icons/oop.webp",
    id: "oops",
    lvl: 2
}, {
    name: "DSA",
    iconSrc: "./icons/dsa.webp",
    id: "dsa",
    lvl: 2
}, {
    name: "Python",
    iconSrc: "./icons/python.svg",
    id: "python",
    lvl: 1
}, {
    name: "MySQL",
    iconSrc: "./icons/MySQL.svg",
    id: "mysql",
    lvl: 2,
    topSkill: true
}, {
    name: "Node.js",
    iconSrc: "./icons/NodeJS.svg",
    id: "nodejs",
    lvl: 2,
    topSkill: true
}, {
    name: "Express.js",
    iconSrc: "./icons/express.webp",
    id: "expressjs",
    lvl: 2,
    topSkill: true
}, {
    name: "React",
    iconSrc: "./icons/React.svg",
    id: "reactjs",
    lvl: 3,
    topSkill: true
}, {
    name: "React Native",
    iconSrc: "./icons/React.svg",
    id: "react-native",
    lvl: 2,
    topSkill: true
}, {
    name: "Redux",
    iconSrc: "./icons/redux.svg",
    id: "redux",
    lvl: 2,
}, {
    name: "Teamwork",
    iconSrc: "./icons/teamwork.svg",
    id: "teamwork",
    lvl: 2
}, {
    name: "Web Design",
    iconSrc: "./icons/web-design.webp",
    id: "web-design",
    lvl: 3,
    topSkill: true
}, {
    name: "Graphic Design",
    iconSrc: "./icons/graphic-design.webp",
    id: "graphic-design",
    lvl: 3
}, {
    name: "AI Tools",
    iconSrc: "./icons/ai.webp",
    id: "ai",
    lvl: 2
}, {
    name: "DBMS",
    iconSrc: "./icons/database.webp",
    id: "dbms",
    lvl: 2
}, {
    name: "Operating System",
    iconSrc: "./icons/os.webp",
    id: "os",
    lvl: 2
}, {
    name: "Responsive Web Design",
    iconSrc: "./icons/ui-design.webp",
    id: "responsive-web-design",
    lvl: 3,
    topSkill: true
}, {
    name: "Quick Learner",
    iconSrc: "./icons/laptop.webp",
    id: "quick-learner",
    lvl: 2
}, {
    name: "Problem Solving",
    iconSrc: "./icons/problem-solving.webp",
    id: "problem-solving",
    lvl: 2
}, {
    name: "REST API",
    iconSrc: "./icons/api.webp",
    id: "rest-api",
    lvl: 2,
    topSkill: true
}, {
    name: "Visual Basic",
    iconSrc: "./icons/vb-file.webp",
    id: "visual-basic",
    lvl: 1
}, {
    name: "Word",
    iconSrc: "./icons/word.webp",
    id: "word",
    lvl: 2
}, {
    name: "Excel",
    iconSrc: "./icons/excel.webp",
    id: "excel",
    lvl: 2
}, {
    name: "PowerPoint",
    iconSrc: "./icons/powerpoint.webp",
    id: "powerpoint",
    lvl: 1
}, {
    name: "Power Bi",
    iconSrc: "./icons/power-bi-2021.svg",
    id: "power-bi",
    lvl: 1
}, {
    name: "Figma",
    iconSrc: "./icons/figma.webp",
    id: "figma",
    lvl: 1
}, {
    name: "IntelliJ IDEA",
    iconSrc: "./icons/intellij-idea.svg",
    id: "intellij-idea",
    lvl: 1
}, {
    name: "Android Studio",
    iconSrc: "./icons/android-studio.webp",
    id: "android-studio",
    lvl: 1
}, {
    name: "Firebase",
    iconSrc: "./icons/Logomark_Full Color.svg",
    id: "firebase",
    lvl: 1
}, {
    name: "Next.js",
    iconSrc: "./icons/nextjs.svg",
    id: "nextjs",
    lvl: 2,
    topSkill: true
}, {
    name: "Tailwind CSS",
    iconSrc: "./icons/tailwind.svg",
    id: "tailwindcss",
    lvl: 2,
    topSkill: true
}]

skillsData.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return b.lvl - a.lvl;
})

export { skillsData }
export const skillCount = skillsData.length