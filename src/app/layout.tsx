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
  title: "AI Ancestry Analysis",
  description: "AI-powered ancestry analysis from photos using advanced genetic markers",
  icons: {
    icon: "/favicon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "AI Ancestry Analysis",
    description: "AI-powered ancestry analysis from photos using advanced genetic markers",
    images: ["/hero.png"],
    type: "website",
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": `${process.env.NEXT_PUBLIC_URL || 'https://aianceestry-5h7h.vercel.app'}/hero.png`,
    "fc:frame:button:1": "Analyze DNA",
    "fc:frame:post_url": `${process.env.NEXT_PUBLIC_URL || 'https://aianceestry-5h7h.vercel.app'}/api/frame`,
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
