"use client";

import { useState, useEffect } from "react";
import { FiSend, FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi";

interface ContactFormProps {
  prefillMessage?: string;
  isModalContext?: boolean;
  onSuccessfulSubmit?: () => void;
}

export default function ContactForm({
  prefillMessage = "",
  isModalContext = false,
  onSuccessfulSubmit,
}: ContactFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(prefillMessage);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync prop changes (for when opened via Packages)
  useEffect(() => {
    if (prefillMessage) {
      setMessage(prefillMessage);
    }
  }, [prefillMessage]);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  const closeStatusModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    if (modalState.type === "success" && onSuccessfulSubmit) {
      onSuccessfulSubmit(); // Close parent context modal if form was opened globally
    }
  };

  async function addContactDetails(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!firstName.trim() || !message.trim()) {
      setModalState({
        isOpen: true,
        type: "error",
        title: "Missing Information",
        message: "Please fill in all required fields before submitting.",
      });
      return;
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setModalState({
          isOpen: true,
          type: "error",
          title: "Invalid Email",
          message: "Please enter a valid email address.",
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName.trim()} ${lastName.trim()}`,
          email: email.trim(),
          messege: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setModalState({
        isOpen: true,
        type: "success",
        title: "Message Sent!",
        message: "Thank you! We'll reach out to you shortly.",
      });

      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
    } catch (e: any) {
      setModalState({
        isOpen: true,
        type: "error",
        title: "Submission Failed",
        message:
          e.message ||
          "There was an issue sending your message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form
        // Remove padding if inside a modal context so it sits flush
        className={`flex flex-col gap-5 w-full bg-white dark:bg-[#1a1a1a] relative rounded-2xl ${!isModalContext ? "" : ""}`}
        onSubmit={addContactDetails}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          <div className="flex flex-col gap-1.5 w-full">
            <label
              htmlFor="first-name"
              className="text-sm font-semibold text-gray-800 dark:text-gray-200 ml-1"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-3.5 text-sm outline-none transition-colors focus:bg-white dark:focus:bg-[#121212] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <label
              htmlFor="last-name"
              className="text-sm font-semibold text-gray-800 dark:text-gray-200 ml-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-3.5 text-sm outline-none transition-colors focus:bg-white dark:focus:bg-[#121212] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-gray-800 dark:text-gray-200 ml-1"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-3.5 text-sm outline-none transition-colors focus:bg-white dark:focus:bg-[#121212] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <label
            htmlFor="message"
            className="text-sm font-semibold text-gray-800 dark:text-gray-200 ml-1"
          >
            Project Details <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your current website URL or tell me about your goals..."
            rows={5}
            className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-3.5 text-sm outline-none transition-colors focus:bg-white dark:focus:bg-[#121212] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-y"
          />
        </div>

        <div className="flex justify-center sm:justify-start mt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-medium text-[0.95rem] tracking-wide px-8 py-3.5 rounded-full transition-all hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:bg-gray-400 dark:disabled:bg-neutral-700 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                <span>Send Message</span>
                <FiSend aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* --- Status Modal (Appears ABOVE the global modal) --- */}
      {modalState.isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeStatusModal}
            aria-hidden="true"
          />
          <div className="relative bg-white dark:bg-[#121212] w-full max-w-sm rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 p-6 sm:p-8 animate-[slide-up_0.3s_ease-out_forwards] flex flex-col items-center text-center">
            <button
              onClick={closeStatusModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1"
            >
              <FiX className="text-xl" />
            </button>
            {modalState.type === "success" ? (
              <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 text-green-500 rounded-full flex items-center justify-center mb-5">
                <FiCheckCircle className="text-3xl" />
              </div>
            ) : (
              <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mb-5">
                <FiAlertCircle className="text-3xl" />
              </div>
            )}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {modalState.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
              {modalState.message}
            </p>
            <button
              onClick={closeStatusModal}
              className={`w-full py-3 rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-[#121212] ${modalState.type === "success" ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500" : "bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-gray-900 dark:text-white"}`}
            >
              {modalState.type === "success" ? "Got it" : "Try Again"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
