"use client";
import { useState } from "react";
import type { Project } from "@/lib/types";
import { ProjectCard } from "./cards";
export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("Tümü");
  const categories = ["Tümü", ...new Set(projects.map((p) => p.category))];
  return (
    <>
      <div className="filters">
        {categories.map((c) => (
          <button
            key={c}
            className={filter === c ? "selected" : ""}
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {projects
          .filter((p) => filter === "Tümü" || p.category === filter)
          .map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
      </div>
    </>
  );
}
