"use client";

import clsx from "clsx";
import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className,
  type = "button",
  disabled,
  external,
}: ButtonProps) {
  const base = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 cursor-pointer gap-2";

  const variants = {
    primary:
      "bg-accent/80 backdrop-blur-md text-white hover:bg-accent shadow-lg shadow-accent/20 hover:shadow-accent/30 border border-white/10 hover:border-white/20",
    outline:
      "glass border border-border/50 text-foreground hover:bg-accent/10 hover:border-accent/50 backdrop-blur-md",
    ghost:
      "text-muted-foreground hover:text-foreground hover:bg-white/5 backdrop-blur-sm",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base",
  };

  const classes = clsx(base, variants[variant], sizes[size], disabled && "opacity-50 cursor-not-allowed", className);

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
