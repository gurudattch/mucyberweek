"use client";

import { motion } from "framer-motion";
import { Globe, Lock, Cog, Search, Eye, Puzzle, Users, Clock, Trophy, Flag, ExternalLink, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ctfInfo } from "@/lib/event-data";

const catIcons: Record<string, React.ElementType> = { Globe, Lock, Cog, Search, Eye, Puzzle };
const diffColors: Record<string, string> = { "Easy to Hard": "text-green-400", "Medium to Hard": "text-orange-400", "Easy to Medium": "text-cyan-400" };

export function CTFSection() {
  return (
    <section id="ctf" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0a1a0a]/50 to-[#0a0a1a]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-[#00ff41]/30 bg-[#00ff41]/10 mb-4"><span className="text-[#00ff41] text-xs font-mono uppercase tracking-wider">Competition</span></div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2"><span className="text-[#00ff41] glow-green-text font-mono">{ctfInfo.title}</span></h2>
          <p className="text-xl text-[#00d4ff] font-mono mb-4">{ctfInfo.tagline}</p>
          <p className="text-[#94a3b8] max-w-2xl mx-auto">Test your hacking skills in our Jeopardy-style CTF. Solve challenges, earn points, and win prizes!</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[{ icon: Flag, label: "Format", value: ctfInfo.format }, { icon: Users, label: "Team Size", value: ctfInfo.teamSize }, { icon: Clock, label: "Duration", value: ctfInfo.duration }, { icon: Trophy, label: "Prize Pool", value: ctfInfo.prizePool }].map((item) => (
            <div key={item.label} className="glass-card rounded-xl p-4 text-center border border-[#00ff41]/10">
              <item.icon className="w-6 h-6 text-[#00ff41] mx-auto mb-2" />
              <div className="text-xs text-[#94a3b8] font-mono uppercase mb-1">{item.label}</div>
              <div className="text-sm font-semibold text-white font-mono">{item.value}</div>
            </div>
          ))}
        </motion.div>
        <div className="mb-12">
          <h3 className="text-xl font-bold text-white font-mono mb-6 text-center">Challenge <span className="text-[#00ff41]">Categories</span></h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ctfInfo.categories.map((cat, idx) => { const Ic = catIcons[cat.icon] || Puzzle; return (
              <motion.div key={cat.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                className="glass-card rounded-xl p-5 hover:border-[#00ff41]/30 transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#00ff41]/10 border border-[#00ff41]/20 flex items-center justify-center group-hover:bg-[#00ff41]/15 transition-all"><Ic className="w-5 h-5 text-[#00ff41]" /></div>
                  <div><h4 className="text-sm font-semibold text-white font-mono">{cat.name}</h4><span className={`text-xs font-mono ${diffColors[cat.difficulty] || "text-gray-400"}`}>{cat.difficulty}</span></div>
                </div>
                <p className="text-xs text-[#94a3b8] leading-relaxed">{cat.description}</p>
              </motion.div>
            ); })}
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6 sm:p-8 mb-8 border border-[#00ff41]/10">
          <h3 className="text-xl font-bold text-white font-mono mb-6 text-center">CTF <span className="text-[#00ff41]">Rules</span></h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl mx-auto">
            {ctfInfo.rules.map((rule, i) => (<div key={i} className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-[#00ff41] mt-0.5 flex-shrink-0" /><span className="text-sm text-[#94a3b8]">{rule}</span></div>))}
          </div>
        </motion.div>
        <div className="text-center">
          <Button asChild size="lg" className="neon-button bg-[#00ff41] text-[#0a0a1a] hover:bg-[#00ff41]/90 font-bold font-mono px-10 h-14 text-lg">
            <a href="#register">Register for CTF <ExternalLink className="w-5 h-5 ml-2" /></a>
          </Button>
        </div>
      </div>
    </section>
  );
}
