"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  index: number;
  githubUrl?: string;
  liveUrl?: string;
}

export function ProjectCard({ slug, title, description, tags, image, index, githubUrl, liveUrl }: ProjectCardProps) {
  const locale = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group flex flex-col glass-card overflow-hidden hover:border-accent/30 transition-all duration-300 h-full"
    >
      {/* Image */}
      <Link href={`/${locale}/projects/${slug}`} className="relative block aspect-4/3 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-accent flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <ArrowUpRight size={18} />
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col grow">
        <Link href={`/${locale}/projects/${slug}`}>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">{title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Links */}
        <div className="mt-auto pt-4 border-t border-border/50 flex items-center gap-4">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 text-sm font-medium"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-1.5 text-sm font-medium ml-auto"
            >
              <span>Demo</span>
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
