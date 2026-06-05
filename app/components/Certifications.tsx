import React from "react";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { certificates } from "../data/certificates";

export default function Certifications() {
  // Filter dynamically during render to only show high-trust certificates
  const clientCerts = certificates.filter((cert) => cert.isClientFacing);

  return (
    <div className="w-full">
      <h2
        className="text-3xl md:text-4xl font-bold font-['Raleway'] text-gray-900 dark:text-gray-100 mb-6"
        id="certifications"
      >
        Certifications
      </h2>

      {/* Single compact card replacing the individual bulky cards */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border-2 border-black/15 dark:border-white/10 p-6 shadow-sm">
        <ul className="flex flex-col gap-5 m-0 p-0 list-none">
          {clientCerts.map((cert) => (
            <li
              key={cert.title}
              className="flex justify-between items-center gap-4 pb-5 border-b border-black/5 dark:border-white/10 last:pb-0 last:border-b-0 max-sm:flex-col max-sm:items-start max-sm:gap-3"
            >
              <div className="flex items-center gap-3.5 flex-1">
                <Image
                  src={cert.imgSrc}
                  width={30}
                  height={30}
                  alt=""
                  className="object-contain opacity-90 shrink-0"
                />
                <span className="text-[0.95rem] font-medium text-gray-900 dark:text-gray-100 leading-snug">
                  {cert.title}
                </span>
              </div>
              <a
                className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 no-underline hover:underline transition-colors whitespace-nowrap"
                target="_blank"
                rel="noreferrer"
                href={cert.link}
                aria-label={`View ${cert.title}`}
              >
                View <FiArrowRight className="text-[10px]" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
