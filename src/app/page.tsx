"use client";

import { useEffect, useRef, useState } from "react";
import {
  eventInfo, navLinks, stats, timeline, events, ctfInfo,
  speakers, teamMembers, sponsors, partners, faqs, eventTypes,
} from "@/lib/event-data";

/* ─── Matrix Rain Canvas ─── */
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\|~";
    const fontSize = 14;
    const cols = Math.floor(c.width / fontSize);
    const drops: number[] = Array(cols).fill(1);
    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 26, 0.05)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const t = chars[Math.floor(Math.random() * chars.length)];
        ctx.globalAlpha = 0.15;
        ctx.fillText(t, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      ctx.globalAlpha = 1;
    };
    const id = setInterval(draw, 50);
    return () => { clearInterval(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} id="matrix-canvas" />;
}

/* ─── Countdown Logic ─── */
function calcCountdown(targetDate: string) {
  const d = new Date(targetDate).getTime() - Date.now();
  if (d <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(d / 864e5),
    hours: Math.floor((d % 864e5) / 36e5),
    minutes: Math.floor((d % 36e5) / 6e4),
    seconds: Math.floor((d % 6e4) / 1e3),
  };
}

function useCountdown(targetDate: string) {
  const [time, setTime] = useState(() => calcCountdown(targetDate));
  useEffect(() => {
    const id = setInterval(() => setTime(calcCountdown(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
}

/* ─── SVG Icons (inline, no library needed) ─── */
const Icons = {
  shield: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>,
  calendar: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>,
  mapPin: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  chevronDown: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  chevronRight: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>,
  mail: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  phone: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  externalLink: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>,
  send: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></svg>,
  check: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>,
  heart: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
  flag: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>,
  instagram: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>,
  twitter: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>,
  linkedin: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>,
  github: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>,
  zap: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>,
  users: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  trophy: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>,
  shieldCheck: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>,
  target: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  lightbulb: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>,
  bookOpen: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  cpu: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>,
  globe: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>,
  lock: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  cog: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>,
  search: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  eye: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
  puzzle: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.315 8.285a.98.98 0 0 1 .837-.276c.47.07.802.48.968.925a2.501 2.501 0 1 0 3.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 0 1 .276-.837l1.61-1.61a2.404 2.404 0 0 1 1.705-.707c.618 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z"/></svg>,
  graduationCap: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  user: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
};

/* ─── Main Page ─── */
export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(1);
  const [activeFilter, setActiveFilter] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", college: "", event: "general" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const countdown = useCountdown(eventInfo.startDate);

  // Scroll effects
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeDay, activeFilter]);

  const filteredEvents = activeFilter === "All" ? events : events.filter((e) => e.category === activeFilter);
  const categories = ["All", ...Array.from(new Set(events.map((e) => e.category)))];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`CSW 2026 Registration - ${formData.event.toUpperCase()}`);
    const body = encodeURIComponent(
      `Registration for Cyber Security Week 2026\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCollege: ${formData.college}\nEvent Type: ${formData.event}\n\nSubmitted on: ${new Date().toLocaleString()}`
    );
    window.open(`mailto:${eventInfo.email}?subject=${subject}&body=${body}`, "_blank");
    setIsSubmitted(true);
  };

  const ctfIconMap: Record<string, React.ReactNode> = {
    Globe: Icons.globe, Lock: Icons.lock, Cog: Icons.cog, Search: Icons.search, Eye: Icons.eye, Puzzle: Icons.puzzle,
  };

  const statIcons: Record<string, React.ReactNode> = {
    Calendar: Icons.calendar, Zap: Icons.zap, Users: Icons.users, Trophy: Icons.trophy,
  };

  const tierColors: Record<string, { label: string; color: string; borderColor: string }> = {
    platinum: { label: "Platinum", color: "text-gray-200", borderColor: "tier-platinum" },
    gold: { label: "Gold", color: "text-amber-400", borderColor: "tier-gold" },
    silver: { label: "Silver", color: "text-gray-400", borderColor: "tier-silver" },
    community: { label: "Community", color: "text-[#00ff41]", borderColor: "tier-community" },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a1a]">
      <MatrixRain />

      {/* ─── NAVBAR ─── */}
      <nav className={`navbar ${navScrolled ? "scrolled" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[60px]">
          <a href="#home" className="flex items-center gap-2 text-[#00ff41] font-bold font-mono text-lg no-underline">
            {Icons.shield} CSW 2026
          </a>
          <div className="nav-links hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </div>
          <button className={`hamburger ${mobileOpen ? "open" : ""}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
        <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{ padding: "10px 16px" }}>{l.label}</a>
          ))}
        </div>
      </nav>

      <main className="flex-1 relative z-10">
        {/* ─── HERO ─── */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-gradient-to-br from-[#0a0a1a] via-[#0a1a0a] to-[#0a0a2a]" />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(0,255,65,0.08) 0%, transparent 70%)" }} />
          </div>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none" style={{ background: "rgba(0,255,65,0.05)" }} />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none" style={{ background: "rgba(0,212,255,0.05)" }} />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            {/* Shield Icon */}
            <div className="flex justify-center mb-6" style={{ animation: "scaleIn 0.8s ease forwards" }}>
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#00ff41" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
                <div className="absolute inset-0 w-[80px] h-[80px] rounded-full border-2 border-[#00ff41]/20" style={{ animation: "pulse 2s ease infinite" }} />
              </div>
            </div>

            {/* University Badge */}
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#00ff41]/30 bg-[#00ff41]/10 mb-4" style={{ animation: "fadeInUp 0.8s ease 0.2s both" }}>
              <span className="text-[#00ff41] text-sm font-mono font-medium tracking-wider">&gt;_ {eventInfo.university}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4" style={{ animation: "fadeInUp 0.8s ease 0.3s both" }}>
              <span className="text-[#00ff41] glow-green-text font-mono">Cyber</span>{" "}
              <span className="text-white">Security</span>{" "}
              <span className="text-[#00d4ff] glow-cyan-text font-mono">Week</span>{" "}
              <span className="text-white">2026</span>
            </h1>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl md:text-3xl font-mono text-[#00ff41]/80 mb-2 tracking-wide" style={{ animation: "fadeInUp 0.8s ease 0.4s both" }}>
              {eventInfo.tagline}
            </p>

            {/* Date & Venue */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-[#94a3b8] mb-8" style={{ animation: "fadeInUp 0.8s ease 0.5s both" }}>
              <div className="flex items-center gap-2 text-[#00d4ff]">
                {Icons.calendar} <span className="font-mono text-sm sm:text-base text-[#94a3b8]">{eventInfo.dates}</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-[#1e293b]" />
              <div className="flex items-center gap-2 text-[#00d4ff]">
                {Icons.mapPin} <span className="font-mono text-sm sm:text-base text-[#94a3b8]">{eventInfo.venue}</span>
              </div>
            </div>

            {/* Countdown */}
            <div className="mb-8" style={{ animation: "fadeInUp 0.8s ease 0.6s both" }}>
              <p className="text-xs text-[#94a3b8] font-mono uppercase tracking-widest mb-3">Event Starts In</p>
              <div className="flex gap-3 sm:gap-4 justify-center">
                {[
                  { label: "Days", value: countdown.days },
                  { label: "Hours", value: countdown.hours },
                  { label: "Minutes", value: countdown.minutes },
                  { label: "Seconds", value: countdown.seconds },
                ].map((u) => (
                  <div key={u.label} className="countdown-unit">
                    <div className="countdown-box">
                      <span className="text-2xl sm:text-3xl font-bold font-mono text-[#00ff41] glow-green-text">
                        {String(u.value).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-xs text-[#94a3b8] mt-1 font-mono uppercase tracking-wider">{u.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12" style={{ animation: "fadeInUp 0.8s ease 0.7s both" }}>
              <a href="#register" className="neon-button bg-[#00ff41] text-[#0a0a1a] hover:bg-[#00ff41]/90 font-bold font-mono px-8 h-12 text-base rounded-lg flex items-center justify-center no-underline">
                Register Now
              </a>
              <a href="#ctf" className="border border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/10 hover:border-[#00d4ff]/50 font-mono px-8 h-12 text-base rounded-lg flex items-center justify-center no-underline transition-all">
                Join CTF
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto" style={{ animation: "fadeInUp 0.8s ease 0.8s both" }}>
              {stats.map((s) => (
                <div key={s.label} className="glass-card rounded-xl p-4 text-center group">
                  <div className="text-[#00ff41] mx-auto mb-2 flex justify-center">{statIcons[s.icon] || Icons.zap}</div>
                  <div className="text-2xl font-bold font-mono text-white">{s.value}</div>
                  <div className="text-xs text-[#94a3b8] font-mono uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[#00ff41]/50" style={{ animation: "float 1.5s ease infinite" }}>
            {Icons.chevronDown}
          </div>
        </section>

        {/* ─── ABOUT ─── */}
        <section id="about" className="relative py-20 sm:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0a0f1a] to-[#0a0a1a]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-on-scroll">
              <span className="section-label border border-[#00d4ff]/30 bg-[#00d4ff]/10 text-[#00d4ff]">About the Event</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-white">What is </span>
                <span className="text-[#00ff41] glow-green-text font-mono">CSW 2026</span>
                <span className="text-white">?</span>
              </h2>
              <p className="text-[#94a3b8] max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">{eventInfo.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Icons.shieldCheck, title: "Hands-on Workshops", desc: "Practical sessions on ethical hacking, web security, forensics, and more with real-world tools." },
                { icon: Icons.target, title: "CTF Competition", desc: "Jeopardy-style Capture The Flag across Web, Crypto, Reverse Engineering, Forensics, and OSINT." },
                { icon: Icons.users, title: "Expert Speakers", desc: "Learn from industry leaders, security researchers, and government officials shaping India's cyber defense." },
                { icon: Icons.lightbulb, title: "Career Guidance", desc: "Panel discussions and fireside chats on career paths, certifications, and opportunities in cybersecurity." },
                { icon: Icons.bookOpen, title: "Knowledge Sharing", desc: "Open forums, write-up presentations, and community networking with fellow enthusiasts." },
                { icon: Icons.cpu, title: "Latest Technologies", desc: "Explore AI in security, cloud security, zero-trust architecture, and cutting-edge threat intelligence." },
              ].map((f, i) => (
                <div key={f.title} className={`glass-card rounded-xl p-6 animate-on-scroll delay-${i % 4}`}>
                  <div className="w-12 h-12 rounded-lg bg-[#00ff41]/10 border border-[#00ff41]/20 flex items-center justify-center mb-4 text-[#00ff41]">{f.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2 font-mono">{f.title}</h3>
                  <p className="text-sm text-[#94a3b8] leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-16 glass-card rounded-2xl p-8 text-center border border-[#00d4ff]/10 animate-on-scroll">
              <h3 className="text-xl font-semibold text-white mb-2">Hosted by <span className="text-[#00d4ff] font-mono">Mandsaur University</span></h3>
              <p className="text-[#94a3b8] text-sm max-w-2xl mx-auto">A premier educational institution in Mandsaur, Madhya Pradesh, committed to academic excellence and innovation. The Department of Computer Science & IT proudly presents Cyber Security Week 2026.</p>
            </div>
          </div>
        </section>

        {/* ─── TIMELINE ─── */}
        <section id="schedule" className="relative py-20 sm:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0a0f1a] to-[#0a0a1a]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-on-scroll">
              <span className="section-label border border-[#00ff41]/30 bg-[#00ff41]/10 text-[#00ff41]">Schedule</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-white">7-Day </span><span className="text-[#00ff41] glow-green-text font-mono">Timeline</span>
              </h2>
              <p className="text-[#94a3b8]">Each day packed with learning, competition, and networking</p>
            </div>
            {/* Day Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-8 justify-center flex-wrap">
              {timeline.map((d) => (
                <button key={d.day} className={`timeline-tab ${activeDay === d.day ? "active" : ""}`} onClick={() => setActiveDay(d.day)}>
                  Day {d.day}
                </button>
              ))}
            </div>
            {/* Active Day Content */}
            {timeline.filter((d) => d.day === activeDay).map((d) => (
              <div key={d.day} className="animate-on-scroll">
                <div className="glass-card rounded-2xl p-6 sm:p-8 border border-[#00ff41]/10 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6">
                    <span className="text-[#00ff41] font-mono text-sm font-bold">Day {d.day} — {d.date}</span>
                    <h3 className="text-xl font-bold text-white font-mono">{d.title}</h3>
                  </div>
                  <p className="text-[#94a3b8] text-sm mb-6">{d.description}</p>
                  <div className="space-y-3">
                    {d.events.map((ev, i) => {
                      const et = eventTypes[ev.type];
                      return (
                        <div key={i} className="flex items-start gap-4 p-3 rounded-lg bg-[#0a0a1a]/50 border border-[#1e293b]/30">
                          <span className="font-mono text-xs text-[#94a3b8] min-w-[80px] pt-0.5">{ev.time}</span>
                          <span className="text-sm text-white flex-1">{ev.name}</span>
                          {et && <span className={`event-badge ${et.color}`}>{et.label}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── EVENTS ─── */}
        <section id="events" className="relative py-20 sm:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0a0f1a] to-[#0a0a1a]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-on-scroll">
              <span className="section-label border border-[#00d4ff]/30 bg-[#00d4ff]/10 text-[#00d4ff]">Events</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-white">Featured </span><span className="text-[#00d4ff] glow-cyan-text font-mono">Events</span>
              </h2>
            </div>
            {/* Filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {categories.map((c) => (
                <button key={c} className={`filter-btn ${activeFilter === c ? "active" : ""}`} onClick={() => setActiveFilter(c)}>{c}</button>
              ))}
            </div>
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((ev) => (
                <div key={ev.id} className="glass-card rounded-xl p-6 animate-on-scroll">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-mono border bg-[#00ff41]/10 text-[#00ff41] border-[#00ff41]/20">{ev.category}</span>
                    <span className="text-xs text-[#94a3b8] font-mono">{ev.date} | {ev.time}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white font-mono mb-2">{ev.title}</h3>
                  <p className="text-sm text-[#94a3b8] leading-relaxed mb-3">{ev.description}</p>
                  <div className="flex items-center gap-1 text-xs text-[#4a5568] font-mono">
                    {Icons.mapPin} <span>{ev.venue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTF ─── */}
        <section id="ctf" className="relative py-20 sm:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0a0f1a] to-[#0a0a1a]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-on-scroll">
              <span className="section-label border border-[#00ff41]/30 bg-[#00ff41]/10 text-[#00ff41]">Capture The Flag</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                <span className="text-[#00ff41] glow-green-text font-mono">{ctfInfo.title}</span>
              </h2>
              <p className="text-xl text-[#00d4ff] font-mono mb-4">{ctfInfo.tagline}</p>
            </div>

            {/* CTF Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 animate-on-scroll">
              {[
                { label: "Format", value: ctfInfo.format },
                { label: "Team Size", value: ctfInfo.teamSize },
                { label: "Duration", value: ctfInfo.duration },
                { label: "Prize Pool", value: ctfInfo.prizePool },
              ].map((item) => (
                <div key={item.label} className="glass-card rounded-xl p-4 text-center">
                  <div className="text-xs text-[#94a3b8] font-mono uppercase tracking-wider mb-1">{item.label}</div>
                  <div className="text-base font-bold text-[#00ff41] font-mono">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {ctfInfo.categories.map((cat, i) => (
                <div key={cat.name} className={`glass-card rounded-xl p-6 animate-on-scroll delay-${i % 4}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#00ff41]/10 border border-[#00ff41]/20 flex items-center justify-center text-[#00ff41]">
                      {ctfIconMap[cat.icon] || Icons.globe}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white font-mono">{cat.name}</h3>
                      <span className="text-[10px] text-[#94a3b8] font-mono">{cat.difficulty}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#94a3b8]">{cat.description}</p>
                </div>
              ))}
            </div>

            {/* Rules */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-[#00ff41]/10 animate-on-scroll">
              <h3 className="text-lg font-semibold text-white font-mono mb-4 flex items-center gap-2">{Icons.shield} Rules & Guidelines</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ctfInfo.rules.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                    <span className="text-[#00ff41] mt-0.5 flex-shrink-0">{Icons.chevronRight}</span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── SPEAKERS ─── */}
        <section id="speakers" className="relative py-20 sm:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0a0f1a] to-[#0a0a1a]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-on-scroll">
              <span className="section-label border border-amber-500/30 bg-amber-500/10 text-amber-400">Speakers</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-white">Our </span><span className="text-amber-400 font-mono">Speakers</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {speakers.map((s, i) => (
                <div key={s.id} className={`glass-card rounded-xl p-6 text-center animate-on-scroll delay-${i % 4} ${s.isChiefGuest ? "border-amber-500/30" : ""}`}>
                  {s.isChiefGuest && (
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono border bg-amber-500/10 text-amber-400 border-amber-500/20 mb-3 uppercase tracking-wider">Chief Guest</span>
                  )}
                  <div className={`w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center font-bold font-mono text-lg ${s.isChiefGuest ? "bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/20 text-amber-400" : "bg-gradient-to-br from-[#00ff41]/20 to-[#00d4ff]/20 border border-[#00ff41]/20 text-[#00ff41]"}`}>
                    {s.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">{s.name}</h3>
                  <p className="text-xs text-[#00d4ff] font-mono mb-1">{s.designation}</p>
                  <p className="text-xs text-[#94a3b8] font-mono mb-3">{s.organization}</p>
                  <p className="text-sm text-[#94a3b8] mb-3">{s.bio}</p>
                  <div className="inline-block px-3 py-1 rounded-lg bg-[#0a0a1a]/50 border border-[#1e293b] text-xs text-[#00ff41] font-mono">{s.topic}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TEAM ─── */}
        <section id="team" className="relative py-20 sm:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0a0f1a] to-[#0a0a1a]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-on-scroll">
              <span className="section-label border border-purple-500/30 bg-purple-500/10 text-purple-400">The Crew</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-white">Our </span><span className="text-purple-400 font-mono">Organizing Team</span>
              </h2>
              <p className="text-[#94a3b8]">The dedicated team behind Cyber Security Week 2026</p>
            </div>
            {/* Faculty */}
            {(() => {
              const faculty = teamMembers.filter((m) => m.role === "Faculty Coordinator");
              return faculty.length > 0 ? (
                <div className="mb-12">
                  <h3 className="text-lg font-semibold text-white font-mono mb-6 text-center flex items-center justify-center gap-2 text-amber-400">
                    {Icons.graduationCap} Faculty <span className="text-amber-400">Coordinators</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {faculty.map((m) => (
                      <div key={m.id} className="glass-card rounded-xl p-6 group">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-lg font-bold text-amber-400 font-mono">{m.name.split(" ").map((n) => n[0]).join("")}</span>
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-base font-semibold text-white truncate">{m.name}</h4>
                            <p className="text-xs text-amber-400 font-mono">{m.role}</p>
                            <p className="text-xs text-[#94a3b8] font-mono truncate">{m.department}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null;
            })()}
            {/* Students */}
            <div>
              <h3 className="text-lg font-semibold text-white font-mono mb-6 text-center flex items-center justify-center gap-2 text-purple-400">
                {Icons.user} Student <span className="text-purple-400">Team</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {teamMembers.filter((m) => m.role !== "Faculty Coordinator").map((m) => {
                  const roleColors: Record<string, string> = {
                    "Student Coordinator": "bg-[#00ff41]/10 text-[#00ff41] border-[#00ff41]/20",
                    "Co-Coordinator": "bg-[#00d4ff]/10 text-[#00d4ff] border-[#00d4ff]/20",
                    "CTF Lead": "bg-purple-500/10 text-purple-400 border-purple-500/20",
                    "Event Manager": "bg-pink-500/10 text-pink-400 border-pink-500/20",
                    "Technical Lead": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
                    "PR & Marketing Lead": "bg-orange-500/10 text-orange-400 border-orange-500/20",
                    "Design Lead": "bg-rose-500/10 text-rose-400 border-rose-500/20",
                    "Logistics Head": "bg-teal-500/10 text-teal-400 border-teal-500/20",
                    "Workshop Coordinator": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
                    "Social Media Manager": "bg-sky-500/10 text-sky-400 border-sky-500/20",
                  };
                  const rc = roleColors[m.role] || "bg-gray-500/10 text-gray-400 border-gray-500/20";
                  return (
                    <div key={m.id} className="glass-card rounded-xl p-4 text-center group">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-[#00ff41]/20 border border-purple-500/20 flex items-center justify-center mx-auto mb-3">
                        <span className="text-sm font-bold text-purple-400 font-mono">{m.name.split(" ").map((n) => n[0]).join("")}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1">{m.name}</h4>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono border ${rc} mb-1`}>{m.role}</span>
                      <p className="text-[10px] text-[#94a3b8] font-mono">{m.department}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ─── SPONSORS & PARTNERS ─── */}
        <section id="sponsors" className="relative py-20 sm:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0a0f1a] to-[#0a0a1a]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-on-scroll">
              <span className="section-label border border-amber-500/30 bg-amber-500/10 text-amber-400">Sponsors & Partners</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-white">Our </span><span className="text-amber-400 font-mono">Sponsors</span>
              </h2>
            </div>
            {/* Sponsors by tier */}
            {(["platinum", "gold", "silver", "community"] as const).map((tier) => {
              const tc = tierColors[tier];
              const tierSponsors = sponsors.filter((s) => s.tier === tier);
              if (tierSponsors.length === 0) return null;
              return (
                <div key={tier} className="mb-10 animate-on-scroll">
                  <h3 className={`text-sm font-mono uppercase tracking-wider mb-4 text-center ${tc.color}`}>{tc.label} Sponsors</h3>
                  <div className={`grid gap-4 ${tier === "platinum" ? "grid-cols-1 sm:grid-cols-2" : tier === "gold" ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}>
                    {tierSponsors.map((s) => (
                      <div key={s.id} className={`glass-card rounded-xl p-5 text-center ${tc.borderColor}`}>
                        <h4 className="text-sm font-semibold text-white font-mono mb-1">{s.name}</h4>
                        <p className="text-xs text-[#94a3b8]">{s.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {/* Partners */}
            <div className="mt-12 animate-on-scroll">
              <h3 className="text-sm font-mono uppercase tracking-wider mb-4 text-center text-[#00d4ff]">Our Partners</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {partners.map((p) => (
                  <div key={p.id} className="glass-card rounded-xl p-4 text-center border-[#00d4ff]/10">
                    <h4 className="text-xs font-semibold text-white font-mono mb-1">{p.name}</h4>
                    <p className="text-[10px] text-[#00d4ff]">{p.type}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── REGISTRATION ─── */}
        <section id="register" className="relative py-20 sm:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0a0f1a] to-[#0a0a1a]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none" style={{ background: "rgba(0,255,65,0.03)" }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-on-scroll">
              <span className="section-label border border-[#00ff41]/30 bg-[#00ff41]/10 text-[#00ff41]">Join Us</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-white">Register </span><span className="text-[#00ff41] glow-green-text font-mono">Now</span>
              </h2>
              <p className="text-[#94a3b8]">Secure your spot at Cyber Security Week 2026. Limited seats!</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Form */}
              <div className="animate-on-scroll">
                {isSubmitted ? (
                  <div className="glass-card rounded-2xl p-8 text-center border border-[#00ff41]/20">
                    <div className="text-[#00ff41] mx-auto mb-4 flex justify-center" style={{ width: 64, height: 64 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Registration Initiated!</h3>
                    <p className="text-[#94a3b8]">Your email client should have opened with the registration details. If not, please send your details to <span className="text-[#00ff41] font-mono">{eventInfo.email}</span></p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 sm:p-8 border border-[#00ff41]/10">
                    <h3 className="text-lg font-semibold text-white font-mono mb-6">General Registration</h3>
                    <div className="space-y-4">
                      {[
                        { label: "Full Name *", key: "name" as const, type: "text", placeholder: "John Doe" },
                        { label: "Email *", key: "email" as const, type: "email", placeholder: "john@example.com" },
                        { label: "Phone Number *", key: "phone" as const, type: "tel", placeholder: "+91 9876543210" },
                        { label: "College / Organization *", key: "college" as const, type: "text", placeholder: "Mandsaur University" },
                      ].map((field) => (
                        <div key={field.key}>
                          <label className="text-xs text-[#94a3b8] font-mono uppercase tracking-wider mb-1.5 block">{field.label}</label>
                          <input required type={field.type} value={formData[field.key]} onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                            className="cyber-input" placeholder={field.placeholder} />
                        </div>
                      ))}
                      <div>
                        <label className="text-xs text-[#94a3b8] font-mono uppercase tracking-wider mb-1.5 block">Registration Type</label>
                        <select value={formData.event} onChange={(e) => setFormData({ ...formData, event: e.target.value })} className="cyber-select">
                          <option value="general">General (All Events)</option>
                          <option value="ctf">CTF Competition Only</option>
                          <option value="workshop">Workshops Only</option>
                          <option value="talks">Talks & Panels Only</option>
                        </select>
                      </div>
                      <button type="submit" className="w-full neon-button bg-[#00ff41] text-[#0a0a1a] hover:bg-[#00ff41]/90 font-bold font-mono h-12 text-base rounded-lg flex items-center justify-center gap-2 cursor-pointer border-none">
                        {Icons.send} Register Now
                      </button>
                      <p className="text-[10px] text-[#4a5568] text-center font-mono">This will open your email client with pre-filled registration details</p>
                    </div>
                  </form>
                )}
              </div>
              {/* Quick Links */}
              <div className="space-y-6 animate-on-scroll">
                <div className="glass-card rounded-2xl p-6 border border-[#00ff41]/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#00ff41]/10 border border-[#00ff41]/20 flex items-center justify-center text-[#00ff41]">{Icons.flag}</div>
                    <div><h3 className="text-base font-semibold text-white font-mono">CTF Registration</h3><p className="text-xs text-[#94a3b8]">Capture The Flag Competition</p></div>
                  </div>
                  <ul className="space-y-2 mb-4 text-sm text-[#94a3b8]">
                    <li className="flex items-center gap-2"><span className="text-[#00ff41]">{Icons.check}</span> Team of 1–4 members</li>
                    <li className="flex items-center gap-2"><span className="text-[#00ff41]">{Icons.check}</span> July 18, 2026 | 9:30 AM – 5:30 PM</li>
                    <li className="flex items-center gap-2"><span className="text-[#00ff41]">{Icons.check}</span> Prize pool: ₹25,000+</li>
                    <li className="flex items-center gap-2"><span className="text-[#00ff41]">{Icons.check}</span> Jeopardy-style challenges</li>
                  </ul>
                  <a href="#register" className="w-full bg-[#00ff41]/10 border border-[#00ff41]/30 text-[#00ff41] hover:bg-[#00ff41]/20 font-mono rounded-lg h-10 flex items-center justify-center gap-2 text-sm no-underline transition-all">
                    Register for CTF {Icons.externalLink}
                  </a>
                </div>
                <div className="glass-card rounded-2xl p-6 border border-[#00d4ff]/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center text-[#00d4ff]">{Icons.calendar}</div>
                    <div><h3 className="text-base font-semibold text-white font-mono">Workshop Registration</h3><p className="text-xs text-[#94a3b8]">Hands-on Learning Sessions</p></div>
                  </div>
                  <ul className="space-y-2 mb-4 text-sm text-[#94a3b8]">
                    <li className="flex items-center gap-2"><span className="text-[#00d4ff]">{Icons.check}</span> Ethical Hacking (July 15)</li>
                    <li className="flex items-center gap-2"><span className="text-[#00d4ff]">{Icons.check}</span> Web App Security (July 16)</li>
                    <li className="flex items-center gap-2"><span className="text-[#00d4ff]">{Icons.check}</span> Digital Forensics (July 17)</li>
                    <li className="flex items-center gap-2"><span className="text-[#00d4ff]">{Icons.check}</span> BYOL (Bring Your Own Laptop)</li>
                  </ul>
                  <a href="#register" className="w-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/20 font-mono rounded-lg h-10 flex items-center justify-center gap-2 text-sm no-underline transition-all">
                    Register for Workshops {Icons.externalLink}
                  </a>
                </div>
                <div className="glass-card rounded-xl p-4 border border-amber-500/10 bg-amber-500/5">
                  <p className="text-xs text-amber-400 font-mono">⚠️ Registration is mandatory for all events. Seats are limited and allotted on first-come basis. Carry your college ID card.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section id="faq" className="relative py-20 sm:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0a0f1a] to-[#0a0a1a]" />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-on-scroll">
              <span className="section-label border border-[#00d4ff]/30 bg-[#00d4ff]/10 text-[#00d4ff]">FAQ</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-white">Frequently Asked </span><span className="text-[#00d4ff] glow-cyan-text font-mono">Questions</span>
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className={`faq-item glass-card rounded-xl ${openFaq === i ? "open" : ""} animate-on-scroll`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="flex items-center justify-between p-4 sm:p-5">
                    <h3 className="text-sm sm:text-base font-semibold text-white font-mono pr-4">{faq.question}</h3>
                    <span className="faq-chevron text-[#94a3b8] flex-shrink-0">{Icons.chevronDown}</span>
                  </div>
                  <div className="faq-answer">
                    <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm text-[#94a3b8] leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="relative border-t border-[#1e293b]/50 bg-[#070714]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#00ff41]">{Icons.shield}</span>
                <div><span className="text-lg font-bold text-[#00ff41] font-mono">CSW 2026</span><p className="text-[10px] text-[#94a3b8] font-mono">Cyber Security Week</p></div>
              </div>
              <p className="text-sm text-[#94a3b8] leading-relaxed mb-4">A week-long cybersecurity event at Mandsaur University featuring workshops, CTF, expert talks, and more.</p>
              <div className="flex gap-3">
                {[
                  { icon: Icons.instagram, href: "https://instagram.com/csw_mandsaur", label: "Instagram" },
                  { icon: Icons.twitter, href: "https://twitter.com/csw_mandsaur", label: "Twitter" },
                  { icon: Icons.linkedin, href: "https://linkedin.com/company/csw-mandsaur", label: "LinkedIn" },
                  { icon: Icons.github, href: "https://github.com/csw-mandsaur", label: "GitHub" },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="w-9 h-9 rounded-lg bg-[#0f172a] border border-[#1e293b] flex items-center justify-center text-[#94a3b8] hover:text-[#00ff41] hover:border-[#00ff41]/30 hover:bg-[#00ff41]/5 transition-all no-underline">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider mb-4">Quick Links</h3>
              <ul className="space-y-2 list-none p-0 m-0">
                {navLinks.slice(0, 6).map((l) => (
                  <li key={l.href}><a href={l.href} className="text-sm text-[#94a3b8] hover:text-[#00ff41] transition-colors font-mono no-underline">{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider mb-4">More</h3>
              <ul className="space-y-2 list-none p-0 m-0">
                {navLinks.slice(6).map((l) => (
                  <li key={l.href}><a href={l.href} className="text-sm text-[#94a3b8] hover:text-[#00ff41] transition-colors font-mono no-underline">{l.label}</a></li>
                ))}
                <li><a href="https://mandsauruniversity.edu.in" target="_blank" rel="noopener noreferrer" className="text-sm text-[#94a3b8] hover:text-[#00ff41] transition-colors font-mono no-underline inline-flex items-center gap-1">University Website {Icons.externalLink}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider mb-4">Contact Us</h3>
              <ul className="space-y-3 list-none p-0 m-0">
                <li><a href="mailto:csw@mandsauruniversity.edu.in" className="flex items-center gap-2 text-sm text-[#94a3b8] hover:text-[#00ff41] transition-colors no-underline"><span className="text-[#00d4ff] flex-shrink-0">{Icons.mail}</span><span className="font-mono text-xs">csw@mandsauruniversity.edu.in</span></a></li>
                <li><a href="tel:+917422XXXXXX" className="flex items-center gap-2 text-sm text-[#94a3b8] hover:text-[#00ff41] transition-colors no-underline"><span className="text-[#00d4ff] flex-shrink-0">{Icons.phone}</span><span className="font-mono text-xs">+91-7422-XXXXXX</span></a></li>
                <li className="flex items-start gap-2 text-sm text-[#94a3b8]"><span className="text-[#00d4ff] flex-shrink-0 mt-0.5">{Icons.mapPin}</span><span className="text-xs leading-relaxed">Mandsaur University, Mandsaur, Madhya Pradesh, India</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-[#1e293b]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#94a3b8] font-mono text-center sm:text-left">&copy; {new Date().getFullYear()} Cyber Security Week | Mandsaur University. All rights reserved.</p>
            <p className="text-xs text-[#4a5568] font-mono flex items-center gap-1">Made with <span className="text-red-500">{Icons.heart}</span> by CSW Team</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
