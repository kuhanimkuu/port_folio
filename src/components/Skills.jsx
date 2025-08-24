import SKILLS from "../data/skills.js";

export default function Skills() {
  return (
    <section id="skills" className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-theme mb-8 text-center">Skills</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {SKILLS.map((skill, idx) => (
            <div
              key={idx}
              className="
                bg-theme border border-theme rounded-xl p-6 text-center font-medium
                transition transform duration-300
                hover:-translate-y-2 hover:shadow-sky-500/20 hover:bg-[var(--surface-2)]
                cursor-default
              "
            >
              <span className="text-theme">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
