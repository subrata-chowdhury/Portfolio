import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Footer from "./components/Footer";
import Menubar from "./components/Menubar";
import "./globals.css";
import { ReactNode } from "react";
import { Open_Sans, Raleway } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const open_sans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Explicitly define Viewport settings (Next.js 14+ standard)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff", // Update this to match your actual brand/theme color
};

// Centralized, Next.js-native Metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL}`),
  title: {
    default: "Subrata Chowdhury | Full-Stack Web Developer",
    template: "%s | Subrata Chowdhury",
  },
  description:
    "Welcome to the professional portfolio of Subrata Chowdhury, a Full-Stack Web Developer based in West Bengal, India. Showcasing expertise in React.js, Next.js, Node.js, and modern web architectures.",
  keywords: [
    "Subrata Chowdhury",
    "Full-Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Frontend Engineer",
    "Backend Engineer",
    "West Bengal Web Developer",
    "India",
    "Portfolio",
  ],
  authors: [
    {
      name: "Subrata Chowdhury",
      url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    },
  ],
  creator: "Subrata Chowdhury",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/logo.webp", type: "image/webp" },
    ],
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title: "Subrata Chowdhury | Full-Stack Web Developer",
    description:
      "Discover the portfolio of Subrata Chowdhury. Showcasing professional projects, full-stack web development skills, and technical expertise.",
    siteName: "Subrata Chowdhury Portfolio",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Subrata Chowdhury Portfolio Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subrata Chowdhury | Full-Stack Web Developer",
    description:
      "Explore the professional portfolio of Subrata Chowdhury, featuring projects and skills in full-stack development, React.js, and modern tech stacks.",
    images: ["/logo.png"],
    creator: "@Subrata70000",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Define Structured Data (JSON-LD) for SEO Rich Snippets
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Subrata Chowdhury",
    url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    image: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
    jobTitle: "Full-Stack Web Developer",
    // Make sure these match your actual active profiles
    sameAs: [
      "https://github.com/subrata-chowdhury",
      "https://www.linkedin.com/in/your-linkedin-id", // Update this!
      "https://twitter.com/Subrata70000",
    ],
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`scroll-smooth ${open_sans.className} ${raleway.className}`}
    >
      <body>
        {/* 1. Google Analytics Injection */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}

        {/* 2. JSON-LD Schema Injection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />

        {/* 3. Accessibility: Skip to Content Button */}
        <a
          href="#main-content"
          className="skip-to-content-btn"
          style={{
            position: "absolute",
            left: "-9999px",
            top: "auto",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
        >
          Skip to main content
        </a>

        <Menubar />

        {/* 4. Wrapped children in a <main> tag with an ID corresponding to the skip link */}
        <main id="main-content">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
