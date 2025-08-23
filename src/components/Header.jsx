import { useEffect, useState } from "react";
import ME from "../data/me.js"; 

export default function Header() {
  const prefersDark =
    typeof window !== "undefined" &&
    (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || (prefersDark ? "dark" : "light")
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
   
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  
  const headerBase = "sticky top-0 z-40 border-b";
  const headerThemeClass =
    theme === "dark"
      ? "bg-slate-900/80 border-slate-800 text-gray-200 backdrop-blur"
      : "bg-white/80 border-gray-200 text-gray-800 backdrop-blur";

  const linkBase = "text-sm hover:text-sky-400 transition";
  const linkThemeClass = theme === "dark" ? "text-gray-300" : "text-gray-700";

  const btnBase =
    "px-3 py-1 rounded-lg border transition focus:outline-none focus-visible:ring-2";
  const btnThemeClass =
    theme === "dark"
      ? "border-slate-700 bg-slate-800 text-gray-200 hover:bg-slate-700 focus-visible:ring-sky-300"
      : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50 focus-visible:ring-sky-300";

  return (
    <header className={`${headerBase} ${headerThemeClass}`}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold">
            DM
          </div>
          <div>
            <h1 className="text-lg font-semibold">{ME.name}</h1>
            <p className="text-xs opacity-80">{ME.title}</p>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#about" className={`${linkBase} ${linkThemeClass}`}>About</a>
          <a href="#skills" className={`${linkBase} ${linkThemeClass}`}>Skills</a>
          <a href="#projects" className={`${linkBase} ${linkThemeClass}`}>Projects</a>
          <a href="#contact" className={`${linkBase} ${linkThemeClass}`}>Contact</a>

          <button
            aria-label="Toggle theme"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            className={`${btnBase} ${btnThemeClass}`}
            title="Toggle theme"
          >
            {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
          </button>
        </nav>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3">
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            className={`${btnBase} ${btnThemeClass}`}
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>

          <button
            className={`${btnBase} ${theme === "dark" ? "border-slate-700 bg-slate-800 text-gray-200" : "border-gray-200 bg-white text-gray-800"}`}
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={theme === "dark" ? "text-gray-200" : "text-gray-800"}>
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      {open && (
        <div className={`${theme === "dark" ? "bg-slate-900 border-t border-slate-800" : "bg-white border-t border-gray-200"}`}>
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-2">
            <a href="#about" className="block py-2" onClick={() => setOpen(false)}>About</a>
            <a href="#skills" className="block py-2" onClick={() => setOpen(false)}>Skills</a>
            <a href="#projects" className="block py-2" onClick={() => setOpen(false)}>Projects</a>
            <a href="#contact" className="block py-2" onClick={() => setOpen(false)}>Contact</a>
          </div>
        </div>
      )}
    </header>
  );
}
