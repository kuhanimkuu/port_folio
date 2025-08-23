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
    if (!p) {
      console.warn(`gatherTags: project at index ${i} is falsy`, p);
      return;
    }
    if (!Array.isArray(p.tech)) {
      
      if (typeof p.tech === "string") {
        p.tech.split(",").map((t) => t.trim()).forEach((t) => t && s.add(t));
      } else {
        console.warn(`gatherTags: project.tech missing/invalid for "${p.title ?? "unknown"}"`, p.tech);
      }
      return;
    }
    p.tech.forEach((t) => {
      if (t) s.add(t);
    });
  });
  return Array.from(s);
}

export default function Projects() {
  
  if (typeof PROJECTS === "undefined") {
    console.error("PROJECTS is undefined. Ensure src/data/projects.js exists and exports default an array.");
    return (
      <section id="projects" className="py-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold">Projects</h2>
        <p className="mt-3 text-sm text-red-600">Projects data not found — check console for details.</p>
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
        <h2 className="text-2xl font-bold">Projects</h2>
        <p className="text-sm text-gray-500">{filtered.length} / {projectsArray.length}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-3 py-2 border rounded-lg w-full sm:w-64"
          placeholder="Search projects, tech or description"
          aria-label="Search projects"
        />

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1 rounded-full border ${!activeTag ? "bg-sky-100 text-sky-700" : "bg-white"}`}
          >
            All
          </button>

          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag((s) => (s === t ? null : t))}
              className={`px-3 py-1 rounded-full border ${activeTag === t ? "bg-sky-100 text-sky-700" : "bg-white"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, idx) => (
          <article
            key={p.title ?? idx}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") openProject(p); }}
            className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-sky-300 cursor-pointer"
            onClick={() => openProject(p)}
            aria-labelledby={`project-${idx}`}
          >
            <div className="h-40 w-full overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
              {p.image ? (
               
                <img src={String(p.image)} alt={p.title ?? ""} className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <div className="text-gray-400 text-sm">No thumbnail</div>
              )}
            </div>

            <h3 id={`project-${idx}`} className="mt-3 font-semibold">{p.title}</h3>
            <p className="mt-1 text-sm text-gray-600 line-clamp-3">{p.description}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {(Array.isArray(p.tech) ? p.tech : (typeof p.tech === "string" ? p.tech.split(",").map(t=>t.trim()) : [])).slice(0, 6).map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-full bg-gray-100">{t}</span>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-3">
              {p.github && <a href={p.github} onClick={(e)=>e.stopPropagation()} target="_blank" rel="noreferrer" className="text-sm underline text-sky-600">Repo</a>}
              {p.live && <a href={p.live} onClick={(e)=>e.stopPropagation()} target="_blank" rel="noreferrer" className="text-sm underline text-sky-600">Live</a>}
            </div>
          </article>
        ))}
      </div>

      <Modal open={open} onClose={() => { setOpen(false); setActive(null); }} project={active}>
        {active && (
          <div>
            <h3 className="text-xl font-semibold">{active.title}</h3>
            <p className="mt-2 text-gray-700">{active.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(Array.isArray(active.tech) ? active.tech : (typeof active.tech === "string" ? active.tech.split(",").map(t=>t.trim()) : [])).map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-full bg-gray-100">{t}</span>
              ))}
            </div>
            <div className="mt-5 flex gap-4">
              {active.github && <a className="underline text-sky-600" href={active.github} target="_blank" rel="noreferrer">GitHub</a>}
              {active.live && <a className="underline text-sky-600" href={active.live} target="_blank" rel="noreferrer">Live Demo</a>}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
