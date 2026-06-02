"use client";

import { motion } from "framer-motion";
import { GraduationCap, User } from "lucide-react";
import { teamMembers } from "@/lib/event-data";

const roleColors: Record<string, string> = {
  "Faculty Coordinator": "bg-amber-500/10 text-amber-400 border-amber-500/20",
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

export function TeamSection() {
  const faculty = teamMembers.filter((m) => m.role === "Faculty Coordinator");
  const students = teamMembers.filter((m) => m.role !== "Faculty Coordinator");
  return (
    <section id="team" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0a0f1a] to-[#0a0a1a]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 mb-4"><span className="text-purple-400 text-xs font-mono uppercase tracking-wider">The Crew</span></div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"><span className="text-white">Our </span><span className="text-purple-400 font-mono">Organizing Team</span></h2>
          <p className="text-[#94a3b8]">The dedicated team behind Cyber Security Week 2026</p>
        </motion.div>
        {faculty.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-white font-mono mb-6 text-center"><GraduationCap className="w-5 h-5 inline mr-2 text-amber-400" />Faculty <span className="text-amber-400">Coordinators</span></h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {faculty.map((m, i) => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-xl p-6 hover:border-amber-500/30 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover:border-amber-500/40 transition-all">
                      <span className="text-lg font-bold text-amber-400 font-mono">{m.name.split(" ").map((n) => n[0]).join("")}</span>
                    </div>
                    <div className="min-w-0"><h4 className="text-base font-semibold text-white truncate">{m.name}</h4><p className="text-xs text-amber-400 font-mono">{m.role}</p><p className="text-xs text-[#94a3b8] font-mono truncate">{m.department}</p></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-white font-mono mb-6 text-center"><User className="w-5 h-5 inline mr-2 text-purple-400" />Student <span className="text-purple-400">Team</span></h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {students.map((m, i) => { const rc = roleColors[m.role] || "bg-gray-500/10 text-gray-400 border-gray-500/20"; return (
              <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="glass-card rounded-xl p-4 hover:border-purple-500/30 transition-all group text-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-[#00ff41]/20 border border-purple-500/20 flex items-center justify-center mx-auto mb-3 group-hover:border-purple-500/40 transition-all">
                  <span className="text-sm font-bold text-purple-400 font-mono">{m.name.split(" ").map((n) => n[0]).join("")}</span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">{m.name}</h4>
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono border ${rc} mb-1`}>{m.role}</span>
                <p className="text-[10px] text-[#94a3b8] font-mono">{m.department}</p>
              </motion.div>
            ); })}
          </div>
        </div>
      </div>
    </section>
  );
}
