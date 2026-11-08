import type { Metadata } from "next";
import { Manrope, Pirata_One } from "next/font/google";
import "./globals.css";
import { getProfile } from "@/lib/content";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const pirata = Pirata_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pirata",
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
    <html lang="en" className={`${manrope.variable} ${pirata.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
