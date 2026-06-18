import React from "react";
import Image from "next/image";
import { FiExternalLink, FiAward } from "react-icons/fi";
import { certificates } from "../data/certificates";

export default function Certifications() {
  // Filter dynamically to only show high-trust, client-facing certificates
  const clientCerts = certificates.filter((cert) => cert.isClientFacing);

  return (
    <div className="w-full ml-auto md:max-w-lg h-full flex flex-col mt-8 lg:mt-0">
      {/* Column Header - Scaled down to h3 to complement the Education section */}
      <div className="flex items-center gap-3 mb-6 md:mb-8 pl-1">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
          <FiAward className="text-lg" />
        </div>
        <h3
          className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100"
          id="certifications"
        >
          Licenses & Certifications
        </h3>
      </div>

      <div className="flex flex-col gap-3.5 md:gap-4">
        {clientCerts.map((cert, index) => (
          <a
            key={index}
            href={cert.link}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${cert.name} certification from ${cert.issuer}`}
            className="group relative flex items-center p-3.5 md:p-4 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/5 rounded-2xl hover:bg-white dark:hover:bg-gray-800/80 hover:border-blue-200 dark:hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/5 focus:outline-none focus:ring-2 focus:ring-blue-500 animate-[fade-in_0.5s_ease-out_forwards]"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {/* Minimalist Logo Wrapper */}
            <div className="shrink-0 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 mr-3 md:mr-4 group-hover:scale-105 transition-transform duration-300">
              <Image
                src={cert.imgSrc}
                width={24}
                height={24}
                alt={`${cert.issuer} logo`}
                className="object-contain w-6 h-6"
              />
            </div>

            {/* Typography Hierarchy */}
            <div className="flex flex-col flex-1 pr-3 overflow-hidden">
              <span className="text-[0.9rem] md:text-[0.95rem] font-bold text-gray-900 dark:text-gray-100 leading-tight mb-1 truncate">
                {cert.name}
              </span>
              <span className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                {cert.issuer}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
