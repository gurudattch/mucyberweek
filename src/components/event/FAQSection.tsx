"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqs } from "@/lib/event-data";

function FAQItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="glass-card rounded-xl overflow-hidden border border-[#1e293b]/50 hover:border-[#00ff41]/20 transition-all">
      <button onClick={onToggle} className="w-full flex items-center justify-between p-5 text-left" aria-expanded={isOpen}>
        <span className="text-sm sm:text-base font-medium text-white pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-[#00ff41] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <motion.div initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
        <div className="px-5 pb-5 text-sm text-[#94a3b8] leading-relaxed border-t border-[#1e293b]/50 pt-4">{answer}</div>
      </motion.div>
    </div>
  );
}

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0a0f1a] to-[#0a0a1a]" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/10 mb-4"><span className="text-[#00d4ff] text-xs font-mono uppercase tracking-wider">Got Questions?</span></div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"><span className="text-white">FAQ</span></h2>
          <p className="text-[#94a3b8]">Find answers to commonly asked questions</p>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <FAQItem question={faq.question} answer={faq.answer} isOpen={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? null : i)} />
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 text-center">
          <div className="glass-card rounded-xl p-6 border border-[#00d4ff]/10">
            <HelpCircle className="w-8 h-8 text-[#00d4ff] mx-auto mb-3" />
            <h4 className="text-base font-semibold text-white mb-2">Still have questions?</h4>
            <p className="text-sm text-[#94a3b8] mb-4">Reach out to our organizing team!</p>
            <a href="mailto:csw@mandsauruniversity.edu.in" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[#00d4ff] font-mono text-sm hover:bg-[#00d4ff]/20 transition-all">csw@mandsauruniversity.edu.in</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
