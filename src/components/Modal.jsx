import { useEffect } from "react";

export default function Modal({ open, onClose, children, ariaLabel = "Dialog" }) {
  useEffect(() => {
    if (!open) return;

    // prevent background scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  function onBackdropClick(e) {
    if (e.target === e.currentTarget) onClose?.();
  }

  return (
    <div
      role="dialog"
      aria-label={ariaLabel}
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Dialog */}
      <div className="relative max-w-3xl w-full mx-auto">
        <div
          className="relative rounded-2xl p-6 border border-theme bg-theme shadow-lg"
          style={{ zIndex: 10 }}
        >
          {/* Content slot */}
          <div className="max-h-[70vh] overflow-auto">
            {children}
          </div>

          {/* Footer with Close button */}
          <div className="mt-6 flex justify-end">
            {/* Theme-aware Close button */}
            <button
              onClick={onClose}
              className="
                px-4 py-2 rounded-xl font-medium
                bg-gray-200 text-gray-800 hover:bg-gray-300
                dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700
                transition-colors
                border border-theme
              "
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
