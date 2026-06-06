"use client";

import { useState } from "react";
import { FiMapPin, FiMail, FiLinkedin, FiSend } from "react-icons/fi";

export default function Contact() {
  return (
    <section className="px-6 mt-20 mb-24 max-w-7xl mx-auto w-full" id="contact">
      <div className="mb-10 lg:mb-12 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold font-['Raleway'] text-gray-900 dark:text-gray-100 mb-3 animate-[slide-right_1s_ease-out]">
          Contact Me
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed animate-[slide-right_1s_ease-out_0.2s]">
          Looking to replace an outdated site with a high-performance modern
          design? Drop me a message to discuss your project or request a free
          homepage mockup.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[4fr_6fr] gap-10 lg:gap-12 items-start">
        <LeftSide />
        <RightSide />
      </div>
    </section>
  );
}

function LeftSide() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-md mx-auto lg:mx-0">
      <ContactCard icon={FiMapPin} title="Location" details="India" />
      <ContactCard
        icon={FiMail}
        title="Email"
        details="subratachowdhury7000@gmail.com"
        href="mailto:subratachowdhury7000@gmail.com"
      />
      <ContactCard
        icon={FiLinkedin}
        title="LinkedIn"
        details="Connect on LinkedIn"
        href="https://www.linkedin.com/in/subrata7000/"
      />
    </div>
  );
}

function ContactCard({
  icon: Icon,
  title,
  details,
  href,
}: {
  icon: React.ElementType;
  title: string;
  details: string;
  href?: string;
}) {
  const Content = () => (
    <div className="flex items-center gap-5 group cursor-pointer w-full p-2 -ml-2 rounded-xl transition-colors hover:bg-gray-50 dark:hover:bg-[#121212]">
      {/* Kept your original circular inset shadow design */}
      <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 shrink-0 bg-blue-50 dark:bg-[#1a1a1a] rounded-full shadow-[inset_0_0_20px_rgba(47,108,229,0.1)] dark:shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] group-hover:bg-blue-600 transition-colors duration-300">
        <Icon className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" />
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 m-0 leading-tight">
          {title}
        </h3>
        <div className="text-sm md:text-base font-medium text-gray-600 dark:text-gray-400 mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {details}
        </div>
      </div>
    </div>
  );

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="block outline-none rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <Content />
    </a>
  ) : (
    <div>
      <Content />
    </div>
  );
}

const RightSide = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function addContactDetails(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!firstName.trim() || !message.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
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

      if (!res.ok) throw new Error("Failed to send message");

      alert("Message Sent Successfully! I'll get back to you soon.");
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error sending message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      // Reverted to flat background. No borders, no shadows on the form wrapper.
      className="flex flex-col gap-5 w-full bg-white dark:bg-[#1a1a1a] p-6 sm:p-8 rounded-2xl"
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
            className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-3 text-sm outline-none transition-colors focus:bg-white dark:focus:bg-[#121212] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
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
            className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-3 text-sm outline-none transition-colors focus:bg-white dark:focus:bg-[#121212] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
          className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-3 text-sm outline-none transition-colors focus:bg-white dark:focus:bg-[#121212] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          required
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
          className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-3 text-sm outline-none transition-colors focus:bg-white dark:focus:bg-[#121212] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-y"
          required
        />
      </div>

      <div className="flex justify-center sm:justify-start mt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-medium text-[0.95rem] tracking-wide px-8 py-3.5 rounded-full transition-all hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:bg-gray-400 dark:disabled:bg-neutral-700 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          {isSubmitting ? (
            "Sending..."
          ) : (
            <>
              <span>Send Message</span>
              <FiSend />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
