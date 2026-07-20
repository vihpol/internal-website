"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import OrgChartPopup from "./components/OrgChartPopup";
import MicasWikiLauncher from "./components/MicasWikiLauncher";

type SearchResult = { title: string; url: string; content: string; engine: string | null };
type SearchResponse = { query: string; results: SearchResult[]; suggestions: string[] };

const departments = [
  { name: "HR", href: "https://netorgft13495013.sharepoint.com/sites/MICASHR", icon: "👥", tone: "hr", description: "Open HR SharePoint" },
  { name: "Engineering", href: "https://netorgft13495013.sharepoint.com/sites/MICASEngineeringMock", icon: "💡", tone: "presales", description: "Open Engineering SharePoint" },
  { name: "Sales", href: "https://netorgft13495013.sharepoint.com/sites/MICASSales", icon: "📈", tone: "sales", description: "Open Sales SharePoint" },
  { name: "Operations", href: "https://netorgft13495013.sharepoint.com/sites/MICASOperations", icon: "⚙️", tone: "ops", description: "Open Operations SharePoint" },
  { name: "Scan Station", href: "http://192.168.1.185:3000/", icon: "📷", tone: "scanstation", description: "Capture switch labels", external: true },
];

const suggestions = ["800G deployment guide", "Transceiver comparison", "PTO policy", "Expense reports", "Vendor price list"];

const quickAccess = [
  { icon: "📄", status: "Recent", title: "Fiber Optics Training Deck", meta: "PreSales · updated 2d ago" },
  { icon: "📦", status: "Popular", title: "MICAS Inventory Tool", meta: "Operations · daily use" },
  { icon: "🧾", status: "Updated", title: "Q3 Customer Quote Templates", meta: "Sales · updated 1w ago" },
];

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchedQuery, setSearchedQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/health").then((response) => setConnected(response.ok)).catch(() => setConnected(false));
    const focusSearch = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  async function runSearch(searchQuery: string) {
    const normalized = searchQuery.trim();
    if (!normalized) return;
    setQuery(normalized);
    setLoading(true);
    setError("");
    setSearchedQuery(normalized);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(normalized)}`);
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.detail || "Search could not be completed.");
      setResults((payload as SearchResponse).results);
    } catch (searchError) {
      setResults([]);
      setError(searchError instanceof Error ? searchError.message : "Search could not be completed.");
    } finally {
      setLoading(false);
    }
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void runSearch(query);
  }

  return (
    <main className="portal-page">
      <header className="portal-topbar">
        <a className="portal-brand" href="/" aria-label="MICAS portal home">
          <span className="portal-brand-mark" aria-hidden="true"><img src="/micas-networks-logo-clean.png" alt="" /></span>
        </a>
        <div className="portal-topbar-actions">
          <span className="portal-status"><span className={`portal-status-dot ${connected ? "is-online" : ""}`} />{connected ? "Online" : "Connecting"}</span>
        </div>
      </header>

      <div className="portal-shell">
        <aside className="portal-sidebar">
          <p className="portal-sidebar-label">Departments</p>
          <nav className="portal-departments" aria-label="Departments">
            {departments.map((department) => (
              <Link className="portal-department" href={department.href} key={department.name} target={department.external ? "_blank" : undefined} rel={department.external ? "noreferrer" : undefined}>
                <span className={`portal-department-icon ${department.tone}`} aria-hidden="true">{department.icon}</span>
                <span><strong>{department.name}{department.external ? <span className="external-mark" aria-label="opens in a new tab">↗</span> : null}</strong><small>{department.description}</small></span>
              </Link>
            ))}
          </nav>
          <div className="portal-sidebar-footer"><p><span>Search provider</span><strong>● SearXNG</strong></p><p><span>Departments</span><strong>4 connected</strong></p></div>
        </aside>

        <section className="portal-content">
          <div className="portal-fiber-lines" aria-hidden="true" />
          <div className={`portal-hero ${searchedQuery ? "has-results" : ""}`}>
            <p className="portal-eyebrow"><span />MICAS Web Search</p>
            <h1>What are you looking for?</h1>
            <p className="portal-description">Search the internet from one MICAS-branded portal, powered by SearXNG.</p>

            <form className="searx-search-form" onSubmit={submitSearch} role="search">
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the web with SearXNG…" aria-label="Search the web" />
              <span className="searx-kbd">⌘K</span>
              <button type="submit" disabled={loading || !query.trim()}>{loading ? "Searching…" : "Search"}</button>
            </form>
            <p className="portal-powered">Private metasearch powered by SearXNG</p>

            {!searchedQuery ? (
              <div className="portal-tags" aria-label="Suggested searches">
                {suggestions.map((suggestion) => <button type="button" onClick={() => void runSearch(suggestion)} key={suggestion}>{suggestion}</button>)}
              </div>
            ) : null}
          </div>

          {searchedQuery ? (
            <section className="searx-results" aria-live="polite" aria-busy={loading}>
              <div className="searx-results-heading">
                <div><p>Web results</p><h2>{loading ? "Searching…" : `Results for “${searchedQuery}”`}</h2></div>
                {!loading && !error ? <span>{results.length} results</span> : null}
              </div>
              {error ? <div className="searx-message is-error"><strong>Search unavailable</strong><p>{error}</p></div> : null}
              {!loading && !error && results.length === 0 ? <div className="searx-message"><strong>No results found</strong><p>Try a shorter or more general search.</p></div> : null}
              <div className="searx-result-list">
                {results.map((result) => (
                  <article className="searx-result" key={`${result.url}-${result.title}`}>
                    <a href={result.url} target="_blank" rel="noreferrer"><h3>{result.title}</h3></a>
                    <p className="searx-result-url">{result.url}</p>
                    {result.content ? <p className="searx-result-content">{result.content}</p> : null}
                    {result.engine ? <span>{result.engine}</span> : null}
                  </article>
                ))}
              </div>
            </section>
          ) : (
            <div className="portal-quick-access" aria-label="Quick access">
              {quickAccess.map((item) => <article className="portal-quick-card" key={item.title}><div><span className="portal-quick-icon" aria-hidden="true">{item.icon}</span><span className="portal-quick-status">{item.status}</span></div><strong>{item.title}</strong><small>{item.meta}</small></article>)}
            </div>
          )}
        </section>
      </div>
      <OrgChartPopup />
      <MicasWikiLauncher />
    </main>
  );
}
