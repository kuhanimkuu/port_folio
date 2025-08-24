import { useEffect, useMemo, useState } from "react";
import PROJECTS from "../data/projects.js";
import Modal from "./Modal.jsx";

function gatherTags(projects) {
  if (!projects) return [];
  if (!Array.isArray(projects)) {
    console.error("gatherTags: expected an array, got:", projects);
    return [];
  }
  const s = new Set();
  projects.forEach((p, i) => {
    if (!p) return;
    if (Array.isArray(p.tech)) {
      p.tech.forEach((t) => t && s.add(t));
    } else if (typeof p.tech === "string") {
      p.tech.split(",").map((t) => t.trim()).forEach((t) => t && s.add(t));
    } else {
   
    }
  });
  return Array.from(s);
}

export default function Projects() {
  if (typeof PROJECTS === "undefined") {
    console.error("PROJECTS is undefined. Ensure src/data/projects.js exists and exports default an array.");
    return (
      <section id="projects" className="py-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-theme">Projects</h2>
        <p className="mt-3 text-sm muted">Projects data not found — check console for details.</p>
      </section>
    );
  }

  const projectsArray = Array.isArray(PROJECTS) ? PROJECTS : [];

  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const tags = useMemo(() => gatherTags(projectsArray), [projectsArray]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = projectsArray.filter((p) => {
    if (!p) return false;
    const title = String(p.title ?? "").toLowerCase();
    const desc = String(p.description ?? "").toLowerCase();
    const tech = Array.isArray(p.tech) ? p.tech.join(" ").toLowerCase() : String(p.tech ?? "").toLowerCase();
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || title.includes(q) || desc.includes(q) || tech.includes(q);
    const matchesTag = !activeTag || (Array.isArray(p.tech) ? p.tech.includes(activeTag) : String(p.tech ?? "").includes(activeTag));
    return matchesQuery && matchesTag;
  });

  function openProject(p) {
    setActive(p);
    setOpen(true);
  }

  return (
    <section id="projects" className="py-8 max-w-5xl mx-auto">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-bold text-theme">Projects</h2>
        <p className="text-sm muted">{filtered.length} / {projectsArray.length}</p>
      </div>

      {/* Filter bar */}
      <div className="mt-4 flex flex-wrap gap-3 items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-3 py-2 rounded-lg border border-theme bg-theme text-theme w-full sm:w-64 transition"
          placeholder="Search projects, tech or description"
          aria-label="Search projects"
        />

        <div className="flex gap-2 flex-wrap ml-auto">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1 rounded-full border border-theme ${!activeTag ? "btn-primary" : "bg-theme text-theme"}`}
            aria-pressed={!activeTag}
          >
            All
          </button>

          {tags.map((t) => {
            const active = activeTag === t;
            return (
              <button
                key={t}
                onClick={() => setActiveTag((s) => (s === t ? null : t))}
                className={`px-3 py-1 rounded-full border border-theme transition ${active ? "btn-primary" : "bg-theme text-theme"}`}
                aria-pressed={!!active}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Project grid */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, idx) => (
          <article
            key={p.title ?? idx}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") openProject(p); }}
            className="bg-theme border border-theme rounded-2xl p-4 shadow-sm hover:shadow-sky-500/20 transition transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] cursor-pointer"
            onClick={() => openProject(p)}
            aria-labelledby={`project-${idx}`}
          >
            <div className="h-40 w-full overflow-hidden rounded-lg bg-[var(--surface-2)] flex items-center justify-center">
              {p.image ? (
                <img src={String(p.image)} alt={p.title ?? ""} className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <div className="muted text-sm">No thumbnail</div>
              )}
            </div>

            <h3 id={`project-${idx}`} className="mt-3 font-semibold text-theme">{p.title}</h3>
            <p className="mt-1 text-sm muted line-clamp-3">{p.description}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {(Array.isArray(p.tech) ? p.tech : (typeof p.tech === "string" ? p.tech.split(",").map(t => t.trim()) : [])).slice(0, 6).map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-full border border-theme bg-theme text-theme">{t}</span>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-3">
              {p.github && <a href={p.github} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer" className="text-[var(--accent)] underline">Repo</a>}
              {p.live && <a href={p.live} onClick={(e) => e.stopPropagation()} target="_blank" rel="noreferrer" className="text-[var(--accent)] underline">Live</a>}
            </div>
          </article>
        ))}
      </div>

      <Modal open={open} onClose={() => { setOpen(false); setActive(null); }} project={active}>
        {active && (
          <div>
            <h3 className="text-xl font-semibold text-theme">{active.title}</h3>
            <p className="mt-2 muted">{active.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(Array.isArray(active.tech) ? active.tech : (typeof active.tech === "string" ? active.tech.split(",").map(t => t.trim()) : [])).map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-full border border-theme bg-theme text-theme">{t}</span>
              ))}
            </div>
            <div className="mt-5 flex gap-4">
              {active.github && <a className="underline text-[var(--accent)]" href={active.github} target="_blank" rel="noreferrer">GitHub</a>}
              {active.live && <a className="underline text-[var(--accent)]" href={active.live} target="_blank" rel="noreferrer">Live Demo</a>}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
