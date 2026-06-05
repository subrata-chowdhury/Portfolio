"use client";

import { useState } from "react";
import { FiMapPin, FiMail, FiLinkedin, FiSend } from "react-icons/fi";

export default function Contact() {
  return (
    <section
      className="px-[5%] mt-24 max-w-8xl mx-auto w-full mb-24"
      id="contact"
    >
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold font-['Raleway'] text-gray-900 dark:text-gray-100">
          Contact Me
        </h2>
      </div>

      <div className="grid grid-cols-1 max-w-6xl mx-auto lg:grid-cols-[4fr_6fr] gap-12 lg:gap-8 items-center">
        <LeftSide />
        <RightSide />
      </div>
    </section>
  );
}

function LeftSide() {
  return (
    <div className="flex flex-col gap-8 justify-center max-w-md mx-auto lg:mx-0 w-full">
      <ContactCard
        icon={FiMapPin}
        title="Location"
        details="West Bengal, India"
      />
      <ContactCard
        icon={FiMail}
        title="Email"
        details="subratachowdhury7000@gmail.com"
        href="mailto:subratachowdhury7000@gmail.com"
      />
      <ContactCard
        icon={FiLinkedin}
        title="LinkedIn"
        details="subrata7000"
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
    <div className="flex items-center gap-6 group cursor-pointer w-full">
      <div className="flex items-center justify-center w-16 h-16 shrink-0 bg-blue-50 dark:bg-[#1a1a1a] rounded-full shadow-[inset_0_0_20px_rgba(47,108,229,0.1)] dark:shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] group-hover:bg-blue-600 transition-colors duration-300">
        <Icon className="text-2xl text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" />
      </div>
      <div className="flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 m-0 leading-tight">
          {title}
        </h3>
        <div className="text-base font-medium text-gray-600 dark:text-gray-400 mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
      className="no-underline block"
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

    // Validation
    if (!firstName.trim() || !lastName.trim() || !message.trim()) {
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${firstName.trim()} ${lastName.trim()}`,
          email: email.trim(),
          messege: message.trim(), // keeping your original API spelling
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      alert("Message Sent Successfully! I will get back to you soon.");

      // Clear the form
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
      className="flex flex-col gap-5 w-full bg-white dark:bg-[#1a1a1a] p-6 sm:p-8 rounded-2xl"
      onSubmit={addContactDetails}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
        <div className="flex flex-col gap-1.5 w-full">
          <label
            htmlFor="first-name"
            className="text-sm font-bold text-gray-800 dark:text-gray-200 ml-1"
          >
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            aria-label="First Name"
            className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-3.5 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5 w-full">
          <label
            htmlFor="last-name"
            className="text-sm font-bold text-gray-800 dark:text-gray-200 ml-1"
          >
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            aria-label="Last Name"
            className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-3.5 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5 w-full">
        <label
          htmlFor="email"
          className="text-sm font-bold text-gray-800 dark:text-gray-200 ml-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
          aria-label="Email Address"
          className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-3.5 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5 w-full">
        <label
          htmlFor="message"
          className="text-sm font-bold text-gray-800 dark:text-gray-200 ml-1"
        >
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about your website needs..."
          rows={5}
          aria-label="Message"
          className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-3.5 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-y"
          required
        />
      </div>

      <div className="flex justify-center sm:justify-start mt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          aria-label="Send Message"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold text-[0.95rem] tracking-wide px-8 py-3.5 rounded-full transition-all hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 active:bg-blue-800 active:translate-y-0 disabled:bg-gray-400 dark:disabled:bg-neutral-700 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none w-full sm:w-auto"
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
