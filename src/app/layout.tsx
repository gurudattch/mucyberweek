import type { Metadata } from "next";
import { Orbitron, Nunito } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({ variable: "--font-orbitron", subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });
const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Cyber Security Week 2026 | Mandsaur University",
  description: "Join Mandsaur University's Cyber Security Week 2026 — a week-long celebration of cybersecurity featuring CTF, workshops, expert talks, and more.",
  keywords: ["Cyber Security Week", "Mandsaur University", "CTF", "Cybersecurity", "Hackathon", "Ethical Hacking"],
  openGraph: {
    title: "Cyber Security Week 2026 | Mandsaur University",
    description: "A week-long cybersecurity event featuring CTF, workshops, expert talks, and more.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${orbitron.variable} ${nunito.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
