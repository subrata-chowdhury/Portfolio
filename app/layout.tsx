import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Footer from "./components/Footer";
import Menubar from "./components/Menubar";
import "./globals.css";
import { ReactNode } from "react";
import { Open_Sans, Raleway } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ContactModalProvider } from "./contexts/ContactModel";

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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9fafb" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
};

// Centralized, Next.js-native Metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL}`),
  title: {
    default: "Freelance Web Developer | Custom Websites & Redesigns",
    template: "%s | Subrata Chowdhury",
  },
  description:
    "Replace your slow, outdated website with a fast, modern, and mobile-friendly design. I build high-performance web experiences for small businesses. Request a free custom mockup today.",
  keywords: [
    "Freelance Web Developer",
    "Small Business Website Redesign",
    "Custom Landing Pages",
    "Fast Website Development",
    "Next.js Developer",
    "Subrata Chowdhury",
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
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Subrata Chowdhury | Full-Stack Web Developer",
  //   description:
  //     "Explore the professional portfolio of Subrata Chowdhury, featuring projects and skills in full-stack development, React.js, and modern tech stacks.",
  //   images: ["/logo.png"],
  //   creator: "@Subrata70000",
  // },
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
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${process.env.NEXT_PUBLIC_APP_URL}/#person`,
        name: "Subrata Chowdhury",
        url: `${process.env.NEXT_PUBLIC_APP_URL}`,
        image: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
        jobTitle: "Freelance Full-Stack Web Developer",
        sameAs: [
          "https://github.com/subrata-chowdhury",
          "https://www.linkedin.com/in/subrata1001",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${process.env.NEXT_PUBLIC_APP_URL}/#service`,
        name: "Subrata Chowdhury Web Development",
        url: `${process.env.NEXT_PUBLIC_APP_URL}`,
        description:
          "Fast, modern, responsive website redesigns, landing pages, and full-stack web applications for businesses.",
        image: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
        provider: {
          "@id": `${process.env.NEXT_PUBLIC_APP_URL}/#person`,
        },
        areaServed: ["US", "GB", "AU", "IN"],
        priceRange: "$60 - $300",
        offers: [
          {
            "@type": "Offer",
            name: "Custom Landing Page",
            description:
              "1 Page Custom Website with free Figma mockup upfront.",
            price: "60.00",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            name: "UI/UX Redesign",
            description:
              "Up to 5 Pages with dynamic content setup and responsive mobile UI.",
            price: "150.00",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            name: "Web App / SaaS",
            description:
              "Full-stack web applications, secure APIs, and custom SaaS MVPs.",
            price: "300.00",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        ],
      },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
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

        <ContactModalProvider>
          <Menubar />

          {/* 4. Wrapped children in a <main> tag with an ID corresponding to the skip link */}
          <main id="main-content">{children}</main>

          <Footer />
        </ContactModalProvider>
      </body>
    </html>
  );
}
