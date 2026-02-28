import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import ProjectContent from "./ProjectContent";

/* Static project data — in a real app this might come from a CMS */
const projectData: Record<
  string,
  { image: string; tags: string[]; year: string; client: string; githubUrl?: string }
> = {
  realestate: {
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070",
    tags: ["HTML", "CSS", "JS"],
    year: "2025",
    client: "Riyadh Real Estate Co.",
    githubUrl: "https://github.com/nexait-studio/riyadh-residences",
  },
  coffee: {
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=2071",
    tags: ["React", "Tailwind"],
    year: "2025",
    client: "Saudi Coffee Roasters",
    githubUrl: "https://github.com/nexait-studio/saudi-coffee-co",
  },
  agency: {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069",
    tags: ["Vanilla JS", "GSAP"],
    year: "2024",
    client: "Jeddah Tech Hub",
    githubUrl: "https://github.com/nexait-studio/jeddah-tech-hub",
  },
  vision: {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070",
    tags: ["React", "D3.js"],
    year: "2024",
    client: "Ministry of Planning",
    githubUrl: "https://github.com/nexait-studio/vision-2030-tracker",
  },
  logistics: {
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=2000",
    tags: ["Next.js", "PostgreSQL", "Maps"],
    year: "2025",
    client: "FastTrack Logistics",
    githubUrl: "https://github.com/nexait-studio/fasttrack-logistics",
  },
  education: {
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=2000",
    tags: ["React Native", "Node.js"],
    year: "2024",
    client: "EduLearn Academy",
    githubUrl: "https://github.com/nexait-studio/edulearn-platform",
  },
};

const slugs = Object.keys(projectData);

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string; locale: string };
  }) {
  const slug = params.slug as keyof typeof projectData;
  const project = projectData[slug];

  if (!project) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Button href="/projects" className="mt-6">
          <ArrowLeft size={16} />
          Back to Projects
        </Button>
      </Container>
    );
  }

  const projectKey = slug as "realestate" | "coffee" | "agency" | "vision" | "logistics" | "education";

  return <ProjectContent project={project} projectKey={projectKey} />;
}
