"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { Arrow } from "./icons";

export function StudioSelection({
  projects,
  showreelUrl,
}: {
  projects: Project[];
  showreelUrl: string;
}) {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];
  if (!project) return null;
  return (
    <section className="studio-selection">
      <div className="container selection-grid">
        <div className="selection-copy">
          <span className="eyebrow light">STUDIO SEÇKİSİ</span>
          <h2>
            Bir fikir.
            <br />
            <span className="serif">Birçok ifade.</span>
          </h2>
          <p>
            Kimlikten ambalaja, dijital deneyimden içerik dünyasına. Birlikte
            çalışan tasarım fikirlerini keşfedin.
          </p>
          <Link
            href={showreelUrl || "/projeler"}
            className="text-link light-link"
            {...(showreelUrl
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {showreelUrl ? "Showreel’i izle" : "Proje hikâyelerine geç"}
            <Arrow diagonal />
          </Link>
          <div className="selection-controls">
            <button
              type="button"
              aria-label="Önceki çalışma"
              onClick={() =>
                setSelected((selected + projects.length - 1) % projects.length)
              }
            >
              ←
            </button>
            <span aria-live="polite">
              {String(selected + 1).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              aria-label="Sonraki çalışma"
              onClick={() => setSelected((selected + 1) % projects.length)}
            >
              →
            </button>
          </div>
        </div>
        <div className="selection-work">
          <Link href={`/projeler/${project.slug}`}>
            <img
              src={project.image}
              alt={`${project.client} — ${project.category}${project.demo ? " konsept çalışması" : ""}`}
              width="1200"
              height="900"
              loading="lazy"
            />
            <div>
              <strong>{project.client}</strong>
              <span>
                {project.category} {project.demo && "· Konsept"}
                <Arrow diagonal />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
