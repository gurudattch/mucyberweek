"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Shield, Globe, Search, Flag, Mic, MessageSquare, Brain, Award, Calendar, Clock, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { events } from "@/lib/event-data";

const iconMap: Record<string, React.ElementType> = { Flame, Shield, Globe, Search, Flag, Mic, MessageSquare, Brain, Award };
const catColors: Record<string, string> = {
  Ceremony: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  Workshop: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
  Competition: "border-green-500/30 bg-green-500/10 text-green-400",
  Talk: "border-purple-500/30 bg-purple-500/10 text-purple-400",
  Panel: "border-pink-500/30 bg-pink-500/10 text-pink-400",
};
const catGradients: Record<string, string> = {
  Ceremony: "from-amber-500/20 to-orange-500/20", Workshop: "from-cyan-500/20 to-teal-500/20",
  Competition: "from-green-500/20 to-emerald-500/20", Talk: "from-purple-500/20 to-violet-500/20",
  Panel: "from-pink-500/20 to-rose-500/20",
};

export function EventsSection() {
  const [filter, setFilter] = useState("All");
  const cats = ["All", ...new Set(events.map((e) => e.category))];
  const filtered = filter === "All" ? events : events.filter((e) => e.category === filter);

  return (
    <section id="events" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0a0f1a] to-[#0a0a1a]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/10 mb-4"><span className="text-[#00d4ff] text-xs font-mono uppercase tracking-wider">What&apos;s Happening</span></div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"><span className="text-white">Event </span><span className="text-[#00d4ff] glow-cyan-text font-mono">Showcase</span></h2>
          <p className="text-[#94a3b8]">Explore all the workshops, competitions, talks, and ceremonies</p>
        </motion.div>
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 justify-start lg:justify-center">
          {cats.map((c) => (
            <button key={c} onClick={() => setFilter(c)} className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-mono font-medium transition-all ${filter === c ? "bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/40" : "bg-[#0f172a]/50 text-[#94a3b8] border border-[#1e293b]/50 hover:border-[#00d4ff]/20 hover:text-[#00d4ff]/80"}`}>{c}</button>
          ))}
        </div>
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ev) => { const Ic = iconMap[ev.icon] || Shield; const cc = catColors[ev.category] || "border-gray-500/30 bg-gray-500/10 text-gray-400"; const cg = catGradients[ev.category] || "from-gray-500/20 to-gray-500/20"; return (
            <motion.div key={ev.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}
              className="glass-card rounded-xl overflow-hidden hover:border-[#00ff41]/20 transition-all group">
              <div className={`relative h-2 bg-gradient-to-r ${cg}`} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#00ff41]/10 border border-[#00ff41]/20 flex items-center justify-center group-hover:bg-[#00ff41]/15 transition-all"><Ic className="w-6 h-6 text-[#00ff41]" /></div>
                  <Badge variant="outline" className={`text-xs font-mono ${cc}`}>{ev.category}</Badge>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00ff41] transition-colors font-mono">{ev.title}</h3>
                <p className="text-sm text-[#94a3b8] mb-4 leading-relaxed line-clamp-3">{ev.description}</p>
                <div className="space-y-2 text-xs font-mono text-[#94a3b8]">
                  <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-[#00d4ff]" /><span>{ev.date}</span></div>
                  <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-[#00d4ff]" /><span>{ev.time}</span></div>
                  <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#00d4ff]" /><span>{ev.venue}</span></div>
                </div>
                <Button asChild variant="outline" size="sm" className="w-full mt-4 border-[#00ff41]/20 text-[#00ff41] hover:bg-[#00ff41]/10 hover:border-[#00ff41]/40 font-mono">
                  <a href="#register">Register <ExternalLink className="w-3.5 h-3.5 ml-1" /></a>
                </Button>
              </div>
            </motion.div>
          ); })}
        </motion.div>
      </div>
    </section>
  );
}
