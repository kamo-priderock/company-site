"use client";

import { useState, useEffect } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { SectionHeading } from "../components/SectionHeading";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { mockProjects } from "../utilities/mockData";

interface ApiProject {
  _id: string;
  title: string;
  type: string;
  location: string;
  status: string;
  image: string;
}

type DisplayProject = {
  id?: string;
  title: string;
  type: string;
  location: string;
  status: string;
  image: string;
};

export function Projects() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [apiProjects, setApiProjects] = useState<ApiProject[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (!cancelled && res.ok) {
          setApiProjects(Array.isArray(data.projects) ? data.projects : []);
        } else if (!cancelled) {
          setApiProjects([]);
        }
      } catch {
        if (!cancelled) setApiProjects([]);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const loading = apiProjects === null;

  const displayProjects: DisplayProject[] = (() => {
    if (apiProjects === null) return [];
    if (apiProjects.length > 0) {
      const slice = isHomePage ? apiProjects.slice(0, 8) : apiProjects;
      return slice.map((p) => ({
        id: p._id,
        title: p.title,
        type: p.type,
        location: p.location,
        status: p.status,
        image: p.image,
      }));
    }
    const mockSlice = isHomePage ? mockProjects.slice(0, 8) : mockProjects;
    return mockSlice.map((p) => ({
      title: p.title,
      type: p.type,
      location: p.location,
      status: p.status,
      image: p.image,
    }));
  })();

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 md:px-12">
        <div
          className={
            isHomePage
              ? "mb-16 flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between"
              : "mb-16 flex flex-col items-center gap-8"
          }
        >
          <div className="flex w-full flex-col items-center text-center md:flex-1">
            <SectionHeading
              title="Featured Developments"
              subtitle="A showcase of our most iconic projects that redefine the urban landscape and set new standards in property development."
              align="center"
              className="mb-0"
            />
          </div>
          {isHomePage && (
            <Link
              href="/projects"
              className="inline-flex shrink-0 items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors whitespace-nowrap"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-amber-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {displayProjects.map((project, index) => (
              <ProjectCard
                key={project.id ?? `${project.title}-${index}`}
                id={project.id}
                title={project.title}
                type={project.type}
                location={project.location}
                status={project.status}
                image={project.image}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
