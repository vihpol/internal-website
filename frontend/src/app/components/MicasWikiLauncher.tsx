"use client";

import { useEffect, useState } from "react";

const MICAS_WIKI_URL = "https://teams.microsoft.com/l/app/?titleId=T_5ae6c664-e690-f03f-461b-2e3c4d4ffed1";

export default function MicasWikiLauncher() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      {open ? (
        <section className="wiki-popover" role="dialog" aria-labelledby="wiki-title">
          <header>
            <span className="wiki-popover-mark" aria-hidden="true">AI</span>
            <div>
              <p>MICAS KNOWLEDGE ASSISTANT</p>
              <h2 id="wiki-title">MICAS Wiki</h2>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close MICAS Wiki popup">×</button>
          </header>
          <p className="wiki-popover-copy">Ask questions about MICAS internal documentation through Microsoft Teams.</p>
          <a href={MICAS_WIKI_URL} target="_blank" rel="noreferrer">
            Open in Microsoft Teams <span aria-hidden="true">↗</span>
          </a>
          <small>Microsoft sign-in may be required.</small>
        </section>
      ) : null}
      <button
        className={`wiki-launcher ${open ? "is-open" : ""}`}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close MICAS Wiki" : "Open MICAS Wiki"}
        aria-expanded={open}
      >
        <span aria-hidden="true">AI</span>
      </button>
    </>
  );
}
