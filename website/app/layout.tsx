import type { Metadata } from "next";
import { Manrope, Luckiest_Guy, Rye } from "next/font/google";
import "./globals.css";
import { getProfile } from "@/lib/content";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const luckiest = Luckiest_Guy({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const rye = Rye({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poster",
  display: "swap",
});

export function generateMetadata(): Metadata {
  const p = getProfile();
  const title = `${p.name} | Civil Engineering Portfolio`;
  const description = `${p.name}, ${p.role.toLowerCase()} at ${p.college}. ${p.tagline}`;
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    icons: { icon: "/favicon.svg" },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${luckiest.variable} ${rye.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
