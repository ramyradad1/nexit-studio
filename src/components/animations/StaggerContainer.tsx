"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import clsx from "clsx";

interface StaggerContainerProps {
  children: React.ReactNode;
  delayChildren?: number;
  staggerChildren?: number;
  className?: string;
  viewportMargin?: string;
  once?: boolean;
}

export function StaggerContainer({
  children,
  delayChildren = 0.1,
  staggerChildren = 0.1,
  className,
  viewportMargin = "-50px",
  once = true,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isInView = useInView(ref, { once, margin: viewportMargin as any });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren,
        staggerChildren,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={clsx(className)}
    >
      {children}
    </motion.div>
  );
}

// Helper to wrap individual children inside StaggerContainer
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98]
    }
  },
};
