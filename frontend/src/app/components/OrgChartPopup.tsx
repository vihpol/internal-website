"use client";

import { useEffect, useState } from "react";

export default function OrgChartPopup({ showLauncher = true }: { showLauncher?: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openFromPortal = () => setOpen(true);
    window.addEventListener("micas:open-org-chart", openFromPortal);
    return () => window.removeEventListener("micas:open-org-chart", openFromPortal);
  }, []);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <>
      {showLauncher ? <button
        className="org-chart-launcher"
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open MICAS organization chart"
        aria-expanded={open}
      >
        <span aria-hidden="true">👥</span>
        <strong>Org Chart</strong>
      </button> : null}

      {open ? (
        <div className="org-chart-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <section
            className="org-chart-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="org-chart-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header>
              <div>
                <p>MICAS Networks</p>
                <h2 id="org-chart-title">Organization Chart</h2>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close organization chart">×</button>
            </header>
            <div className="org-chart-canvas">
              <img src="/micas-org-chart.png" alt="MICAS Networks organization chart" />
            </div>
            <footer>Scroll horizontally to view the complete chart.</footer>
          </section>
        </div>
      ) : null}
    </>
  );
}
