import Footer from "./components/Footer";
import Menubar from "./components/Menubar";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./globals.css";
import { ReactNode } from "react";
import { Open_Sans, Raleway } from 'next/font/google';

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
});

const open_sans = Open_Sans({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    display: 'swap',
});

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className={open_sans.className + " " + raleway.className}>
            <head>
                <meta charSet="UTF-8" />
                {/* <link href='https://fonts.googleapis.com/css?family=IBM Plex Sans' rel='stylesheet' />
                <link
                    href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
                    rel="stylesheet" crossOrigin="" /> */}
                {/* <script src="https://cdn.jsdelivr.net/npm/kute.js@2.2.4/dist/kute.min.js"></script> */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" type="image/png" href="/logo.png" />
                <link rel="icon" type="image/webp" href="/logo.webp" />
                <title>Subrata Chowdhury | Full-Stack Web Developer Portfolio</title>
                <meta name="description"
                    content="Welcome to the professional portfolio of Subrata Chowdhury, showcasing expertise in full-stack web development, React.js, Next.js, and AWS. Explore innovative projects and technical skills." />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:image" content="https://subratachowdhuryportfolio.vercel.app/logo.png" />
                <meta property="twitter:title" content="Subrata Chowdhury | Full-Stack Web Developer Portfolio" />
                <meta property="twitter:description"
                    content="Explore the professional portfolio of Subrata Chowdhury, featuring projects and skills in full-stack development, React.js, and AWS." />

                <meta property="og:image" content="https://subratachowdhuryportfolio.vercel.app/logo.png" />
                <meta property="og:site_name" content="Subrata Chowdhury Portfolio" />
                <meta property="og:title" content="Subrata Chowdhury | Full-Stack Web Developer Portfolio" />
                <meta property="og:description"
                    content="Discover the portfolio of Subrata Chowdhury, a skilled web developer with expertise in React.js, Next.js, and AWS. Showcasing professional projects and development skills." />
                <meta property="og:url" content="https://subratachowdhuryportfolio.vercel.app/" />

                <meta name="twitter:creator" content="@Subrata70000" />
                <meta property="og:type" content="website" />
            </head>
            <body>
                <ThemeProvider>
                    <Menubar />
                    {children}
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
