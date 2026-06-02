"use client";

import { motion } from "framer-motion";
import { ExternalLink, Handshake, Building2 } from "lucide-react";
import { sponsors, partners } from "@/lib/event-data";

const tierConfig: Record<string, { label: string; color: string; border: string }> = {
  platinum: { label: "Platinum Sponsor", color: "text-gray-200", border: "border-gray-300/30" },
  gold: { label: "Gold Sponsor", color: "text-amber-400", border: "border-amber-500/30" },
  silver: { label: "Silver Sponsor", color: "text-gray-400", border: "border-gray-400/30" },
  community: { label: "Community Partner", color: "text-[#00d4ff]", border: "border-[#00d4ff]/20" },
};

export function SponsorsSection() {
  const tiers = ["platinum", "gold", "silver", "community"] as const;
  return (
    <section id="sponsors" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0a0f1a] to-[#0a0a1a]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 mb-4"><span className="text-amber-400 text-xs font-mono uppercase tracking-wider">Backed By The Best</span></div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"><span className="text-white">Sponsors & </span><span className="text-amber-400 font-mono">Partners</span></h2>
          <p className="text-[#94a3b8]">Made possible by the generous support of our sponsors and partners</p>
        </motion.div>
        <div className="space-y-10 mb-16">
          {tiers.map((tier) => { const ts = sponsors.filter((s) => s.tier === tier); if (!ts.length) return null; const cfg = tierConfig[tier]; return (
            <motion.div key={tier} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className={`text-center font-mono font-semibold mb-6 ${cfg.color}`}>{cfg.label}</h3>
              <div className={`grid gap-4 ${tier === "platinum" ? "grid-cols-1 sm:grid-cols-2 max-w-3xl" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 max-w-5xl"} mx-auto`}>
                {ts.map((s) => (
                  <div key={s.id} className={`glass-card rounded-xl p-6 ${cfg.border} hover:border-[#00ff41]/20 transition-all group text-center`}>
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3 group-hover:border-[#00ff41]/20 transition-all"><Building2 className={`w-6 h-6 ${cfg.color}`} /></div>
                    <h4 className="font-semibold font-mono text-white mb-1">{s.name}</h4>
                    <p className="text-xs text-[#94a3b8] mb-2">{s.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ); })}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="text-center font-mono font-semibold text-[#00d4ff] mb-6"><Handshake className="w-5 h-5 inline mr-2" />Our Partners</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {partners.map((p) => (
              <div key={p.id} className="glass-card rounded-lg p-4 hover:border-[#00d4ff]/20 transition-all group text-center">
                <h4 className="text-xs font-semibold text-white font-mono mb-1 group-hover:text-[#00d4ff] transition-colors">{p.name}</h4>
                <p className="text-[10px] text-[#94a3b8] font-mono">{p.type}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 text-center">
          <div className="glass-card rounded-2xl p-8 border border-amber-500/10 max-w-2xl mx-auto">
            <h4 className="text-lg font-semibold text-white mb-2">Want to Sponsor?</h4>
            <p className="text-sm text-[#94a3b8] mb-4">Join our mission to promote cybersecurity awareness.</p>
            <a href={`mailto:${"csw@mandsauruniversity.edu.in"}`} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-sm hover:bg-amber-500/20 transition-all">
              <ExternalLink className="w-4 h-4" /> Contact for Sponsorship
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
