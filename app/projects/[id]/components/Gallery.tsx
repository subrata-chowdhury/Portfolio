"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Model from "@/app/components/Model";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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
    <div className="flex flex-col gap-4 mt-2">
      <h2 className="font-['Raleway'] text-xl font-bold text-gray-900 dark:text-gray-100">
        Preview Images
      </h2>

      <div className="flex flex-wrap gap-3">
        {images.map((src, i) => (
          <Image
            width={64}
            height={64}
            src={src.startsWith("/") ? src : `/${src}`}
            key={src}
            onClick={() => {
              setCurrentImg(images[i]);
              toggleModel();
            }}
            alt={`Project Preview ${i + 1}`}
            className="w-16 h-16 rounded-md object-cover cursor-pointer border border-black/10 dark:border-white/10 hover:ring-2 hover:ring-blue-500 hover:scale-105 transition-all shadow-sm"
          />
        ))}
      </div>

      {showModel && (
        <Model
          onClose={toggleModel}
          className="bg-black/80 dark:bg-black/90 backdrop-blur-md"
        >
          <div className="relative w-full h-[70vh] md:h-[85vh] flex flex-col justify-center items-center">
            {/* Previous Arrow */}
            <button
              aria-label="Previous Image"
              onClick={handlePrev}
              className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-3 rounded-full z-10 transition-all hover:scale-110 focus:outline-none"
            >
              <FiChevronLeft className="text-3xl" />
            </button>

            {/* Main Image View */}
            <div className="flex flex-col items-center justify-center w-full h-full px-12 md:px-24">
              <div className="relative w-full h-full max-h-full">
                <Image
                  src={
                    currentImg.startsWith("/") ? currentImg : `/${currentImg}`
                  }
                  alt="Project Preview Full"
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {/* Dots Indicator */}
              <div className="flex gap-2 mt-6">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      images.indexOf(currentImg) === i
                        ? "w-8 bg-blue-500"
                        : "w-2.5 bg-gray-400 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Next Arrow */}
            <button
              aria-label="Next Image"
              onClick={handleNext}
              className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-3 rounded-full z-10 transition-all hover:scale-110 focus:outline-none"
            >
              <FiChevronRight className="text-3xl" />
            </button>
          </div>
        </Model>
      )}
    </div>
  );
};

export default Gallery;
