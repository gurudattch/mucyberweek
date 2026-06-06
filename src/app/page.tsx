"use client";

import { useEffect, useState } from "react";
import {
  eventInfo, navLinks, stats, timeline, events, ctfInfo,
  speakers, teamMembers, sponsors, partners, faqs, eventTypes,
} from "@/lib/event-data";

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

  const tierConfig: Record<string, { label: string; color: string; border: string; bg: string }> = {
    platinum: { label: "Platinum", color: "text-gray-400", border: "tier-platinum", bg: "rgba(153,153,153,0.1)" },
    gold: { label: "Gold", color: "text-amber-400", border: "tier-gold", bg: "rgba(243,162,15,0.1)" },
    silver: { label: "Silver", color: "text-gray-500", border: "tier-silver", bg: "rgba(136,136,136,0.1)" },
    community: { label: "Community", color: "text-pink-400", border: "tier-community", bg: "rgba(255,78,124,0.1)" },
  };

  const eventColors: Record<string, string> = {
    Ceremony: "#ff4e7c",
    Workshop: "#ff6b35",
    Competition: "#7c3aed",
    Talk: "#00d4ff",
    Panel: "#ffd166",
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--cream)" }}>
      {/* ═══════════ NAVBAR ═══════════ */}
   <nav className={`navbar ${navScrolled ? "scrolled" : ""}`}>
  <div
    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
    style={{ height: 68 }}
  >
    {/* Logo */}
    <a
      href="#home"
      className="flex items-center gap-3 no-underline"
      style={{ color: "var(--dark)" }}
    >
      <div
        className="w-12 h-12 flex items-center justify-center"
      >
        <img
          src="https://meu.edu.in/wp-content/uploads/2026/02/cropped-MU-logo-final-white.png"
          alt="MU Logo"
          className="w-full h-full object-contain"
        />
      </div>

      <span className="font-display font-bold text-lg tracking-wider">
        CSW 2026
      </span>
    </a>

    {/* Desktop Navigation */}
    <div className="hidden md:flex items-center gap-1">
      {navLinks.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="nav-link"
        >
          {l.label}
        </a>
      ))}
    </div>

    {/* Right Section */}
    <div className="flex items-center gap-3">
      {/* Desktop Register Button */}
      <a
        href="#register"
        className="btn-primary hidden md:inline-flex"
        style={{
          padding: "10px 24px",
          fontSize: "0.85rem",
        }}
      >
        Register Now
      </a>

      {/* Mobile Menu Button */}
      <button
        type="button"
        className={`hamburger md:hidden ${
          mobileOpen ? "open" : ""
        }`}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
    {navLinks.map((l) => (
      <a
        key={l.href}
        href={l.href}
        className="nav-link"
        onClick={() => setMobileOpen(false)}
        style={{
          display: "block",
          padding: "12px 16px",
        }}
      >
        {l.label}
      </a>
    ))}

    <a
      href="#register"
      className="btn-primary"
      onClick={() => setMobileOpen(false)}
      style={{
        marginTop: 8,
        fontSize: "0.85rem",
      }}
    >
      Register Now
    </a>
  </div>
