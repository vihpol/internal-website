"use client";

import {
  AccountInfo,
  InteractionRequiredAuthError,
  PublicClientApplication,
} from "@azure/msal-browser";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { recordAnalytics } from "../lib/analytics";

type MicrosoftSearchResult = {
  title: string;
  url: string;
  summary: string;
  fileType: string;
  location: string;
  modifiedBy: string;
  modifiedAt: string;
};

type Props = {
  onReturnToWeb: () => void;
};

const tenantId = process.env.NEXT_PUBLIC_MICROSOFT_TENANT_ID || "cd3cf671-aff3-46a2-8cf4-3fc771ae270e";
const clientId = process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID || "";
const graphScopes = ["User.Read", "Files.Read.All", "Sites.Read.All"];

function getLocation(resource: Record<string, any>) {
  const parent = resource.parentReference;
  if (typeof parent?.sharepointIds?.siteUrl === "string") return parent.sharepointIds.siteUrl;
  if (typeof resource.webUrl === "string") {
    try {
      return new URL(resource.webUrl).hostname;
    } catch {
      return "Microsoft 365";
    }
  }
  return "Microsoft 365";
}

export default function MicrosoftSearch({ onReturnToWeb }: Props) {
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [query, setQuery] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [results, setResults] = useState<MicrosoftSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const msal = useMemo(() => {
    if (!clientId || typeof window === "undefined") return null;
    return new PublicClientApplication({
      auth: {
        clientId,
        authority: `https://login.microsoftonline.com/${tenantId}`,
        redirectUri: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
      },
      cache: { cacheLocation: "sessionStorage" },
    });
  }, []);

  useEffect(() => {
    if (!msal) return;
    void msal.initialize().then(async () => {
      const response = await msal.handleRedirectPromise();
      const active = response?.account || msal.getActiveAccount() || msal.getAllAccounts()[0] || null;
      if (active) msal.setActiveAccount(active);
      setAccount(active);
    }).catch(() => setError("Microsoft sign-in could not be initialized."));
  }, [msal]);

  async function signIn() {
    if (!msal) return;
    setError("");
    try {
      const response = await msal.loginPopup({ scopes: graphScopes, prompt: "select_account" });
      msal.setActiveAccount(response.account);
      setAccount(response.account);
      inputRef.current?.focus();
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Microsoft sign-in was cancelled.");
    }
  }

  async function signOut() {
    if (!msal || !account) return;
    await msal.logoutPopup({ account, postLogoutRedirectUri: window.location.origin });
    setAccount(null);
    setResults([]);
    setSearchedQuery("");
  }

  async function getAccessToken() {
    if (!msal || !account) throw new Error("Sign in with your MICAS account first.");
    try {
      return (await msal.acquireTokenSilent({ account, scopes: graphScopes })).accessToken;
    } catch (tokenError) {
      if (tokenError instanceof InteractionRequiredAuthError) {
        return (await msal.acquireTokenPopup({ account, scopes: graphScopes })).accessToken;
      }
      throw tokenError;
    }
  }

  async function runSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = query.trim();
    if (!normalized || !account) return;
    setLoading(true);
    setError("");
    setSearchedQuery(normalized);
    try {
      const accessToken = await getAccessToken();
      const response = await fetch("https://graph.microsoft.com/v1.0/search/query", {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          requests: [{
            entityTypes: ["driveItem"],
            query: { queryString: normalized },
            from: 0,
            size: 25,
            fields: ["name", "webUrl", "file", "folder", "parentReference", "lastModifiedDateTime", "lastModifiedBy"],
          }],
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.error?.message || "MICAS document search could not be completed.");
      const hits = payload?.value?.[0]?.hitsContainers?.flatMap((container: any) => container.hits || []) || [];
      setResults(hits.map((hit: any) => {
        const resource = hit.resource || {};
        return {
          title: resource.name || hit.name || "Untitled document",
          url: resource.webUrl || "#",
          summary: typeof hit.summary === "string" ? hit.summary.replace(/<[^>]*>/g, "") : "",
          fileType: resource.file?.mimeType?.split("/").pop() || (resource.folder ? "Folder" : "Document"),
          location: getLocation(resource),
          modifiedBy: resource.lastModifiedBy?.user?.displayName || "MICAS",
          modifiedAt: resource.lastModifiedDateTime || "",
        };
      }));
    } catch (searchError) {
      setResults([]);
      setError(searchError instanceof Error ? searchError.message : "MICAS document search could not be completed.");
      recordAnalytics("microsoft_search_failure", "microsoft-graph");
    } finally {
      setLoading(false);
    }
  }

  if (!clientId) {
    return (
      <section className="microsoft-search-setup" aria-labelledby="microsoft-search-title">
        <span className="microsoft-search-logo" aria-hidden="true"><i /><i /><i /><i /></span>
        <p className="portal-eyebrow"><span />MICAS document search</p>
        <h1 id="microsoft-search-title">Connect Microsoft 365</h1>
        <p>One administrator step remains before employees can search the SharePoint documents they already have permission to view.</p>
        <div className="microsoft-setup-note">
          <strong>App registration required</strong>
          <span>Add the Microsoft Entra application client ID to the portal configuration. No client secret is used or stored in the website.</span>
        </div>
        <button className="microsoft-secondary-button" type="button" onClick={onReturnToWeb}>Return to web search</button>
      </section>
    );
  }

  if (!account) {
    return (
      <section className="microsoft-search-signin" aria-labelledby="microsoft-search-title">
        <span className="microsoft-search-logo" aria-hidden="true"><i /><i /><i /><i /></span>
        <p className="portal-eyebrow"><span />MICAS document search</p>
        <h1 id="microsoft-search-title">Search what you can access</h1>
        <p>Sign in with your MICAS Microsoft 365 account. Results automatically follow your existing SharePoint and OneDrive permissions.</p>
        <button className="microsoft-signin-button" type="button" onClick={() => void signIn()}><span aria-hidden="true">M</span>Sign in with Microsoft</button>
        {error ? <p className="microsoft-auth-error" role="alert">{error}</p> : null}
        <small>Your password and Microsoft access token are never sent to the MICAS portal server.</small>
      </section>
    );
  }

  return (
    <div className="microsoft-search-view">
      <div className="microsoft-account-bar">
        <span><strong>{account.name || "MICAS employee"}</strong><small>{account.username}</small></span>
        <button type="button" onClick={() => void signOut()}>Sign out</button>
      </div>
      <section className={`portal-hero microsoft-hero ${searchedQuery ? "has-results" : ""}`}>
        <p className="portal-eyebrow"><span />MICAS document search</p>
        <h1>Find a MICAS document</h1>
        <p className="portal-description">Search SharePoint and OneDrive. You will only see content your Microsoft account can access.</p>
        <form className="searx-search-form" onSubmit={runSearch} role="search">
          <span aria-hidden="true">⌕</span>
          <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search policies, specifications, presentations…" aria-label="Search MICAS documents" />
          <button type="submit" disabled={loading || !query.trim()}>{loading ? "Searching…" : "Search"}</button>
        </form>
      </section>
      {searchedQuery ? (
        <section className="searx-results microsoft-results" aria-live="polite" aria-busy={loading}>
          <div className="searx-results-heading"><div><p>Microsoft 365 results</p><h2>{loading ? "Searching…" : `Results for “${searchedQuery}”`}</h2></div>{!loading && !error ? <span>{results.length} results</span> : null}</div>
          {error ? <div className="searx-message is-error"><strong>Search unavailable</strong><p>{error}</p></div> : null}
          {!loading && !error && results.length === 0 ? <div className="searx-message"><strong>No accessible results</strong><p>Try another phrase, or confirm that the document has been shared with your account.</p></div> : null}
          <div className="searx-result-list">
            {results.map((result) => <article className="searx-result microsoft-result" key={result.url}><a href={result.url} target="_blank" rel="noreferrer"><h3>{result.title}</h3></a><p className="searx-result-url">{result.location}</p>{result.summary ? <p className="searx-result-content">{result.summary}</p> : null}<div><span>{result.fileType}</span><small>{result.modifiedAt ? `Modified ${new Date(result.modifiedAt).toLocaleDateString()} by ${result.modifiedBy}` : "MICAS SharePoint"}</small></div></article>)}
          </div>
        </section>
      ) : null}
    </div>
  );
}
