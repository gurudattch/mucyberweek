"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, ExternalLink, Flag, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { eventInfo } from "@/lib/event-data";

export function RegistrationSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", college: "", event: "general" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In static mode, construct a mailto link with the form data
    const subject = encodeURIComponent(`CSW 2025 Registration - ${formData.event.toUpperCase()}`);
    const body = encodeURIComponent(
      `Registration for Cyber Security Week 2025\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCollege: ${formData.college}\nEvent Type: ${formData.event}\n\nSubmitted on: ${new Date().toLocaleString()}`
    );
    window.open(`mailto:${eventInfo.email}?subject=${subject}&body=${body}`, "_blank");
    setIsSubmitted(true);
  };

  return (
    <section id="register" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0a0f1a] to-[#0a0a1a]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00ff41]/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full border border-[#00ff41]/30 bg-[#00ff41]/10 mb-4"><span className="text-[#00ff41] text-xs font-mono uppercase tracking-wider">Join Us</span></div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"><span className="text-white">Register </span><span className="text-[#00ff41] glow-green-text font-mono">Now</span></h2>
          <p className="text-[#94a3b8]">Secure your spot at Cyber Security Week 2025. Limited seats!</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {isSubmitted ? (
              <div className="glass-card rounded-2xl p-8 text-center border border-[#00ff41]/20">
                <CheckCircle2 className="w-16 h-16 text-[#00ff41] mx-auto mb-4" />
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
                      <Input required type={field.type} value={formData[field.key]} onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        className="bg-[#0a0a1a]/50 border-[#1e293b] text-white placeholder:text-[#4a5568] font-mono focus:border-[#00ff41]/50 focus:ring-[#00ff41]/20" placeholder={field.placeholder} />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs text-[#94a3b8] font-mono uppercase tracking-wider mb-1.5 block">Registration Type</label>
                    <select value={formData.event} onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                      className="w-full h-10 px-3 rounded-md bg-[#0a0a1a]/50 border border-[#1e293b] text-white font-mono text-sm focus:border-[#00ff41]/50 focus:outline-none">
                      <option value="general">General (All Events)</option>
                      <option value="ctf">CTF Competition Only</option>
                      <option value="workshop">Workshops Only</option>
                      <option value="talks">Talks & Panels Only</option>
                    </select>
                  </div>
                  <Button type="submit" className="w-full neon-button bg-[#00ff41] text-[#0a0a1a] hover:bg-[#00ff41]/90 font-bold font-mono h-12 text-base mt-2">
                    <span className="flex items-center gap-2"><Send className="w-4 h-4" /> Register Now</span>
                  </Button>
                  <p className="text-[10px] text-[#4a5568] text-center font-mono">This will open your email client with pre-filled registration details</p>
                </div>
              </form>
            )}
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-[#00ff41]/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#00ff41]/10 border border-[#00ff41]/20 flex items-center justify-center"><Flag className="w-5 h-5 text-[#00ff41]" /></div>
                <div><h3 className="text-base font-semibold text-white font-mono">CTF Registration</h3><p className="text-xs text-[#94a3b8]">Capture The Flag Competition</p></div>
              </div>
              <ul className="space-y-2 mb-4 text-sm text-[#94a3b8]">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00ff41]" /> Team of 1–4 members</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00ff41]" /> July 18, 2025 | 9:30 AM – 5:30 PM</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00ff41]" /> Prize pool: ₹25,000+</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00ff41]" /> Jeopardy-style challenges</li>
              </ul>
              <Button asChild className="w-full bg-[#00ff41]/10 border border-[#00ff41]/30 text-[#00ff41] hover:bg-[#00ff41]/20 font-mono" variant="outline">
                <a href="#register">Register for CTF <ExternalLink className="w-4 h-4 ml-2" /></a>
              </Button>
            </div>
            <div className="glass-card rounded-2xl p-6 border border-[#00d4ff]/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center"><Calendar className="w-5 h-5 text-[#00d4ff]" /></div>
                <div><h3 className="text-base font-semibold text-white font-mono">Workshop Registration</h3><p className="text-xs text-[#94a3b8]">Hands-on Learning Sessions</p></div>
              </div>
              <ul className="space-y-2 mb-4 text-sm text-[#94a3b8]">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00d4ff]" /> Ethical Hacking (July 15)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00d4ff]" /> Web App Security (July 16)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00d4ff]" /> Digital Forensics (July 17)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00d4ff]" /> BYOL (Bring Your Own Laptop)</li>
              </ul>
              <Button asChild className="w-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/20 font-mono" variant="outline">
                <a href="#register">Register for Workshops <ExternalLink className="w-4 h-4 ml-2" /></a>
              </Button>
            </div>
            <div className="glass-card rounded-xl p-4 border border-amber-500/10 bg-amber-500/5">
              <p className="text-xs text-amber-400 font-mono">⚠️ Registration is mandatory for all events. Seats are limited and allotted on first-come basis. Carry your college ID card.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
