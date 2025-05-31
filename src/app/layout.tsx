import '@coinbase/onchainkit/styles.css';
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
    "fc:frame": "vNext",
    "fc:frame:image": process.env.NEXT_PUBLIC_IMAGE_URL || "/ai_anc-removebg-preview (1).png",
    "fc:frame:button:1": "Launch AI Ancestry",
    "fc:frame:button:1:action": "launch_frame",
    "fc:frame:button:1:target": process.env.NEXT_PUBLIC_URL || "https://aiancestry.xyz",
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
