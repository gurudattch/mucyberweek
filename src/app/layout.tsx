import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cyber Security Week 2025 | Mandsaur University",
  description: "Join Mandsaur University's Cyber Security Week 2025 — a week-long celebration of cybersecurity featuring CTF, workshops, expert talks, and more.",
  keywords: ["Cyber Security Week", "Mandsaur University", "CTF", "Cybersecurity", "Hackathon", "Ethical Hacking"],
  openGraph: {
    title: "Cyber Security Week 2025 | Mandsaur University",
    description: "A week-long cybersecurity event featuring CTF, workshops, expert talks, and more.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
