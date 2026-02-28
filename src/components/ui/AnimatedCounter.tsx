"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  label: string;
}

export function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  /* Extract numeric part and prefix/suffix (e.g. "150+" → num=150, suffix="+") */
  const match = value.match(/^([+]?)(\d+)([+]?)$/);
  const prefix = match?.[1] || "";
  const target = parseInt(match?.[2] || "0", 10);
  const suffix = match?.[3] || "";

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const duration = 1500; // ms
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target, prefix, suffix]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="text-center p-6 rounded-2xl border border-border bg-muted/20"
    >
      <div className="text-3xl sm:text-4xl font-bold text-accent mb-2 tabular-nums">
        {display}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  );
}
