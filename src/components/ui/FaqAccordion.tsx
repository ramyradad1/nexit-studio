"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FaqAccordionProps {
  items: { question: string; answer: string }[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${
              isOpen ? "border-accent/30 shadow-sm" : "border-border/50 hover:border-border"
            }`}
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-5 sm:p-6 text-start focus:outline-none"
              aria-expanded={isOpen}
            >
              <h3 className="font-semibold text-base sm:text-lg pr-4">{item.question}</h3>
              <div
                className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center transition-transform duration-300 ${
                  isOpen ? "bg-accent text-accent-foreground rotate-180" : "bg-muted text-muted-foreground"
                }`}
              >
                <ChevronDown size={18} />
              </div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="p-5 sm:p-6 pt-0 text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
