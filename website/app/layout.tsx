import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Sailendra Kamal | Civil Engineering Portfolio",
  description:
    "Portfolio of Sailendra Kamal, a 8th semester Civil Engineering student building resilient infrastructure and data-driven design solutions.",
  openGraph: {
    title: "Sailendra Kamal | Civil Engineering Portfolio",
    description:
      "A space-tech inspired portfolio featuring projects, skills, and career goals in civil engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${manrope.variable} ${spaceGrotesk.variable} bg-base text-text antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
