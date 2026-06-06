"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks, eventInfo } from "@/lib/event-data";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) { setActiveSection(sections[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => { setIsOpen(false); document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0a0a1a]/90 backdrop-blur-xl border-b border-[#1e293b]/50 shadow-lg shadow-black/20" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#home" onClick={(e) => { e.preventDefault(); go("#home"); }} className="flex items-center gap-2 group">
            <Shield className="w-8 h-8 text-[#00ff41] group-hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.5)] transition-all" />
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold text-[#00ff41] font-mono glow-green-text leading-tight">{eventInfo.shortName}</span>
              <span className="text-[10px] text-[#94a3b8] font-mono leading-tight"><Terminal className="w-3 h-3 inline mr-1" />{eventInfo.university}</span>
            </div>
          </a>
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = activeSection === link.href.replace("#", "");
              return <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); go(link.href); }}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${active ? "text-[#00ff41] bg-[#00ff41]/10 glow-green-text" : "text-[#94a3b8] hover:text-[#00ff41] hover:bg-[#00ff41]/5"}`}>{link.label}</a>;
            })}
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden text-[#94a3b8] hover:text-[#00ff41]" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>
      <AnimatePresence>{isOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-[#0a0a1a]/95 backdrop-blur-xl border-b border-[#1e293b]/50">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => { const active = activeSection === link.href.replace("#", "");
              return <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); go(link.href); }}
                className={`block px-4 py-3 rounded-lg text-sm font-medium ${active ? "text-[#00ff41] bg-[#00ff41]/10" : "text-[#94a3b8] hover:text-[#00ff41] hover:bg-[#00ff41]/5"}`}>{link.label}</a>;
            })}
          </div>
        </motion.div>
      )}</AnimatePresence>
    </motion.nav>
  );
}
