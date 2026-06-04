export type Certificate = {
  title: string;
  link: string;
  imgSrc: string;
  isClientFacing?: boolean; // New property to filter for high-trust items
};

export const certificates: Certificate[] = [
  {
    title: "Java Full Stack Certification || Wipro TalentNext",
    link: "https://cert.diceid.com/cid/7xPCZAPU5m?verify=true",
    imgSrc: "/certificates/companys/wipro.webp",
    isClientFacing: true, // Enterprise brand trust
  },
  {
    title: "Frontend Development (React) || HackerRank",
    link: "https://www.hackerrank.com/certificates/4a6f360b155e",
    imgSrc: "/certificates/companys/hacker-rank.webp",
    isClientFacing: true, // Highly relevant to your primary service
  },
  {
    title: "JavaScript (Intermediate) || HackerRank",
    link: "https://www.hackerrank.com/certificates/c58cd6bd1b6d",
    imgSrc: "/certificates/companys/hacker-rank.webp",
  },
  {
    title: "SQL (Advanced) || HackerRank",
    link: "https://www.hackerrank.com/certificates/57a73cd708d5",
    imgSrc: "/certificates/companys/hacker-rank.webp",
  },
  {
    title: "Java (Basic) || HackerRank",
    link: "https://www.hackerrank.com/certificates/1460fea5d18d",
    imgSrc: "/certificates/companys/hacker-rank.webp",
  },
  {
    title: "Foundations: Data, Data, Everywhere || Coursera",
    link: "https://coursera.org/verify/GDZHXWY2ETMV",
    imgSrc: "/certificates/companys/coursera.webp",
    isClientFacing: true, // Google brand recognition
  },
];

export const certificateCount = certificates.length;