"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { FadeIn } from "@/components/animations/FadeIn";

type ProjectId = "realestate" | "coffee" | "agency" | "vision" | "logistics" | "education";

const projectKeys: ProjectId[] = ["realestate", "coffee", "agency", "vision", "logistics", "education"];

const projectImages = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070",
  "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=2071",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070",
  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=2000",
];

const githubLinks = [
  "https://github.com/nexait-studio/riyadh-residences",
  "https://github.com/nexait-studio/saudi-coffee-co",
  "https://github.com/nexait-studio/jeddah-tech-hub",
  "https://github.com/nexait-studio/vision-2030-tracker",
  "https://github.com/nexait-studio/fasttrack-logistics",
  "https://github.com/nexait-studio/edulearn-platform",
];

const categories = ["all", "web", "mobile", "ui", "cloud"] as const;
type Category = typeof categories[number];

export function ProjectsGrid() {
  const t = useTranslations("Projects");
  
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Map the project keys to full data objects including translations
  const projects = projectKeys.map((key, i) => {
    return {
      key,
      title: t(`items.${key}.title`),
      description: t(`items.${key}.description`),
      tags: t(`items.${key}.tags`).split(","),
      category: (t.raw(`items.${key}`) as { category?: string }).category || "web", // fallback to web
      image: projectImages[i],
      githubUrl: githubLinks[i],
    };
  });

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-10">
      {/* Controls: Search & Filters */}
      <FadeIn className="flex flex-col md:flex-row gap-6 items-center justify-between">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-muted/30 rounded-2xl glass-card">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <span className="capitalize">{cat === "ui" ? "UI/UX" : cat}</span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
          />
        </div>
      </FadeIn>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, i) => (
              <motion.div
                key={project.key}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard
                  slug={project.key}
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  image={project.image}
                  index={i}
                  githubUrl={project.githubUrl}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-1 md:col-span-2 text-center py-20 text-muted-foreground"
            >
              No projects match your search criteria.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
