import { FiMapPin, FiMail, FiLinkedin, FiSend } from "react-icons/fi";
import ContactForm from "./ContactForm";

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
        <ContactForm />
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
        details="subrata.chowdhury1001@gmail.com"
        href="mailto:subrata.chowdhury1001@gmail.com"
      />
      <ContactCard
        icon={FiLinkedin}
        title="LinkedIn"
        details="Connect on LinkedIn"
        href="https://www.linkedin.com/in/subrata1001/"
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
