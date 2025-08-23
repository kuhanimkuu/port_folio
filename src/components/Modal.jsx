import { useEffect, useRef } from "react";

export default function Modal({ open, onClose, project, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!dialogRef.current) return;
    if (open) {
      try { dialogRef.current.showModal(); } catch {dialogRef.current.setAttribute("open", ""); }
      
      const first = dialogRef.current.querySelector("a, button, input, [tabindex]");
      if (first) first.focus();
    } else {
      try { dialogRef.current.close(); } catch { dialogRef.current.removeAttribute("open"); }
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!project) return null;

  return (
    <dialog ref={dialogRef} className="rounded-2xl p-0">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-[min(780px,92vw)]">
        {children}
        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border">Close</button>
        </div>
      </div>
    </dialog>
  );
}
