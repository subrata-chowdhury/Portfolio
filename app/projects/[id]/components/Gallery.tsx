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
    <div className="flex flex-col gap-3 mt-4">
      <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
        Gallery
      </h2>

      {/* Tightly packed Grid - no horizontal scroll needed */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => {
              setCurrentImg(images[i]);
              toggleModel();
            }}
            className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-200/75 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-neutral-900 group"
            aria-label={`View full preview image ${i + 1}`}
          >
            <Image
              src={src.startsWith("/") ? src : `/${src}`}
              alt={`Project Preview ${i + 1}`}
              fill
              sizes="(max-width: 768px) 25vw, 20vw"
              className="object-cover group-hover:opacity-80 transition-opacity"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Image Viewer Modal */}
      {showModel && (
        <Model
          onClose={toggleModel}
          className="bg-white/95 dark:bg-[#050505]/95 backdrop-blur-xl"
        >
          <div className="relative w-full h-[70vh] md:h-[85vh] flex flex-col justify-center items-center">
            <button
              aria-label="Previous Image"
              onClick={handlePrev}
              className="absolute left-0 md:left-8 top-1/2 -translate-y-1/2 bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-900 dark:text-white p-3 rounded-full z-10 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              <FiChevronLeft className="text-2xl" />
            </button>

            <div className="flex flex-col items-center justify-center w-full h-full px-14 md:px-24">
              <div className="relative w-full h-full max-h-full rounded-xl overflow-hidden shadow-xl">
                <Image
                  src={
                    currentImg.startsWith("/") ? currentImg : `/${currentImg}`
                  }
                  alt="Project Preview Full"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              <div className="text-xs font-medium text-gray-500 mt-4">
                {images.indexOf(currentImg) + 1} of {images.length}
              </div>
            </div>

            <button
              aria-label="Next Image"
              onClick={handleNext}
              className="absolute right-0 md:right-8 top-1/2 -translate-y-1/2 bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-900 dark:text-white p-3 rounded-full z-10 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              <FiChevronRight className="text-2xl" />
            </button>
          </div>
        </Model>
      )}
    </div>
  );
};

export default Gallery;
