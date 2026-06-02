"use client";

import { MatrixRain } from "@/components/event/MatrixRain";
import { Navbar } from "@/components/event/Navbar";
import { HeroSection } from "@/components/event/HeroSection";
import { AboutSection } from "@/components/event/AboutSection";
import { TimelineSection } from "@/components/event/TimelineSection";
import { EventsSection } from "@/components/event/EventsSection";
import { CTFSection } from "@/components/event/CTFSection";
import { GuestsSection } from "@/components/event/GuestsSection";
import { TeamSection } from "@/components/event/TeamSection";
import { SponsorsSection } from "@/components/event/SponsorsSection";
import { RegistrationSection } from "@/components/event/RegistrationSection";
import { FAQSection } from "@/components/event/FAQSection";
import { Footer } from "@/components/event/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a1a]">
      <MatrixRain />
      <Navbar />
      <main className="flex-1 relative z-10">
        <HeroSection />
        <AboutSection />
        <TimelineSection />
        <EventsSection />
        <CTFSection />
        <GuestsSection />
        <TeamSection />
        <SponsorsSection />
        <RegistrationSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
