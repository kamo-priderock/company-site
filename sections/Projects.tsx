"use client";

import { ProjectCard } from "../components/ProjectCard";
import { SectionHeading } from "../components/SectionHeading";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { mockProjects } from "../utilities/mockData";

export function Projects() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const displayProjects = isHomePage ? mockProjects.slice(0, 4) : mockProjects;

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <SectionHeading
            title="Featured Developments"
            subtitle="A showcase of our most iconic projects that redefine the urban landscape and set new standards in property development."
            align="left"
            className="mb-0"
          />
          {isHomePage && (
            <Link 
              href="/projects"
              className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors whitespace-nowrap"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProjects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
