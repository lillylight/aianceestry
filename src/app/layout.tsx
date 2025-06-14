<<<<<<< HEAD
=======
import '@coinbase/onchainkit/styles.css';
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./premium-upload.css";
import DisclaimerPopups from '../components/DisclaimerPopups';
import FloatingFooter from '../components/FloatingFooter';
import BetaTag from '../components/BetaTag';
import { Providers } from '../providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "AI Ancestry",
  description: "AI-powered ancestry analysis from DNA data",
  icons: {
    icon: "/favicon.png",
  },
  manifest: "/manifest.json",
  other: {
    "fc:frame": JSON.stringify({
      "version": "next",
      "imageUrl": "https://aianceestry-5h7h.vercel.app/hero.png",
      "button": {
        "title": "Launch AI Ancestry",
        "action": {
          "type": "launch_frame",
          "name": "AI Ancestry",
          "url": "https://aianceestry-5h7h.vercel.app",
          "splashImageUrl": "https://aianceestry-5h7h.vercel.app/splash.png",
          "splashBackgroundColor": "#f7f8fa"
        }
      }
    }),
    "og:image": "https://aianceestry-5h7h.vercel.app/hero.png",
  },
=======
  title: "aiancestry",
  description: "aiancestry - AI-powered ancestry analysis",
  icons: {
    icon: "/favicon.png",
  },
>>>>>>> e2d9bb87ffec13c20f53b85022324dceb984fb22
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f7f8fa] min-h-screen`}>
        <Providers>
          <BetaTag />
          <DisclaimerPopups />
          {children}
          <FloatingFooter />
        </Providers>
      </body>
    </html>
  );
}
