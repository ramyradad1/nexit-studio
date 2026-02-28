"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Globe, ExternalLink } from "lucide-react";
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
  liveUrl?: string;
  githubUrl?: string;
}

export function ProjectCard({ slug, title, description, tags, image, index, liveUrl, githubUrl }: ProjectCardProps) {
  const locale = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group flex flex-col glass-card overflow-hidden hover:border-accent/40 transition-all duration-500 h-full hover:shadow-xl hover:shadow-accent/5"
    >
      {/* Image */}
      <Link href={`/${locale}/projects/${slug}`} className="relative block aspect-4/3 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          loading="lazy"
          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Floating action button */}
        <motion.div
          className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-accent flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg shadow-accent/30"
          whileHover={{ scale: 1.15 }}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
        >
          <ArrowUpRight size={20} />
        </motion.div>

        {/* Tags floating on image hover */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white backdrop-blur-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col grow">
        <Link href={`/${locale}/projects/${slug}`}>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors duration-300">{title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent group-hover:bg-accent/15 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Links */}
        <div className="mt-auto pt-4 border-t border-border/50 flex items-center gap-4">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-1.5 text-sm font-medium ml-auto"
            >
              <Globe size={16} />
              <span>Visit Website</span>
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
