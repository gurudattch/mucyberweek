"use client";

import { useEffect, useRef, useState } from "react";
import {
  eventInfo, navLinks, stats, timeline, events, ctfInfo,
  speakers, teamMembers, sponsors, partners, faqs, eventTypes,
} from "@/lib/event-data";

/* ─── Matrix Rain (very subtle, background only) ─── */
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const chars = "01";
    const fontSize = 14;
    const cols = Math.floor(c.width / fontSize);
    const drops: number[] = Array(cols).fill(1);
    const draw = () => {
      ctx.fillStyle = "rgba(18, 18, 18, 0.05)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        ctx.globalAlpha = 0.08;
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > c.height && Math.random() > 0.98) drops[i] = 0;
        drops[i]++;
      }
      ctx.globalAlpha = 1;
    };
    const id = setInterval(draw, 80);
    return () => { clearInterval(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} id="matrix-canvas" />;
}

/* ─── Countdown ─── */
function calcCountdown(targetDate: string) {
  const d = new Date(targetDate).getTime() - Date.now();
  if (d <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return { days: Math.floor(d / 864e5), hours: Math.floor((d % 864e5) / 36e5), minutes: Math.floor((d % 36e5) / 6e4), seconds: Math.floor((d % 6e4) / 1e3) };
}
function useCountdown(targetDate: string) {
  const [time, setTime] = useState(() => calcCountdown(targetDate));
  useEffect(() => {
    const id = setInterval(() => setTime(calcCountdown(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
}

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

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    const body = encodeURIComponent(`Registration for Cyber Security Week 2026\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCollege: ${formData.college}\nEvent Type: ${formData.event}\n\nSubmitted on: ${new Date().toLocaleString()}`);
    window.open(`mailto:${eventInfo.email}?subject=${subject}&body=${body}`, "_blank");
    setIsSubmitted(true);
  };

  const tierConfig: Record<string, { label: string; color: string; border: string }> = {
    platinum: { label: "Platinum", color: "text-gray-600", border: "tier-platinum" },
    gold: { label: "Gold", color: "text-amber-600", border: "tier-gold" },
    silver: { label: "Silver", color: "text-gray-500", border: "tier-silver" },
    community: { label: "Community", color: "text-pink-600", border: "tier-community" },
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--cream)" }}>
      <MatrixRain />

      {/* ═══════════ NAVBAR ═══════════ */}
      <nav className={`navbar ${navScrolled ? "scrolled" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between" style={{ height: 68 }}>
          <a href="#home" className="flex items-center gap-3 no-underline" style={{ color: "var(--dark)" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--dark)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
            <span className="font-display font-bold text-lg tracking-wider">CSW 2026</span>
          </a>
          <div className="nav-links-desktop hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </div>
          <a href="#register" className="btn-primary hidden sm:inline-flex" style={{ padding: "10px 24px", fontSize: "0.85rem" }}>Register Now</a>
          <button className={`hamburger ${mobileOpen ? "open" : ""}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
        <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="nav-link" onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "12px 16px" }}>{l.label}</a>
          ))}
          <a href="#register" className="btn-primary" style={{ marginTop: 8, fontSize: "0.85rem" }}>Register Now</a>
        </div>
      </nav>

      <main className="flex-1 relative z-10">
        {/* ═══════════ HERO ═══════════ */}
        <section id="home" className="section-light relative overflow-hidden" style={{ paddingTop: 68, minHeight: "100vh", display: "flex", alignItems: "center" }}>
          {/* Decorative grid lines */}
          <div className="grid-lines absolute inset-0 pointer-events-none" />
          {/* Decorative blobs */}
          <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10 pointer-events-none" style={{ background: "var(--pink)", filter: "blur(80px)" }} />
          <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full opacity-10 pointer-events-none" style={{ background: "var(--orange)", filter: "blur(60px)" }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text */}
              <div>
                <div style={{ animation: "fadeInUp 0.6s ease both" }}>
                  <span className="section-tag" style={{ background: "var(--cyber-green)", color: "var(--dark)", marginBottom: 16 }}>
                    &gt;_ {eventInfo.university}
                  </span>
                </div>
                <h1 className="font-display font-black leading-none mt-4 mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", animation: "fadeInUp 0.6s ease 0.1s both" }}>
                  <span style={{ color: "var(--dark)" }}>Cyber</span><br />
                  <span className="highlight-box-pink">Security</span><br />
                  <span style={{ color: "var(--dark)" }}>Week</span>{" "}
                  <span className="highlight-box-orange">2026</span>
                </h1>
                <p className="font-body text-xl sm:text-2xl font-bold mb-2" style={{ color: "var(--dark)", animation: "fadeInUp 0.6s ease 0.2s both" }}>
                  {eventInfo.tagline}
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 mb-8 font-body" style={{ animation: "fadeInUp 0.6s ease 0.3s both" }}>
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                    <span className="font-bold">{eventInfo.dates}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--pink)" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span className="font-bold">{eventInfo.venue}</span>
                  </div>
                </div>
                {/* Countdown */}
                <div className="mb-8" style={{ animation: "fadeInUp 0.6s ease 0.4s both" }}>
                  <p className="font-display text-xs uppercase tracking-widest mb-3" style={{ color: "#666" }}>Event Starts In</p>
                  <div className="flex gap-3 sm:gap-4">
                    {[
                      { label: "Days", value: countdown.days },
                      { label: "Hours", value: countdown.hours },
                      { label: "Minutes", value: countdown.minutes },
                      { label: "Seconds", value: countdown.seconds },
                    ].map((u) => (
                      <div key={u.label} className="countdown-box">
                        <div className="count-value">{String(u.value).padStart(2, "0")}</div>
                        <div className="count-label">{u.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-4" style={{ animation: "fadeInUp 0.6s ease 0.5s both" }}>
                  <a href="#register" className="btn-primary">Register Now</a>
                  <a href="#ctf" className="btn-outline">Join CTF</a>
                </div>
              </div>
              {/* Right: Stats + Decorative */}
              <div style={{ animation: "fadeInUp 0.6s ease 0.3s both" }}>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((s, i) => (
                    <div key={s.label} className={`fest-card text-center animate-on-scroll delay-${i % 4}`}>
                      <div className="font-display text-3xl sm:text-4xl font-black" style={{ color: i % 2 === 0 ? "var(--pink)" : "var(--orange)" }}>{s.value}</div>
                      <div className="font-body text-sm font-bold uppercase tracking-wider mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
                {/* Decorative shield */}
                <div className="mt-6 flex justify-center">
                  <div className="relative">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="var(--dark)" strokeWidth="1" opacity="0.15"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--cyber-green)" strokeWidth="2"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 40 }}>
              <path d="M0 60V20C240 0 480 40 720 20C960 0 1200 40 1440 20V60H0Z" fill="var(--dark)"/>
            </svg>
          </div>
        </section>

        {/* ═══════════ ABOUT ═══════════ */}
        <section id="about" className="section-dark relative py-20 sm:py-28">
          <div className="grid-lines-dark grid-lines absolute inset-0 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 animate-on-scroll">
              <span className="section-tag" style={{ background: "var(--cyber-cyan)", color: "var(--dark)", borderColor: "var(--cream)" }}>About the Event</span>
              <h2 className="font-display font-black mt-4 mb-6" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "var(--cream)" }}>
                What is <span className="highlight-box-green">CSW 2026</span>?
              </h2>
              <p className="font-body text-lg max-w-3xl mx-auto" style={{ color: "rgba(243,236,210,0.8)" }}>{eventInfo.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { emoji: "🛡️", title: "Hands-on Workshops", desc: "Practical sessions on ethical hacking, web security, forensics, and more with real-world tools." },
                { emoji: "🎯", title: "CTF Competition", desc: "Jeopardy-style Capture The Flag across Web, Crypto, Reverse Engineering, Forensics, and OSINT." },
                { emoji: "👥", title: "Expert Speakers", desc: "Learn from industry leaders, security researchers, and government officials shaping India's cyber defense." },
                { emoji: "💡", title: "Career Guidance", desc: "Panel discussions and fireside chats on career paths, certifications, and opportunities in cybersecurity." },
                { emoji: "📖", title: "Knowledge Sharing", desc: "Open forums, write-up presentations, and community networking with fellow enthusiasts." },
                { emoji: "⚙️", title: "Latest Technologies", desc: "Explore AI in security, cloud security, zero-trust architecture, and cutting-edge threat intelligence." },
              ].map((f, i) => (
                <div key={f.title} className={`fest-card-dark animate-on-scroll delay-${i % 4}`}>
                  <div className="text-3xl mb-3">{f.emoji}</div>
                  <h3 className="font-display text-base font-bold mb-2" style={{ color: "var(--cream)" }}>{f.title}</h3>
                  <p className="font-body text-sm" style={{ color: "rgba(243,236,210,0.7)" }}>{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-16 fest-card-dark text-center animate-on-scroll" style={{ borderColor: "var(--cyber-cyan)" }}>
              <h3 className="font-display text-xl font-bold mb-2" style={{ color: "var(--cream)" }}>Hosted by <span style={{ color: "var(--cyber-cyan)" }}>Mandsaur University</span></h3>
              <p className="font-body text-sm" style={{ color: "rgba(243,236,210,0.7)" }}>A premier educational institution in Mandsaur, Madhya Pradesh, committed to academic excellence and innovation. The Department of Computer Science & IT proudly presents Cyber Security Week 2026.</p>
            </div>
          </div>
          {/* Top wave */}
          <div className="absolute top-0 left-0 right-0" style={{ transform: "rotate(180deg)" }}>
            <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 40 }}>
              <path d="M0 60V20C240 0 480 40 720 20C960 0 1200 40 1440 20V60H0Z" fill="var(--cream)"/>
            </svg>
          </div>
          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 40 }}>
              <path d="M0 60V20C240 0 480 40 720 20C960 0 1200 40 1440 20V60H0Z" fill="var(--cream)"/>
            </svg>
          </div>
        </section>

        {/* ═══════════ TIMELINE ═══════════ */}
        <section id="schedule" className="section-light relative py-20 sm:py-28">
          <div className="grid-lines absolute inset-0 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 animate-on-scroll">
              <span className="section-tag" style={{ background: "var(--mango)", color: "var(--dark)" }}>Schedule</span>
              <h2 className="font-display font-black mt-4 mb-4" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
                7-Day <span className="highlight-box-pink">Timeline</span>
              </h2>
              <p className="font-body text-lg" style={{ color: "#666" }}>Each day packed with learning, competition, and networking</p>
            </div>
            {/* Day Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-8 justify-center flex-wrap">
              {timeline.map((d) => (
                <button key={d.day} className={`timeline-tab ${activeDay === d.day ? "active" : ""}`} onClick={() => setActiveDay(d.day)}>
                  Day {d.day}
                </button>
              ))}
            </div>
            {/* Active Day */}
            {timeline.filter((d) => d.day === activeDay).map((d) => (
              <div key={d.day} className="fest-card animate-on-scroll" style={{ maxWidth: 900, margin: "0 auto" }}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6" style={{ borderBottom: "2px solid var(--dark)", paddingBottom: 12 }}>
                  <span className="font-display text-sm font-bold" style={{ color: "var(--pink)" }}>Day {d.day} — {d.date}</span>
                  <h3 className="font-display text-xl font-black">{d.title}</h3>
                </div>
                <p className="font-body text-sm mb-6" style={{ color: "#666" }}>{d.description}</p>
                <div className="space-y-2">
                  {d.events.map((ev, i) => {
                    const et = eventTypes[ev.type];
                    return (
                      <div key={i} className="flex items-start gap-4 p-3" style={{ borderBottom: i < d.events.length - 1 ? "1px solid #ddd5b8" : "none" }}>
                        <span className="font-body text-xs font-bold min-w-[80px] pt-1" style={{ color: "#888" }}>{ev.time}</span>
                        <span className="font-body text-sm font-semibold flex-1">{ev.name}</span>
                        {et && <span className="event-badge" style={{ background: et.color.includes("bg-") ? "var(--offwhite)" : "var(--offwhite)" }}>{et.label}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════ EVENTS ═══════════ */}
        <section id="events" className="section-dark relative py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 animate-on-scroll">
              <span className="section-tag" style={{ background: "var(--orange)", color: "#fff", borderColor: "var(--cream)" }}>Events</span>
              <h2 className="font-display font-black mt-4 mb-4" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "var(--cream)" }}>
                Featured <span className="highlight-box-orange">Events</span>
              </h2>
            </div>
            {/* Filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {categories.map((c) => (
                <button key={c} className={`filter-btn ${activeFilter === c ? "active" : ""}`} onClick={() => setActiveFilter(c)} style={activeFilter === c ? { background: "var(--pink)", color: "var(--dark)", border: "2px solid var(--dark)" } : { background: "#1a1a1a", color: "var(--cream)", border: "2px solid #444" }}>
                  {c}
                </button>
              ))}
            </div>
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((ev) => (
                <div key={ev.id} className="fest-card-dark animate-on-scroll">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="event-badge" style={{ background: "var(--orange)", color: "#fff", borderColor: "transparent" }}>{ev.category}</span>
                    <span className="font-body text-xs" style={{ color: "rgba(243,236,210,0.5)" }}>{ev.date} | {ev.time}</span>
                  </div>
                  <h3 className="font-display text-base font-bold mb-2" style={{ color: "var(--cream)" }}>{ev.title}</h3>
                  <p className="font-body text-sm mb-3" style={{ color: "rgba(243,236,210,0.7)" }}>{ev.description}</p>
                  <div className="flex items-center gap-1 font-body text-xs" style={{ color: "var(--pink)" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    {ev.venue}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ CTF ═══════════ */}
        <section id="ctf" className="section-light relative py-20 sm:py-28">
          <div className="grid-lines absolute inset-0 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 animate-on-scroll">
              <span className="section-tag" style={{ background: "var(--cyber-green)", color: "var(--dark)" }}>Capture The Flag</span>
              <h2 className="font-display font-black mt-4 mb-2" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
                <span className="highlight-box-green">{ctfInfo.title}</span>
              </h2>
              <p className="font-display text-xl font-bold" style={{ color: "var(--pink)" }}>{ctfInfo.tagline}</p>
            </div>
            {/* CTF Info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 animate-on-scroll">
              {[
                { label: "Format", value: ctfInfo.format },
                { label: "Team Size", value: ctfInfo.teamSize },
                { label: "Duration", value: ctfInfo.duration },
                { label: "Prize Pool", value: ctfInfo.prizePool },
              ].map((item) => (
                <div key={item.label} className="fest-card text-center">
                  <div className="font-body text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#888" }}>{item.label}</div>
                  <div className="font-display text-sm font-black" style={{ color: "var(--pink)" }}>{item.value}</div>
                </div>
              ))}
            </div>
            {/* Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {ctfInfo.categories.map((cat, i) => (
                <div key={cat.name} className={`fest-card animate-on-scroll delay-${i % 4}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center text-xl" style={{ background: "var(--dark)", color: "var(--cyber-green)", border: "2px solid var(--dark)", borderRadius: 0 }}>
                      {cat.icon === "Globe" ? "🌐" : cat.icon === "Lock" ? "🔐" : cat.icon === "Cog" ? "⚙️" : cat.icon === "Search" ? "🔍" : cat.icon === "Eye" ? "👁️" : "🧩"}
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-bold">{cat.name}</h3>
                      <span className="font-body text-[10px]" style={{ color: "var(--orange)" }}>{cat.difficulty}</span>
                    </div>
                  </div>
                  <p className="font-body text-sm" style={{ color: "#666" }}>{cat.description}</p>
                </div>
              ))}
            </div>
            {/* Rules */}
            <div className="fest-card animate-on-scroll" style={{ borderColor: "var(--cyber-green)" }}>
              <h3 className="font-display text-lg font-bold mb-4">📋 Rules & Guidelines</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ctfInfo.rules.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 font-body text-sm">
                    <span style={{ color: "var(--cyber-green)" }}>▸</span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SPEAKERS ═══════════ */}
        <section id="speakers" className="section-dark relative py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 animate-on-scroll">
              <span className="section-tag" style={{ background: "var(--mango)", color: "var(--dark)", borderColor: "var(--cream)" }}>Speakers</span>
              <h2 className="font-display font-black mt-4 mb-4" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "var(--cream)" }}>
                Our <span className="highlight-box-orange">Speakers</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {speakers.map((s, i) => (
                <div key={s.id} className={`animate-on-scroll delay-${i % 4}`} style={{ background: "var(--offwhite)", border: "2px solid var(--dark)", padding: 0 }}>
                  {/* Photo frame style */}
                  <div className="photo-frame" style={{ padding: 0 }}>
                    <div className="corner-bl" /><div className="corner-br" />
                    <div style={{ background: s.isChiefGuest ? "var(--mango)" : "linear-gradient(135deg, var(--pink), var(--orange))", padding: "24px 16px", textAlign: "center" }}>
                      {s.isChiefGuest && <span className="font-body text-[10px] font-bold uppercase tracking-wider" style={{ background: "var(--dark)", color: "var(--cream)", padding: "2px 10px", display: "inline-block", marginBottom: 8 }}>Chief Guest</span>}
                      <div className="font-display text-2xl font-black" style={{ color: "var(--dark)" }}>{s.name.split(" ").map((n) => n[0]).join("")}</div>
                    </div>
                  </div>
                  <div style={{ padding: 16 }}>
                    <h3 className="font-display text-sm font-bold" style={{ color: "var(--dark)" }}>{s.name}</h3>
                    <p className="font-body text-xs" style={{ color: "var(--pink)" }}>{s.designation}</p>
                    <p className="font-body text-xs" style={{ color: "#888" }}>{s.organization}</p>
                    <p className="font-body text-xs mt-2" style={{ color: "#666" }}>{s.bio}</p>
                    <div className="mt-2 inline-block font-body text-[10px] font-bold" style={{ background: "var(--offwhite)", border: "2px solid var(--dark)", padding: "2px 8px", color: "var(--orange)" }}>{s.topic}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ TEAM ═══════════ */}
        <section id="team" className="section-light relative py-20 sm:py-28">
          <div className="grid-lines absolute inset-0 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 animate-on-scroll">
              <span className="section-tag" style={{ background: "var(--pink)", color: "var(--dark)" }}>The Crew</span>
              <h2 className="font-display font-black mt-4 mb-4" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
                Our <span className="highlight-box-pink">Organizing Team</span>
              </h2>
              <p className="font-body text-lg" style={{ color: "#666" }}>The dedicated team behind Cyber Security Week 2026</p>
            </div>
            {/* Faculty */}
            {(() => {
              const faculty = teamMembers.filter((m) => m.role === "Faculty Coordinator");
              return faculty.length > 0 ? (
                <div className="mb-12">
                  <h3 className="font-display text-lg font-bold mb-6 text-center">🎓 Faculty Coordinators</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {faculty.map((m) => (
                      <div key={m.id} className="fest-card flex items-center gap-4">
                        <div className="w-16 h-16 flex items-center justify-center font-display text-lg font-black flex-shrink-0" style={{ background: "var(--mango)", color: "var(--dark)", border: "2px solid var(--dark)" }}>
                          {m.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-body text-base font-bold truncate">{m.name}</h4>
                          <p className="font-body text-xs" style={{ color: "var(--mango)" }}>{m.role}</p>
                          <p className="font-body text-xs" style={{ color: "#888" }}>{m.department}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null;
            })()}
            {/* Students */}
            <div>
              <h3 className="font-display text-lg font-bold mb-6 text-center">👤 Student Team</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {teamMembers.filter((m) => m.role !== "Faculty Coordinator").map((m) => {
                  const roleColors: Record<string, string> = {
                    "Student Coordinator": "var(--cyber-green)",
                    "Co-Coordinator": "var(--cyber-cyan)",
                    "CTF Lead": "var(--pink)",
                    "Event Manager": "#a855f7",
                    "Technical Lead": "var(--orange)",
                    "PR & Marketing Lead": "#f97316",
                    "Design Lead": "#ec4899",
                    "Logistics Head": "#14b8a6",
                    "Workshop Coordinator": "#6366f1",
                    "Social Media Manager": "#0ea5e9",
                  };
                  const rc = roleColors[m.role] || "#888";
                  return (
                    <div key={m.id} className="fest-card-rounded text-center" style={{ padding: 16 }}>
                      <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center font-display text-sm font-black" style={{ background: rc, color: "var(--dark)", borderRadius: 0 }}>
                        {m.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <h4 className="font-body text-xs font-bold">{m.name}</h4>
                      <span className="inline-block font-body text-[9px] font-bold mt-1 px-2 py-0.5" style={{ background: rc, color: "var(--dark)" }}>{m.role}</span>
                      <p className="font-body text-[9px] mt-1" style={{ color: "#888" }}>{m.department}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SPONSORS & PARTNERS ═══════════ */}
        <section id="sponsors" className="section-dark relative py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 animate-on-scroll">
              <span className="section-tag" style={{ background: "var(--mango)", color: "var(--dark)", borderColor: "var(--cream)" }}>Sponsors & Partners</span>
              <h2 className="font-display font-black mt-4 mb-4" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "var(--cream)" }}>
                Our <span className="highlight-box-orange">Sponsors</span>
              </h2>
            </div>
            {(["platinum", "gold", "silver", "community"] as const).map((tier) => {
              const tc = tierConfig[tier];
              const tierSponsors = sponsors.filter((s) => s.tier === tier);
              if (tierSponsors.length === 0) return null;
              return (
                <div key={tier} className="mb-10 animate-on-scroll">
                  <h3 className="font-body text-sm font-bold uppercase tracking-wider mb-4 text-center" style={{ color: tc.color }}>{tc.label} Sponsors</h3>
                  <div className={`grid gap-4 ${tier === "platinum" ? "grid-cols-1 sm:grid-cols-2" : tier === "gold" ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}>
                    {tierSponsors.map((s) => (
                      <div key={s.id} className={`fest-card ${tc.border} text-center`} style={{ background: "#1a1a1a", color: "var(--cream)" }}>
                        <h4 className="font-display text-sm font-bold mb-1">{s.name}</h4>
                        <p className="font-body text-xs" style={{ color: "rgba(243,236,210,0.6)" }}>{s.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {/* Partners */}
            <div className="mt-12 animate-on-scroll">
              <h3 className="font-body text-sm font-bold uppercase tracking-wider mb-4 text-center" style={{ color: "var(--cyber-cyan)" }}>Our Partners</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {partners.map((p) => (
                  <div key={p.id} className="fest-card-rounded text-center" style={{ background: "#1a1a1a", color: "var(--cream)", padding: 16 }}>
                    <h4 className="font-body text-xs font-bold mb-1">{p.name}</h4>
                    <p className="font-body text-[10px]" style={{ color: "var(--cyber-cyan)" }}>{p.type}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ REGISTRATION ═══════════ */}
        <section id="register" className="section-light relative py-20 sm:py-28">
          <div className="grid-lines absolute inset-0 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 animate-on-scroll">
              <span className="section-tag" style={{ background: "var(--pink)", color: "var(--dark)" }}>Join Us</span>
              <h2 className="font-display font-black mt-4 mb-4" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
                Register <span className="highlight-box-pink">Now</span>
              </h2>
              <p className="font-body text-lg" style={{ color: "#666" }}>Secure your spot at Cyber Security Week 2026. Limited seats!</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Form */}
              <div className="animate-on-scroll">
                {isSubmitted ? (
                  <div className="fest-card text-center" style={{ borderColor: "var(--cyber-green)" }}>
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="font-display text-2xl font-bold mb-2">Registration Initiated!</h3>
                    <p className="font-body text-sm" style={{ color: "#666" }}>Your email client should have opened with the registration details. If not, please send your details to <strong style={{ color: "var(--pink)" }}>{eventInfo.email}</strong></p>
                  </div>
                ) : (
                  <div className="fest-card">
                    <h3 className="font-display text-lg font-bold mb-6">General Registration</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {[
                        { label: "Full Name *", key: "name" as const, type: "text", placeholder: "John Doe" },
                        { label: "Email *", key: "email" as const, type: "email", placeholder: "john@example.com" },
                        { label: "Phone Number *", key: "phone" as const, type: "tel", placeholder: "+91 9876543210" },
                        { label: "College / Organization *", key: "college" as const, type: "text", placeholder: "Mandsaur University" },
                      ].map((field) => (
                        <div key={field.key}>
                          <label className="font-body text-xs font-bold uppercase tracking-wider mb-1.5 block" style={{ color: "#888" }}>{field.label}</label>
                          <input required type={field.type} value={formData[field.key]} onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })} className="fest-input" placeholder={field.placeholder} />
                        </div>
                      ))}
                      <div>
                        <label className="font-body text-xs font-bold uppercase tracking-wider mb-1.5 block" style={{ color: "#888" }}>Registration Type</label>
                        <select value={formData.event} onChange={(e) => setFormData({ ...formData, event: e.target.value })} className="fest-select">
                          <option value="general">General (All Events)</option>
                          <option value="ctf">CTF Competition Only</option>
                          <option value="workshop">Workshops Only</option>
                          <option value="talks">Talks & Panels Only</option>
                        </select>
                      </div>
                      <button type="submit" className="btn-primary w-full" style={{ marginTop: 8 }}>📤 Register Now</button>
                      <p className="font-body text-[10px] text-center" style={{ color: "#999" }}>This will open your email client with pre-filled registration details</p>
                    </form>
                  </div>
                )}
              </div>
              {/* Quick Links */}
              <div className="space-y-6 animate-on-scroll">
                <div className="fest-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center text-xl" style={{ background: "var(--cyber-green)", border: "2px solid var(--dark)" }}>🚩</div>
                    <div>
                      <h3 className="font-display text-sm font-bold">CTF Registration</h3>
                      <p className="font-body text-xs" style={{ color: "#888" }}>Capture The Flag Competition</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4 font-body text-sm" style={{ color: "#666" }}>
                    <li className="flex items-center gap-2"><span style={{ color: "var(--cyber-green)" }}>✓</span> Team of 1–4 members</li>
                    <li className="flex items-center gap-2"><span style={{ color: "var(--cyber-green)" }}>✓</span> July 18, 2026 | 9:30 AM – 5:30 PM</li>
                    <li className="flex items-center gap-2"><span style={{ color: "var(--cyber-green)" }}>✓</span> Prize pool: ₹25,000+</li>
                    <li className="flex items-center gap-2"><span style={{ color: "var(--cyber-green)" }}>✓</span> Jeopardy-style challenges</li>
                  </ul>
                  <a href="#register" className="btn-outline w-full text-center" style={{ fontSize: "0.85rem", padding: "10px 20px" }}>Register for CTF ↗</a>
                </div>
                <div className="fest-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center text-xl" style={{ background: "var(--cyber-cyan)", border: "2px solid var(--dark)" }}>📅</div>
                    <div>
                      <h3 className="font-display text-sm font-bold">Workshop Registration</h3>
                      <p className="font-body text-xs" style={{ color: "#888" }}>Hands-on Learning Sessions</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4 font-body text-sm" style={{ color: "#666" }}>
                    <li className="flex items-center gap-2"><span style={{ color: "var(--cyber-cyan)" }}>✓</span> Ethical Hacking (July 15)</li>
                    <li className="flex items-center gap-2"><span style={{ color: "var(--cyber-cyan)" }}>✓</span> Web App Security (July 16)</li>
                    <li className="flex items-center gap-2"><span style={{ color: "var(--cyber-cyan)" }}>✓</span> Digital Forensics (July 17)</li>
                    <li className="flex items-center gap-2"><span style={{ color: "var(--cyber-cyan)" }}>✓</span> BYOL (Bring Your Own Laptop)</li>
                  </ul>
                  <a href="#register" className="btn-outline w-full text-center" style={{ fontSize: "0.85rem", padding: "10px 20px" }}>Register for Workshops ↗</a>
                </div>
                <div className="fest-card" style={{ borderColor: "var(--mango)", background: "rgba(243,162,15,0.08)" }}>
                  <p className="font-body text-xs" style={{ color: "var(--mango)" }}>⚠️ Registration is mandatory for all events. Seats are limited and allotted on first-come basis. Carry your college ID card.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ FAQ ═══════════ */}
        <section id="faq" className="section-dark relative py-20 sm:py-28">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 animate-on-scroll">
              <span className="section-tag" style={{ background: "var(--orange)", color: "#fff", borderColor: "var(--cream)" }}>FAQ</span>
              <h2 className="font-display font-black mt-4 mb-4" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "var(--cream)" }}>
                Frequently Asked <span className="highlight-box-orange">Questions</span>
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className={`faq-item animate-on-scroll ${openFaq === i ? "open" : ""}`} onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ background: "#1a1a1a", border: "2px solid #333", cursor: "pointer" }}>
                  <div className="flex items-center justify-between p-4 sm:p-5">
                    <h3 className="font-body text-sm sm:text-base font-bold" style={{ color: "var(--cream)" }}>{faq.question}</h3>
                    <span className="faq-chevron flex-shrink-0 ml-4" style={{ color: "var(--pink)" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                    </span>
                  </div>
                  <div className="faq-answer">
                    <p className="px-4 sm:px-5 pb-4 sm:pb-5 font-body text-sm" style={{ color: "rgba(243,236,210,0.7)" }}>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ PREFOOTER CTA ═══════════ */}
        <section className="section-light relative py-20 sm:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="prefooter-card animate-on-scroll">
              <h2 className="font-display font-black mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--dark)" }}>
                Ready to <span className="highlight-box-orange">Hack</span>?
              </h2>
              <p className="font-body text-lg mb-8" style={{ color: "var(--dark)" }}>
                Join us for 7 days of cybersecurity learning, competitions, and networking at Mandsaur University.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="#register" className="btn-primary" style={{ background: "var(--dark)", color: "var(--cream)", boxShadow: "4px 4px 0 var(--mango)" }}>Register Now</a>
                <a href="#ctf" className="btn-outline" style={{ background: "transparent", color: "var(--dark)", borderColor: "var(--dark)" }}>Join CTF</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="relative" style={{ background: "var(--dark)", color: "var(--cream)", borderTop: "3px solid var(--pink)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--pink)" strokeWidth="2.5"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
                <div>
                  <span className="font-display font-bold text-lg" style={{ color: "var(--pink)" }}>CSW 2026</span>
                  <p className="font-body text-[10px]" style={{ color: "rgba(243,236,210,0.5)" }}>Cyber Security Week</p>
                </div>
              </div>
              <p className="font-body text-sm mb-4" style={{ color: "rgba(243,236,210,0.6)" }}>A week-long cybersecurity event at Mandsaur University featuring workshops, CTF, expert talks, and more.</p>
              <div className="flex gap-3">
                {[
                  { label: "Instagram", href: "https://instagram.com/csw_mandsaur", icon: "📸" },
                  { label: "Twitter", href: "https://twitter.com/csw_mandsaur", icon: "🐦" },
                  { label: "LinkedIn", href: "https://linkedin.com/company/csw-mandsaur", icon: "💼" },
                  { label: "GitHub", href: "https://github.com/csw-mandsaur", icon: "💻" },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="w-9 h-9 flex items-center justify-center no-underline transition-all" style={{ background: "#1a1a1a", border: "2px solid #333", color: "var(--cream)", fontSize: "1rem" }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-body text-sm font-bold uppercase tracking-wider mb-4">Quick Links</h3>
              <ul className="space-y-2 list-none p-0 m-0">
                {navLinks.slice(0, 6).map((l) => (
                  <li key={l.href}><a href={l.href} className="font-body text-sm no-underline transition-colors" style={{ color: "rgba(243,236,210,0.6)" }}>{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-body text-sm font-bold uppercase tracking-wider mb-4">More</h3>
              <ul className="space-y-2 list-none p-0 m-0">
                {navLinks.slice(6).map((l) => (
                  <li key={l.href}><a href={l.href} className="font-body text-sm no-underline transition-colors" style={{ color: "rgba(243,236,210,0.6)" }}>{l.label}</a></li>
                ))}
                <li><a href="https://mandsauruniversity.edu.in" target="_blank" rel="noopener noreferrer" className="font-body text-sm no-underline" style={{ color: "var(--cyber-cyan)" }}>University Website ↗</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-body text-sm font-bold uppercase tracking-wider mb-4">Contact Us</h3>
              <ul className="space-y-3 list-none p-0 m-0">
                <li><a href="mailto:csw@mandsauruniversity.edu.in" className="flex items-center gap-2 font-body text-sm no-underline" style={{ color: "rgba(243,236,210,0.6)" }}>✉️ <span className="font-body text-xs">{eventInfo.email}</span></a></li>
                <li><a href="tel:+917422XXXXXX" className="flex items-center gap-2 font-body text-sm no-underline" style={{ color: "rgba(243,236,210,0.6)" }}>📞 <span className="font-body text-xs">+91-7422-XXXXXX</span></a></li>
                <li className="flex items-start gap-2 font-body text-sm" style={{ color: "rgba(243,236,210,0.6)" }}>📍 <span className="text-xs">Mandsaur University, Mandsaur, Madhya Pradesh, India</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "2px solid #333" }}>
            <p className="font-body text-xs" style={{ color: "rgba(243,236,210,0.4)" }}>© {new Date().getFullYear()} Cyber Security Week | Mandsaur University. All rights reserved.</p>
            <p className="font-body text-xs flex items-center gap-1" style={{ color: "rgba(243,236,210,0.3)" }}>Made with <span style={{ color: "var(--pink)" }}>❤️</span> by CSW Team</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
