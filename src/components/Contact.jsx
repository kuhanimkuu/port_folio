import { useState } from "react";
import ME from "../data/me.js";

const ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/mrblnnol";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

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
    setStatusMessage("");

    try {
      const payload = {
        name: form.name,
        email: form.email,
        message: form.message,
        _subject: `Portfolio message from ${form.name}`,
      };

      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data = {};
      try { data = await res.json(); } catch (err) { /* ignore parse errors */ }

      if (!res.ok) {
        const reason = (data && data.error) ? data.error : `Server returned ${res.status}`;
        throw new Error(reason);
      }

      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setStatusMessage("Thanks — your message was sent.");
    } catch (err) {
      console.error("Contact form error:", err);
      setError("Failed to send message. You can also email me directly.");
      setStatusMessage("Failed to send message.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-theme">Contact</h2>

        <div className="mt-4 bg-theme border border-theme rounded-2xl p-6">
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <label className="block">
                <span className="text-sm muted">Name</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md p-3 border border-theme bg-theme text-theme placeholder:muted"
                  placeholder="Your name"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm muted">Email</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md p-3 border border-theme bg-theme text-theme placeholder:muted"
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm muted">Message</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="6"
                  className="mt-1 w-full rounded-md p-3 border border-theme bg-theme text-theme placeholder:muted"
                  placeholder="Write a short message..."
                  required
                />
              </label>

              {error && <p className="text-sm text-red-400" role="alert">{error}</p>}

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary px-4 py-2 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  {sending ? "Sending…" : "Send message"}
                </button>

                <a href={`mailto:${ME.email}`} className="text-sm link-accent underline">Or email me directly</a>
              </div>

              <p aria-live="polite" className="mt-2 muted">{statusMessage}</p>
            </form>
          ) : (
            <div className="text-center">
              <p className="font-semibold text-[var(--accent)]">Thanks — your message was sent.</p>
              <p className="text-sm muted mt-2">I'll reply as soon as I can.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
