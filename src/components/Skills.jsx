import SKILLS from "../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="py-16 bg-slate-900">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">
          Skills
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {SKILLS.map((skill, idx) => (
            <div
              key={idx}
              className="
                bg-slate-800 rounded-xl p-6 text-center font-medium text-gray-200
                shadow-md transition transform duration-300
                hover:shadow-blue-500/40 hover:-translate-y-2 hover:bg-slate-700
              "
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
