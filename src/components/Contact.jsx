import { useState } from "react";
import ME from "../data/me.js";
const ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/mrblnnol";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function validate() {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all fields.");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError(null);
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    setError(null);

    try {
      const payload = {
        name: form.name,
        email: form.email,
        message: form.message,
        _subject: `Portfolio message from ${form.name}`, // Formspree uses _subject
      };

      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        // Formspree returns errors in a consistent shape; show something helpful
        const reason = (data && data.error) ? data.error : `Server returned ${res.status}`;
        throw new Error(reason);
      }

      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      setError("Failed to send message. You can also email me directly.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="py-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-sky-300">Contact</h2>

        <div className="mt-4 bg-surface border border-border rounded-2xl p-6" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="text-sm text-muted">Name</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md p-3 bg-transparent border border-slate-700"
                  placeholder="Your name"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm text-muted">Email</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md p-3 bg-transparent border border-slate-700"
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm text-muted">Message</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="6"
                  className="mt-1 w-full rounded-md p-3 bg-transparent border border-slate-700"
                  placeholder="Write a short message..."
                  required
                />
              </label>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary px-4 py-2 rounded-xl"
                >
                  {sending ? "Sending…" : "Send message"}
                </button>

                <a href={`mailto:${ME.email}`} className="text-sm underline text-sky-300">Or email me directly</a>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <p className="font-semibold text-green-500">Thanks — your message was sent.</p>
              <p className="text-sm text-muted mt-2">I'll reply as soon as I can.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
