export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Your Name · Built with React + Tailwind CDN
      </div>
    </footer>
  );
}
