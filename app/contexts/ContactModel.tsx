"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import ContactForm from "@/app/components/ContactForm";
import { FiX } from "react-icons/fi";

interface ContactModalContextType {
  openContactModal: (prefillMessage?: string) => void;
  closeContactModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(
  undefined,
);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState("");

  const openContactModal = useCallback((prefillMessage = "") => {
    setInitialMessage(prefillMessage);
    setIsOpen(true);
  }, []);

  const closeContactModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setInitialMessage(""), 300); // Clear after exit animation
  }, []);

  // Prevent background scrolling when global modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <ContactModalContext.Provider
      value={{ openContactModal, closeContactModal }}
    >
      {children}

      {/* Global Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-6">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={closeContactModal}
            aria-hidden="true"
          />

          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1a1a1a] rounded-t-2xl sm:rounded-[1.5rem] shadow-2xl animate-[slide-up_0.3s_ease-out_forwards] scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-neutral-800"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 sm:px-8 py-4 pt-6 sm:pt-4 pb-2 pr-6 bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-md">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Get in Touch
              </h2>
              <button
                onClick={closeContactModal}
                className="p-2 text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white bg-gray-50 dark:bg-[#252525] hover:bg-gray-100 dark:hover:bg-[#303030] rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close modal"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Reused Contact Form */}
            <div className="p-6 md:p-8">
              <ContactForm
                prefillMessage={initialMessage}
                isModalContext={true}
                onSuccessfulSubmit={closeContactModal}
              />
            </div>
          </div>
        </div>
      )}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (context === undefined) {
    throw new Error(
      "useContactModal must be used within a ContactModalProvider",
    );
  }
  return context;
}
