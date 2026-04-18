"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Loader2 } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { Sustainability } from "@/sections/Sustainability";
import { mockProjects } from "@/utilities/mockData";

interface ApiProject {
  _id: string;
  title: string;
  type: string;
  location: string;
  status: string;
  image: string;
}

interface ProjectsPageContent {
  title: string;
  description: string;
  heroImage: string;
}

export default function Projects() {
  const [apiProjects, setApiProjects] = useState<ApiProject[]>([]);
  const [pageContent, setPageContent] = useState<ProjectsPageContent>({
    title: "Our Projects",
    description: "A showcase of our most iconic developments",
    heroImage: "https://www.atterbury.co.za/wp-content/uploads/2021/03/Mall-of-Africa-outdoor-area.1.jpg",
  });
  const [listReady, setListReady] = useState(false);
  /** True once a successful API response was received (even if empty). */
  const [loadedFromApi, setLoadedFromApi] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        // Fetch projects
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (!cancelled && res.ok) {
          setApiProjects(Array.isArray(data.projects) ? data.projects : []);
          setLoadedFromApi(true);
        }

        // Fetch page content
        const contentRes = await fetch("/api/projects-page-content");
        const contentData = await contentRes.json();
        if (!cancelled && contentRes.ok && contentData.content) {
          setPageContent({
            title: contentData.content.title,
            description: contentData.content.description,
            heroImage: contentData.content.heroImage,
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setListReady(true);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const list: ApiProject[] = loadedFromApi
    ? apiProjects
    : mockProjects.map((p, i) => ({
        _id: String(i + 1),
        title: p.title,
        type: p.type,
        location: p.location,
        status: p.status,
        image: p.image,
      }));

  const categories = [
    "All",
    ...Array.from(new Set(list.map((p) => p.type))),
  ];

  const filteredProjects = list.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === "All" || project.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 bg-slate-50"
    >
      <div className="relative h-[35vh] md:h-[40vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${pageContent.heroImage})`,
          }}
        />
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="container mx-auto px-6 md:px-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4 mt-2 font-serif"
            >
              {pageContent.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-200 max-w-2xl mx-auto mt-3"
            >
              {pageContent.description}
            </motion.p>
          </div>
        </div>
      </div>

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          {!listReady ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  <div className="flex items-center gap-2 text-slate-400 mr-2">
                    <Filter className="w-4 h-4" />
                    <span className="text-sm font-medium uppercase tracking-wider hidden sm:inline-block">
                      Filter
                    </span>
                  </div>
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveFilter(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeFilter === category
                          ? "bg-amber-500 text-white shadow-md"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-72">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => (
                      <motion.div
                        key={project._id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProjectCard
                          id={project._id}
                          title={project.title}
                          type={project.type}
                          location={project.location}
                          status={project.status}
                          image={project.image}
                          index={index}
                        />
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="col-span-full py-20 text-center"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-400 mb-4">
                        <Search className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        No projects found
                      </h3>
                      <p className="text-slate-500">
                        Try adjusting your search or filter criteria.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchTerm("");
                          setActiveFilter("All");
                        }}
                        className="mt-6 text-amber-600 font-medium hover:text-amber-700 transition-colors"
                      >
                        Clear all filters
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </section>
    </motion.div>
  );
}
