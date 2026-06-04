import React from "react";
import Arrow from "../Icons/Arrow";
import "@/app/styles/Certification.css";
import { certificates } from "../data/certificates";
import Image from "next/image";

export default function Certifications() {
  // Filter dynamically during render to only show high-trust certificates
  const clientCerts = certificates.filter((cert) => cert.isClientFacing);

  return (
    <div className="certifications-wrapper">
      <h1 className="heading" id="certifications">
        Certifications
      </h1>

      {/* Single compact card replacing the individual bulky cards */}
      <div className="certifications-compact-card">
        <ul className="certifications-list">
          {clientCerts.map((cert) => (
            <li key={cert.title} className="cert-list-item">
              <div className="cert-info">
                <Image
                  src={cert.imgSrc}
                  width={20}
                  height={20}
                  alt=""
                  className="cert-mini-icon"
                />
                <span className="cert-title">{cert.title}</span>
              </div>
              <a
                className="cert-link"
                target="_blank"
                rel="noreferrer"
                href={cert.link}
                aria-label={`View ${cert.title}`}
              >
                View <Arrow size={8} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
