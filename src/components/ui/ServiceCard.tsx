"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
}

export function ServiceCard({ icon, title, description, index }: ServiceCardProps) {
  return (
    <div
      className="group relative glass-card p-6 sm:p-8 hover:border-accent/40 hover:-translate-y-2 cursor-pointer overflow-hidden"
    >
      {/* Animated gradient glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-accent/5 via-transparent to-sky-500/5 pointer-events-none" />

      {/* Animated corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-accent/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-24 group-hover:h-24" />

      <motion.div
        className="relative mb-5 h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 group-hover:shadow-lg group-hover:shadow-accent/25"
        whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
      >
        {icon}
      </motion.div>
      <h3 className="relative text-lg font-semibold mb-3 group-hover:text-accent transition-colors duration-300">{title}</h3>
      <p className="relative text-sm text-muted-foreground leading-relaxed">{description}</p>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-accent to-sky-400 group-hover:w-full transition-all duration-700 ease-out" />
    </div>
  );
}