</nav>
      <main className="flex-1 relative z-10">
        {/* ═══════════ HERO ═══════════ */}
        <section id="home" className="relative overflow-hidden" style={{ background: "var(--dark)", paddingTop: 68, minHeight: "100vh", display: "flex", alignItems: "center" }}>
          {/* Decorative blobs */}
          <div className="hero-circle" style={{ top: "-100px", right: "-100px" }} />
          <div className="hero-circle" style={{ bottom: "-80px", left: "-80px", background: "linear-gradient(135deg, var(--cyber-green), var(--cyber-cyan))" }} />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text */}
              <div>
                <div style={{ animation: "fadeInUp 0.6s ease both" }}>
                  <span className="section-tag" style={{ background: "rgba(255,78,124,0.15)", color: "var(--pink)", border: "1px solid rgba(255,78,124,0.2)" }}>
                    {eventInfo.university}
                  </span>
                </div>
                <h1 className="font-display font-black leading-none mt-6 mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", animation: "fadeInUp 0.6s ease 0.1s both" }}>
                  <span style={{ color: "#fff" }}>Cyber</span><br />
                  <span className="gradient-text">Security</span><br />
                  <span style={{ color: "#fff" }}>Week</span>{" "}
                  <span className="gradient-text-yellow">2026</span>
                </h1>
                <p className="font-body text-xl sm:text-2xl font-bold mb-2" style={{ color: "rgba(255,255,255,0.9)", animation: "fadeInUp 0.6s ease 0.2s both" }}>
                  {eventInfo.tagline}
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 mb-8 font-body" style={{ animation: "fadeInUp 0.6s ease 0.3s both" }}>
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                    <span className="font-bold" style={{ color: "rgba(255,255,255,0.8)" }}>{eventInfo.dates}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--pink)" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span className="font-bold" style={{ color: "rgba(255,255,255,0.8)" }}>{eventInfo.venue}</span>
                  </div>
                </div>
                {/* Countdown */}
                <div className="mb-8" style={{ animation: "fadeInUp 0.6s ease 0.4s both" }}>
                  <p className="font-display text-xs uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>Event Starts In</p>
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
                  <a href="#ctf" className="btn-green">Join CTF</a>
                </div>
              </div>

              {/* Right: Stats + Visual */}
              <div style={{ animation: "fadeInUp 0.6s ease 0.3s both" }}>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((s, i) => (
                    <div key={s.label} className={`fest-card-dark text-center animate-on-scroll delay-${i % 4}`}>
                      <div className="font-display text-3xl sm:text-4xl font-black gradient-text">{s.value}</div>
                      <div className="font-body text-sm font-bold uppercase tracking-wider mt-2" style={{ color: "rgba(255,255,255,0.6)" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                {/* Decorative shield */}
                <div className="mt-8 flex justify-center animate-float">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(255,78,124,0.2), rgba(255,107,53,0.2))", border: "2px solid rgba(255,78,124,0.2)" }}>
                   <img src="https://meu.edu.in/wp-content/uploads/2026/02/cropped-MU-logo-final-white.png" alt="MU Logo" className="w-24 h-24 object-contain"/> </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 60 }}>
              <path d="M0 80V40C240 0 480 80 720 40C960 0 1200 80 1440 40V80H0Z" fill="var(--cream)"/>
            </svg>
          </div>
        </section>

        {/* ═══════════ ABOUT ═══════════ */}
        <section id="about" className="section-light relative py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 animate-on-scroll">
              <span className="section-tag" style={{ background: "rgba(0,212,255,0.15)", color: "var(--cyber-cyan)" }}>About the Event</span>
              <h2 className="font-display font-black mt-4 mb-6" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "var(--dark)" }}>
                What is <span className="gradient-text-green">CSW 2026</span>?
              </h2>
              <p className="font-body text-lg max-w-3xl mx-auto" style={{ color: "#666" }}>{eventInfo.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                // { emoji: "🛡️", title: "Hands-on Workshops", desc: "Practical sessions on ethical hacking, web security, forensics, and more with real-world tools." },
                // { emoji: "🎯", title: "CTF Competition", desc: "Jeopardy-style Capture The Flag across Web, Crypto, Reverse Engineering, Forensics, and OSINT." },
                // { emoji: "👥", title: "Expert Speakers", desc: "Learn from industry leaders, security researchers, and government officials shaping India's cyber defense." },
                // { emoji: "💡", title: "Career Guidance", desc: "Panel discussions and fireside chats on career paths, certifications, and opportunities in cybersecurity." },
                // { emoji: "📖", title: "Knowledge Sharing", desc: "Open forums, write-up presentations, and community networking with fellow enthusiasts." },
                // { emoji: "⚙️", title: "Latest Technologies", desc: "Explore AI in security, cloud security, zero-trust architecture, and cutting-edge threat intelligence." },
              ].map((f, i) => (
                <div key={f.title} className={`fest-card animate-on-scroll delay-${i % 4}`}>
                  <div className="text-3xl mb-4">{f.emoji}</div>
                  <h3 className="font-display text-base font-bold mb-2" style={{ color: "var(--dark)" }}>{f.title}</h3>
                  <p className="font-body text-sm" style={{ color: "#666" }}>{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-16 fest-card text-center animate-on-scroll" style={{ borderLeft: "4px solid var(--cyber-cyan)" }}>
              <h3 className="font-display text-xl font-bold mb-2" style={{ color: "var(--dark)" }}>Hosted by <span className="gradient-text">Mandsaur University</span></h3>
              <p className="font-body text-sm" style={{ color: "#666" }}>A premier educational institution in Mandsaur, Madhya Pradesh, committed to academic excellence and innovation. The Department of Computer Science & IT proudly presents Cyber Security Week 2026.</p>
            </div>
          </div>
        </section>

        {/* ═══════════ EVENTS ═══════════ */}
        <section id="events" className="section-light relative py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 animate-on-scroll">
              <span className="section-tag" style={{ background: "rgba(255,107,53,0.15)", color: "var(--orange)" }}>Events</span>
              <h2 className="font-display font-black mt-4 mb-4" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "var(--dark)" }}>
                Featured <span className="gradient-text">Events</span>
              </h2>
            </div>
            {/* Filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-8 bg-pink-500 p-4 rounded-xl">
              {categories.map((c) => (
                <button key={c} className={`filter-btn ${activeFilter === c ? "active" : ""}`} onClick={() => setActiveFilter(c)} style={!activeFilter !== c ? undefined : undefined}>
                  {c}
                </button>
              ))}
            </div>
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((ev) => (
                <div key={ev.id} className="fest-card animate-on-scroll" style={{ borderTop: `4px solid ${eventColors[ev.category] || "var(--pink)"}` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="event-badge" style={{ background: `${eventColors[ev.category] || "var(--orange)"}20`, color: eventColors[ev.category] || "var(--orange)" }}>{ev.category}</span>
                    <span className="font-body text-xs" style={{ color: "#999" }}>{ev.date} | {ev.time}</span>
                  </div>
                  <h3 className="font-display text-base font-bold mb-2" style={{ color: "var(--dark)" }}>{ev.title}</h3>
                  <p className="font-body text-sm mb-3" style={{ color: "#666" }}>{ev.description}</p>
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
        <section id="ctf" className="section-dark relative py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 animate-on-scroll">
              <span className="section-tag" style={{ background: "rgba(0,255,65,0.15)", color: "var(--cyber-green)" }}>Capture The Flag</span>
              <h2 className="font-display font-black mt-4 mb-2" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#fff" }}>
                <span className="gradient-text-green">{ctfInfo.title}</span>
              </h2>
              <p className="font-display text-xl font-bold gradient-text">{ctfInfo.tagline}</p>
            </div>
            {/* CTF Info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 animate-on-scroll">
              {[
                { label: "Format", value: ctfInfo.format },
                { label: "Team Size", value: ctfInfo.teamSize },
                { label: "Duration", value: ctfInfo.duration },
                { label: "Prize Pool", value: ctfInfo.prizePool },
              ].map((item) => (
                <div key={item.label} className="fest-card-dark text-center">
                  <div className="font-body text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>{item.label}</div>
                  <div className="font-display text-sm font-black gradient-text-green">{item.value}</div>
                </div>
              ))}
            </div>
            {/* Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {ctfInfo.categories.map((cat, i) => (
                <div key={cat.name} className={`fest-card-dark animate-on-scroll delay-${i % 4}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(0,255,65,0.15)" }}>
                      {cat.icon === "Globe" ? "🌐" : cat.icon === "Lock" ? "🔐" : cat.icon === "Cog" ? "⚙️" : cat.icon === "Search" ? "🔍" : cat.icon === "Eye" ? "👁️" : "🧩"}
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-bold" style={{ color: "#fff" }}>{cat.name}</h3>
                      <span className="font-body text-[10px]" style={{ color: "var(--yellow)" }}>{cat.difficulty}</span>
                    </div>
                  </div>
                  <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{cat.description}</p>
                </div>
              ))}
            </div>
            {/* Rules */}
            <div className="fest-card-dark animate-on-scroll" style={{ borderLeft: "4px solid var(--cyber-green)" }}>
              <h3 className="font-display text-lg font-bold mb-4" style={{ color: "#fff" }}>📋 Rules & Guidelines</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ctfInfo.rules.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 font-body text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                    <span style={{ color: "var(--cyber-green)" }}>▸</span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SPEAKERS ═══════════ */}
        <section id="speakers" className="section-light relative py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 animate-on-scroll">
              <span className="section-tag" style={{ background: "rgba(255,209,102,0.15)", color: "var(--mango)" }}>Speakers</span>
              <h2 className="font-display font-black mt-4 mb-4" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "var(--dark)" }}>
                Our <span className="gradient-text">Speakers</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {speakers.map((s, i) => (
                <div key={s.id} className={`fest-card animate-on-scroll delay-${i % 4}`} style={{ padding: 0, overflow: "hidden" }}>
                  {/* Gradient header */}
                  <div style={{ background: s.isChiefGuest ? "linear-gradient(135deg, var(--mango), var(--yellow))" : "linear-gradient(135deg, var(--pink), var(--orange))", padding: "28px 20px", textAlign: "center" }}>
                    {s.isChiefGuest && <span className="font-body text-[10px] font-bold uppercase tracking-wider" style={{ background: "var(--dark)", color: "#fff", padding: "4px 12px", borderRadius: 12, display: "inline-block", marginBottom: 8 }}>Chief Guest</span>}
                    <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center font-display text-xl font-black" style={{ background: "rgba(255,255,255,0.2)", color: "#fff", backdropFilter: "blur(4px)" }}>
                      {s.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                  </div>
                  <div style={{ padding: 20 }}>
                    <h3 className="font-display text-sm font-bold" style={{ color: "var(--dark)" }}>{s.name}</h3>
                    <p className="font-body text-xs font-bold" style={{ color: "var(--pink)" }}>{s.designation}</p>
                    <p className="font-body text-xs" style={{ color: "#888" }}>{s.organization}</p>
                    <p className="font-body text-xs mt-2" style={{ color: "#666" }}>{s.bio}</p>
                    <div className="mt-3 inline-block font-body text-[10px] font-bold px-3 py-1.5 rounded-full" style={{ background: "rgba(255,107,53,0.1)", color: "var(--orange)" }}>{s.topic}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ TEAM ═══════════ */}
        <section id="team" className="section-dark relative py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 animate-on-scroll">
              <span className="section-tag" style={{ background: "rgba(255,78,124,0.15)", color: "var(--pink)" }}>The Crew</span>
              <h2 className="font-display font-black mt-4 mb-4" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#fff" }}>
                Our <span className="gradient-text">Organizing Team</span>
              </h2>
              <p className="font-body text-lg" style={{ color: "rgba(255,255,255,0.5)" }}>The dedicated team behind Cyber Security Week 2026</p>
            </div>
            {/* Faculty */}
            {(() => {
              const faculty = teamMembers.filter((m) => m.role === "Faculty Coordinator");
              return faculty.length > 0 ? (
                <div className="mb-12">
                  <h3 className="font-display text-lg font-bold mb-6 text-center" style={{ color: "var(--yellow)" }}>🎓 Faculty Coordinators</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {faculty.map((m) => (
                      <div key={m.id} className="fest-card-dark flex items-center gap-4">
                        <div className="avatar-circle" style={{ background: "linear-gradient(135deg, var(--mango), var(--yellow))", color: "var(--dark)", fontSize: "0.85rem" }}>
                          {m.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-body text-base font-bold truncate" style={{ color: "#fff" }}>{m.name}</h4>
                          <p className="font-body text-xs" style={{ color: "var(--yellow)" }}>{m.role}</p>
                          <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{m.department}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null;
            })()}
            {/* Students */}
            <div>
              <h3 className="font-display text-lg font-bold mb-6 text-center" style={{ color: "var(--cyber-cyan)" }}>👤 Student Team</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {teamMembers.filter((m) => m.role !== "Faculty Coordinator").map((m) => {
                  const roleGradients: Record<string, string> = {
                    "Student Coordinator": "linear-gradient(135deg, #00ff41, #00d4ff)",
                    "Co-Coordinator": "linear-gradient(135deg, #00d4ff, #7c3aed)",
                    "CTF Lead": "linear-gradient(135deg, #ff4e7c, #ff6b35)",
                    "Event Manager": "linear-gradient(135deg, #a855f7, #ff4e7c)",
                    "Technical Lead": "linear-gradient(135deg, #ff6b35, #ffd166)",
                    "PR & Marketing Lead": "linear-gradient(135deg, #f97316, #ff4e7c)",
                    "Design Lead": "linear-gradient(135deg, #ec4899, #a855f7)",
                    "Logistics Head": "linear-gradient(135deg, #14b8a6, #00d4ff)",
                    "Workshop Coordinator": "linear-gradient(135deg, #6366f1, #00d4ff)",
                    "Social Media Manager": "linear-gradient(135deg, #0ea5e9, #6366f1)",
                  };
                  const rc = roleGradients[m.role] || "linear-gradient(135deg, #888, #666)";
                  return (
                    <div key={m.id} className="fest-card-dark text-center" style={{ padding: 16 }}>
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center font-display text-sm font-black" style={{ background: rc, color: "#fff" }}>
                        {m.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <h4 className="font-body text-xs font-bold" style={{ color: "#fff" }}>{m.name}</h4>
                      <span className="inline-block font-body text-[9px] font-bold mt-1 px-2 py-0.5 rounded-full" style={{ background: rc, color: "#fff" }}>{m.role}</span>
                      <p className="font-body text-[9px] mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{m.department}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SPONSORS & PARTNERS ═══════════ */}
        <section id="sponsors" className="section-light relative py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 animate-on-scroll">
              <span className="section-tag" style={{ background: "rgba(255,209,102,0.15)", color: "var(--mango)" }}>Sponsors & Partners</span>
              <h2 className="font-display font-black mt-4 mb-4" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "var(--dark)" }}>
                Our <span className="gradient-text-yellow">Sponsors</span>
              </h2>
            </div>
            {(["platinum", "gold", "silver", "community"] as const).map((tier) => {
              const tc = tierConfig[tier];
              const tierSponsors = sponsors.filter((s) => s.tier === tier);
              if (tierSponsors.length === 0) return null;
              return (
                <div key={tier} className="mb-10 animate-on-scroll">
                  <h3 className="font-body text-sm font-bold uppercase tracking-wider mb-4 text-center" style={{ color: "#888" }}>{tc.label} Sponsors</h3>
                  <div className={`grid gap-4 ${tier === "platinum" ? "grid-cols-1 sm:grid-cols-2" : tier === "gold" ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}>
                    {tierSponsors.map((s) => (
                      <div key={s.id} className={`fest-card ${tc.border} text-center`}>
                        <h4 className="font-display text-sm font-bold mb-1">{s.name}</h4>
                        <p className="font-body text-xs" style={{ color: "#888" }}>{s.description}</p>
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
                  <div key={p.id} className="fest-card-rounded text-center" style={{ padding: 16 }}>
                    <h4 className="font-body text-xs font-bold mb-1">{p.name}</h4>
                    <p className="font-body text-[10px] gradient-text-green">{p.type}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ REGISTRATION ═══════════ */}
        <section id="register" className="section-dark relative py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 animate-on-scroll">
              <span className="section-tag" style={{ background: "rgba(255,78,124,0.15)", color: "var(--pink)" }}>Join Us</span>
              <h2 className="font-display font-black mt-4 mb-4" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#fff" }}>
                Register <span className="gradient-text">Now</span>
              </h2>
              <p className="font-body text-lg" style={{ color: "rgba(255,255,255,0.5)" }}>Secure your spot at Cyber Security Week 2026. Limited seats!</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Form */}
              <div className="animate-on-scroll">
                {isSubmitted ? (
                  <div className="fest-card-dark text-center" style={{ borderLeft: "4px solid var(--cyber-green)" }}>
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="font-display text-2xl font-bold mb-2" style={{ color: "#fff" }}>Registration Initiated!</h3>
                    <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>Your email client should have opened with the registration details. If not, please send your details to <strong style={{ color: "var(--pink)" }}>{eventInfo.email}</strong></p>
                  </div>
                ) : (
                  <div className="fest-card-dark">
                    <h3 className="font-display text-lg font-bold mb-6" style={{ color: "#fff" }}>General Registration</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {[
                        { label: "Full Name *", key: "name" as const, type: "text", placeholder: "John Doe" },
                        { label: "Email *", key: "email" as const, type: "email", placeholder: "john@example.com" },
                        { label: "Phone Number *", key: "phone" as const, type: "tel", placeholder: "+91 9876543210" },
                        { label: "College / Organization *", key: "college" as const, type: "text", placeholder: "Mandsaur University" },
                      ].map((field) => (
                        <div key={field.key}>
                          <label className="font-body text-xs font-bold uppercase tracking-wider mb-1.5 block" style={{ color: "rgba(255,255,255,0.4)" }}>{field.label}</label>
                          <input required type={field.type} value={formData[field.key]} onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })} className="fest-input" placeholder={field.placeholder} />
                        </div>
                      ))}
                      <div>
                        <label className="font-body text-xs font-bold uppercase tracking-wider mb-1.5 block" style={{ color: "rgba(255,255,255,0.4)" }}>Registration Type</label>
                        <select value={formData.event} onChange={(e) => setFormData({ ...formData, event: e.target.value })} className="fest-select">
                          <option value="general">General (All Events)</option>
                          <option value="ctf">CTF Competition Only</option>
                          <option value="workshop">Workshops Only</option>
                          <option value="talks">Talks & Panels Only</option>
                        </select>
                      </div>
                      <button type="submit" className="btn-primary w-full" style={{ marginTop: 8 }}>📤 Register Now</button>
                      <p className="font-body text-[10px] text-center" style={{ color: "rgba(255,255,255,0.3)" }}>This will open your email client with pre-filled registration details</p>
                    </form>
                  </div>
                )}
              </div>
              {/* Quick Links */}
              <div className="space-y-6 animate-on-scroll">
                <div className="fest-card-dark">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(0,255,65,0.15)" }}>🚩</div>
                    <div>
                      <h3 className="font-display text-sm font-bold" style={{ color: "#fff" }}>CTF Registration</h3>
                      <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Capture The Flag Competition</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4 font-body text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <li className="flex items-center gap-2"><span style={{ color: "var(--cyber-green)" }}>✓</span> Team of 1–4 members</li>
                    <li className="flex items-center gap-2"><span style={{ color: "var(--cyber-green)" }}>✓</span> Jeopardy-style challenges</li>
                    <li className="flex items-center gap-2"><span style={{ color: "var(--cyber-green)" }}>✓</span> 8-hour competition</li>
                    <li className="flex items-center gap-2"><span style={{ color: "var(--cyber-green)" }}>✓</span> Prize pool: {ctfInfo.prizePool}</li>
                  </ul>
                  <a href="#ctf" className="btn-green w-full text-center" style={{ padding: "10px 20px", fontSize: "0.8rem" }}>Learn More about CTF</a>
                </div>

                <div className="fest-card-dark">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(255,107,53,0.15)" }}>📚</div>
                    <div>
                      <h3 className="font-display text-sm font-bold" style={{ color: "#fff" }}>Workshop Registration</h3>
                      <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Hands-on Learning Sessions</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4 font-body text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <li className="flex items-center gap-2"><span style={{ color: "var(--orange)" }}>✓</span> Ethical Hacking Workshop</li>
                    <li className="flex items-center gap-2"><span style={{ color: "var(--orange)" }}>✓</span> Web Application Security</li>
                    <li className="flex items-center gap-2"><span style={{ color: "var(--orange)" }}>✓</span> Digital Forensics</li>
                    <li className="flex items-center gap-2"><span style={{ color: "var(--orange)" }}>✓</span> Bring your own laptop</li>
                  </ul>
                  <a href="#events" className="btn-primary w-full text-center" style={{ padding: "10px 20px", fontSize: "0.8rem" }}>View All Workshops</a>
                </div>

                <div className="fest-card-dark">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(124,58,237,0.15)" }}>🎤</div>
                    <div>
                      <h3 className="font-display text-sm font-bold" style={{ color: "#fff" }}>Talks & Panels</h3>
                      <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Expert Sessions & Discussions</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4 font-body text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <li className="flex items-center gap-2"><span style={{ color: "var(--purple)" }}>✓</span> Industry expert talks</li>
                    <li className="flex items-center gap-2"><span style={{ color: "var(--purple)" }}>✓</span> Career guidance panels</li>
                    <li className="flex items-center gap-2"><span style={{ color: "var(--purple)" }}>✓</span> Interactive Q&A sessions</li>
                    <li className="flex items-center gap-2"><span style={{ color: "var(--purple)" }}>✓</span> Networking opportunities</li>
                  </ul>
                  <a href="#speakers" className="btn-dark w-full text-center" style={{ padding: "10px 20px", fontSize: "0.8rem" }}>Meet the Speakers</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ FAQ ═══════════ */}
        <section id="faq" className="section-light relative py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 animate-on-scroll">
              <span className="section-tag" style={{ background: "rgba(124,58,237,0.15)", color: "var(--purple)" }}>FAQ</span>
              <h2 className="font-display font-black mt-4 mb-4" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "var(--dark)" }}>
                Got <span className="gradient-text-purple">Questions?</span>
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className={`fest-card faq-item ${openFaq === i ? "open" : ""} animate-on-scroll`} onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ cursor: "pointer" }}>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-body text-sm font-bold" style={{ color: "var(--dark)" }}>{faq.question}</h3>
                    <svg className="faq-chevron flex-shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                  <div className="faq-answer">
                    <p className="font-body text-sm pt-3" style={{ color: "#666" }}>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ PREFOOTER CTA ═══════════ */}
        <section className="section-dark relative py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prefooter-card animate-on-scroll">
              <h2 className="font-display font-black text-3xl sm:text-4xl mb-4" style={{ color: "#fff" }}>
                Ready to Join the Battle?
              </h2>
              <p className="font-body text-lg mb-8" style={{ color: "rgba(255,255,255,0.8)" }}>
                Don&apos;t miss out on the biggest cybersecurity event at Mandsaur University!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#register" className="btn-dark" style={{ background: "#fff", color: "var(--dark)" }}>Register Now</a>
                <a href="#ctf" className="btn-dark" style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "2px solid rgba(255,255,255,0.3)" }}>Join CTF</a>
              </div>
            </div>
          </div>
          <div className="diagonal-stripes" />
        </section>

        {/* ═══════════ FOOTER ═══════════ */}
        <footer className="section-dark relative py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--pink), var(--orange))" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
                  </div>
                  <span className="font-display font-bold text-lg" style={{ color: "#fff" }}>CSW 2026</span>
                </div>
                <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Cyber Security Week 2026<br />Mandsaur University, Mandsaur</p>
              </div>
              {/* Quick Links */}
              <div>
                <h4 className="font-display text-sm font-bold mb-4" style={{ color: "#fff" }}>Quick Links</h4>
                <div className="space-y-2">
                  {navLinks.slice(0, 5).map((l) => (
                    <a key={l.href} href={l.href} className="block font-body text-sm no-underline transition-colors" style={{ color: "rgba(255,255,255,0.4)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--pink)")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>{l.label}</a>
                  ))}
                </div>
              </div>
              {/* More Links */}
              <div>
                <h4 className="font-display text-sm font-bold mb-4" style={{ color: "#fff" }}>More</h4>
                <div className="space-y-2">
                  {navLinks.slice(5).map((l) => (
                    <a key={l.href} href={l.href} className="block font-body text-sm no-underline transition-colors" style={{ color: "rgba(255,255,255,0.4)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--pink)")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>{l.label}</a>
                  ))}
                </div>
              </div>
              {/* Contact */}
              <div>
                <h4 className="font-display text-sm font-bold mb-4" style={{ color: "#fff" }}>Contact</h4>
                <div className="space-y-2 font-body text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                  <p>📧 {eventInfo.email}</p>
                  <p>📍 {eventInfo.venue}</p>
                  <p>📅 {eventInfo.dates}</p>
                </div>
              </div>
            </div>
            <div className="pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                  &copy; 2026 Cyber Security Week — Mandsaur University. All rights reserved.
                </p>
                <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Defend. Detect. Dominate.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
