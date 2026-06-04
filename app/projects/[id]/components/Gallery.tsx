"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Model from "@/app/components/Model";
import "@/app/styles/gallery-unique.css"; // Importing unique styles

type Props = {
  images: string[];
};

const Gallery = ({ images }: Props) => {
  const [showModel, setShowModel] = useState(false);
  const [currentImg, setCurrentImg] = useState<string>(images[0]);

  const toggleModel = useCallback(() => {
    setShowModel((prev) => !prev);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentImg((prev) => {
      const index = images.indexOf(prev);
      return images[(index + 1) % images.length];
    });
  }, [images]);

  const handlePrev = useCallback(() => {
    setCurrentImg((prev) => {
      const index = images.indexOf(prev);
      return images[(index - 1 + images.length) % images.length];
    });
  }, [images]);

  return (
    <div className="gallery-unique-root">
      <h2
        style={{
          marginBottom: 0,
          marginTop: "1.5rem",
          fontFamily: "Raleway, sans-serif",
          color: "var(--text-color)",
        }}
      >
        Preview Images
      </h2>

      <div className="gallery-unique-thumbnails">
        {images.map((src, i) => (
          <Image
            width={60}
            height={60}
            src={src}
            key={src}
            onClick={() => {
              setCurrentImg(images[i]);
              toggleModel();
            }}
            alt={`Project Preview ${i + 1}`}
            className="gallery-unique-thumb"
          />
        ))}
      </div>

      {showModel && (
        <Model
          onClose={toggleModel}
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            padding: "2rem",
            position: "fixed",
          }}
        >
          <div className="gallery-unique-modal-content">
            {/* Previous Arrow */}
            <button
              aria-label="Previous Image"
              onClick={handlePrev}
              className="gallery-unique-nav-btn gallery-unique-nav-prev"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            {/* Main Image View */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <img
                src={currentImg}
                alt="Project Preview"
                className="gallery-unique-main-image"
              />

              <div className="gallery-unique-dots-container">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`gallery-unique-dot ${images.indexOf(currentImg) === i ? "gallery-unique-dot-active" : ""}`}
                  />
                ))}
              </div>
            </div>

            {/* Next Arrow */}
            <button
              aria-label="Next Image"
              onClick={handleNext}
              className="gallery-unique-nav-btn gallery-unique-nav-next"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </Model>
      )}
    </div>
  );
};

export default Gallery;
