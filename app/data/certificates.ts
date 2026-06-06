export type Certificate = {
  name: string;
  issuer: string;
  link: string;
  imgSrc: string;
  isClientFacing?: boolean;
};

export const certificates: Certificate[] = [
  {
    name: "Java Full Stack Certification",
    issuer: "Wipro TalentNext",
    link: "https://cert.diceid.com/cid/7xPCZAPU5m?verify=true",
    imgSrc: "/certificates/companys/wipro.webp",
    isClientFacing: true,
  },
  {
    name: "Frontend Development (React)",
    issuer: "HackerRank",
    link: "https://www.hackerrank.com/certificates/4a6f360b155e",
    imgSrc: "/certificates/companys/hacker-rank.webp",
    isClientFacing: true,
  },
  {
    name: "Foundations: Data, Data, Everywhere",
    issuer: "Coursera",
    link: "https://coursera.org/verify/GDZHXWY2ETMV",
    imgSrc: "/certificates/companys/coursera.webp",
    isClientFacing: true,
  },
  {
    name: "JavaScript (Intermediate)",
    issuer: "HackerRank",
    link: "https://www.hackerrank.com/certificates/c58cd6bd1b6d",
    imgSrc: "/certificates/companys/hacker-rank.webp",
  },
  {
    name: "SQL (Advanced)",
    issuer: "HackerRank",
    link: "https://www.hackerrank.com/certificates/57a73cd708d5",
    imgSrc: "/certificates/companys/hacker-rank.webp",
  },
  {
    name: "Java (Basic)",
    issuer: "HackerRank",
    link: "https://www.hackerrank.com/certificates/1460fea5d18d",
    imgSrc: "/certificates/companys/hacker-rank.webp",
  },
];

export const certificateCount = certificates.length;
