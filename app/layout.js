import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        {/* <link rel="icon" type="image/png" href="/logo.png" /> */}
        {/* <link href='https://fonts.googleapis.com/css?family=IBM Plex Sans' rel='stylesheet' />
	<link rel="preload"
		href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
		rel="stylesheet" crossorigin=""/>
	<script src="https://cdn.jsdelivr.net/npm/kute.js@2.2.4/dist/kute.min.js"></script> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Subrata Chowdhury | Full-Stack Web Developer Portfolio</title>
        <meta name="description"
          content="Welcome to the professional portfolio of Subrata Chowdhury, showcasing expertise in full-stack web development, React.js, Next.js, and AWS. Explore innovative projects and technical skills." />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="https://example.com/assets/images/twitter-portfolio.jpg" />
        <meta property="twitter:title" content="Subrata Chowdhury | Full-Stack Web Developer Portfolio" />
        <meta property="twitter:description"
          content="Explore the professional portfolio of Subrata Chowdhury, featuring projects and skills in full-stack development, React.js, and AWS." />

        <meta property="og:image" content="https://example.com/assets/images/og-portfolio.jpg" />
        <meta property="og:site_name" content="Subrata Chowdhury Portfolio" />
        <meta property="og:title" content="Subrata Chowdhury | Full-Stack Web Developer Portfolio" />
        <meta property="og:description"
          content="Discover the portfolio of Subrata Chowdhury, a skilled web developer with expertise in React.js, Next.js, and AWS. Showcasing professional projects and development skills." />
        <meta property="og:url" content="https://subratachowdhuryportfolio.vercel.app/" />

        <meta name="twitter:creator" content="@Subrata70000" />
        <meta property="og:type" content="website" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
