import Link from "next/link";
import type { Article, Project } from "@/lib/types";
import { Arrow } from "./icons";
export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <Link href={`/projeler/${project.slug}`} className="project-card">
      <div className={`project-image tone-${index % 4}`}>
        <img
          src={project.image}
          alt={`${project.client} — ${project.category} ${project.demo ? "konsept çalışması" : ""}`}
          loading="lazy"
          width="900"
          height="700"
        />
        <span className="image-arrow">
          <Arrow diagonal />
        </span>
        {project.demo && <span className="demo-label">KONSEPT ÇALIŞMA</span>}
      </div>
      <div className="project-meta">
        <div>
          <span>{project.client}</span>
          <h3>{project.title}</h3>
        </div>
        <span>{project.category}</span>
      </div>
    </Link>
  );
}
export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link className="article-card" href={`/blog/${article.slug}`}>
      <div className="article-image">
        <img
          src={article.image}
          alt=""
          width="600"
          height="430"
          loading="lazy"
        />
      </div>
      <div>
        <span className="eyebrow">{article.category}</span>
        <h3>{article.title}</h3>
        <p>{article.summary}</p>
        <span className="text-link">
          Yazıyı oku <Arrow diagonal />
        </span>
      </div>
    </Link>
  );
}
export function PageIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="page-intro container">
      <span className="eyebrow">{label}</span>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </section>
  );
}
export function Prose({ text }: { text: string }) {
  return (
    <div className="prose">
      {text.split(/\n\n+/).map((block, i) => {
        if (block.startsWith("# ")) return <h2 key={i}>{block.slice(2)}</h2>;
        if (block.startsWith("## ")) return <h3 key={i}>{block.slice(3)}</h3>;
        if (block.startsWith("- "))
          return (
            <ul key={i}>
              {block.split("\n").map((x, j) => (
                <li key={j}>{x.replace(/^- /, "")}</li>
              ))}
            </ul>
          );
        return <p key={i}>{block}</p>;
      })}
    </div>
  );
}
