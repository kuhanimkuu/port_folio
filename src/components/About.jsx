import ME from "../data/me";
import profilePic from "../assets/profile.jpg"; 

export default function About() {
  return (
    <section id="about" className="py-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-left gap-6">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={profilePic}
            alt={ME.name}
            className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-theme object-cover"
          />
        </div>

        {/* Text */}
        <div className="flex-1 prose max-w-none">
          <h2 className="text-2xl font-bold">{ME.name}</h2>
          <p className="mt-2 text-[var(--text)] max-w-3xl">{ME.blurb}</p>
          <div className="mt-4 text-sm text-[var(--muted)] flex flex-wrap items-center gap-2">
            <span>{ME.location}</span>
            <span>•</span>
            <a href={`mailto:${ME.email}`} className="underline text-[var(--accent)]">{ME.email}</a>
            <span>•</span>
            <a href={ME.github} target="_blank" rel="noreferrer" className="underline text-[var(--accent)]">GitHub</a>
          </div>
        </div>
      </div>
    </section>
  );
}
