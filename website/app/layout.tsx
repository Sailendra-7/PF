import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getProfile } from "@/lib/content";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f2f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1214" },
  ],
};

export function generateMetadata(): Metadata {
  const p = getProfile();
  const title = `${p.name} | Civil Engineer`;
  const description = `${p.name}, ${p.role.toLowerCase()} at ${p.college}. ${p.intro}`;
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    icons: { icon: "/favicon.svg" },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="bg-bg font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
