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
