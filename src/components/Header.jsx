import { useEffect, useState } from "react";
import ME from "../data/me.js";

export default function Header() {
  const getTheme = () =>
    typeof document !== "undefined" ? document.documentElement.getAttribute("data-theme") || "light" : "light";

  const [theme, setTheme] = useState(getTheme());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onTheme = (e) => {
      setTheme(e?.detail?.theme ?? getTheme());
    };
    window.addEventListener("themechange", onTheme);
    setTheme(getTheme());
    return () => window.removeEventListener("themechange", onTheme);
  }, []);

  function handleToggle() {
    if (typeof window.toggleTheme === "function") {
      window.toggleTheme();
    } else {
      const next = theme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      setTheme(next);
      window.dispatchEvent(new CustomEvent("themechange", { detail: { theme: next } }));
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-theme bg-theme backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold">
            DM
          </div>
          <div>
            <h1 className="text-lg font-semibold text-theme">{ME.name}</h1>
            <p className="text-xs muted">{ME.title}</p>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#about" className="text-theme hover:text-accent transition">About</a>
          <a href="#skills" className="text-theme hover:text-accent transition">Skills</a>
          <a href="#projects" className="text-theme hover:text-accent transition">Projects</a>
          <a href="#contact" className="text-theme hover:text-accent transition">Contact</a>

          <button
            aria-label="Toggle theme"
            onClick={handleToggle}
            className="px-3 py-1 rounded-lg border border-theme bg-theme hover:shadow-sky-500/20 transition text-theme"
            title="Toggle theme"
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </nav>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3">
          <button
            aria-label="Toggle theme"
            onClick={handleToggle}
            className="px-3 py-1 rounded-lg border border-theme bg-theme hover:shadow-sky-500/20 transition text-theme"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>

          <button
            className="px-3 py-1 rounded-lg border border-theme bg-theme"
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-theme">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      {open && (
        <div className="bg-theme border-t border-theme">
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-2">
            <a href="#about" className="block py-2 text-theme" onClick={() => setOpen(false)}>About</a>
            <a href="#skills" className="block py-2 text-theme" onClick={() => setOpen(false)}>Skills</a>
            <a href="#projects" className="block py-2 text-theme" onClick={() => setOpen(false)}>Projects</a>
            <a href="#contact" className="block py-2 text-theme" onClick={() => setOpen(false)}>Contact</a>
          </div>
        </div>
      )}
    </header>
  );
}
