"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface ReviewCardProps {
  name: string;
  role: string;
  quote: string;
  index: number;
}

export function ReviewCard({ name, role, quote, index }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="glass-card p-6 sm:p-8 flex flex-col"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-sm sm:text-base text-muted-foreground leading-relaxed flex-1">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-linear-to-br from-accent to-sky-400 flex items-center justify-center text-white font-bold text-sm">
            {name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold">{name}</p>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
