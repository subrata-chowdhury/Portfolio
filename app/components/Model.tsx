import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";

function Model({
  onClose,
  style,
  className = "",
  children,
}: {
  onClose: () => void;
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
}) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <button
        onClick={onClose}
        aria-label="Close modal"
        className="fixed top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-lg flex justify-center items-center z-[61] bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors cursor-pointer text-gray-900 dark:text-white backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
      >
        <FiX className="text-2xl" />
      </button>

      <div
        className={`fixed inset-0 w-full h-full p-6 pt-20 md:p-12 md:pt-12 bg-white dark:bg-neutral-900 z-[60] overflow-y-auto ${className}`}
        style={style}
      >
        <div className="max-w-7xl mx-auto h-full">{children}</div>
      </div>
    </>
  );
}

export default Model;
