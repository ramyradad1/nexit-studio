"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/201030769960"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 hover:shadow-emerald-500/40 hover:scale-110 transition-all duration-200 cursor-pointer"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} />
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full animate-ping bg-emerald-500/20 pointer-events-none" />
    </motion.a>
  );
}
