import Link from "next/link";
import OrgChartPopup from "./OrgChartPopup";
import MicasWikiLauncher from "./MicasWikiLauncher";

export type PortalData = {
  name: string;
  eyebrow: string;
  welcome: string;
  accent: string;
  soft: string;
  icon: string;
  highlights: { label: string; value: string; note: string }[];
  tools: { icon: string; title: string; description: string }[];
  updates: { title: string; meta: string }[];
  libraries: { icon: string; title: string; description: string; items: number; href?: string }[];
  documents: { type: "Word" | "Excel" | "PowerPoint" | "PDF"; title: string; modified: string; owner: string; href?: string }[];
  mock?: boolean;
};

const navigation = [
  { name: "HR", href: "https://netorgft13495013.sharepoint.com/sites/MICASHR", icon: "HR", tone: "hr", description: "Department SharePoint" },
  { name: "Engineering", href: "https://netorgft13495013.sharepoint.com/sites/MICASEngineeringMock", icon: "EN", tone: "presales", description: "Department SharePoint" },
  { name: "Sales", href: "https://netorgft13495013.sharepoint.com/sites/MICASSales", icon: "SA", tone: "sales", description: "Department SharePoint" },
  { name: "Operations", href: "https://netorgft13495013.sharepoint.com/sites/MICASOperations", icon: "OP", tone: "ops", description: "Department SharePoint" },
  { name: "Scan Station", href: "http://192.168.1.185:3000/", icon: "SS", tone: "scanstation", description: "Equipment capture tool", external: true },
];

export default function DepartmentPortal({ data }: { data: PortalData }) {
  return (
    <main className="portal-page department-page" style={{ "--department-accent": data.accent, "--department-soft": data.soft } as React.CSSProperties}>
      <header className="portal-topbar">
        <a className="portal-brand" href="/" aria-label="MICAS portal home">
          <span className="portal-brand-mark" aria-hidden="true"><img src="/micas-networks-logo-clean.png" alt="" /></span>
        </a>
        <a className="department-search-link" href="/">⌕&nbsp;&nbsp;Web Search</a>
      </header>

      <div className="portal-shell">
        <aside className="portal-sidebar">
          <p className="portal-sidebar-label">Departments</p>
          <nav className="portal-departments" aria-label="Departments">
            {navigation.map((item) => {
              const active = item.name === data.name;
              return (
                <Link className={`portal-department ${active ? "is-active" : ""}`} href={item.href} key={item.name} aria-current={active ? "page" : undefined} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined}>
                  <span className={`portal-department-icon ${item.tone}`} aria-hidden="true">{item.icon}</span>
                  <span><strong>{item.name}{item.external ? <span className="external-mark" aria-label="opens in a new tab">↗</span> : null}</strong><small>{item.description}</small></span>
                </Link>
              );
            })}
          </nav>
          <a className="department-back-home" href="/">← Back to web search</a>
        </aside>

        <section className="department-content">
          <header className="department-hero">
            <div>
              <p>{data.eyebrow}</p>
              <h1><span aria-hidden="true">{data.icon}</span>{data.name} Portal</h1>
              <div className="department-accent-line" />
              <p className="department-welcome">{data.welcome}</p>
            </div>
            <span className="department-page-badge">{data.name}</span>
          </header>

          <section className="sharepoint-toolbar" aria-label="Document library controls">
            <div><span className="sharepoint-grid-mark" aria-hidden="true">▦</span><div><strong>{data.name} SharePoint</strong><small>{data.mock ? "Mock department site" : "Department document center"}</small></div></div>
            <span className="sharepoint-access">{data.mock ? "◆ Mock site" : `🔒 ${data.name} access`}</span>
          </section>

          <section className="sharepoint-libraries" aria-label={`${data.name} document libraries`}>
            <div className="department-section-heading"><span /> <h2>Document libraries</h2></div>
            <div className="sharepoint-library-grid">
              {data.libraries.map((library) => (
                <a href={library.href ?? "#"} key={library.title}>
                  <span className="sharepoint-folder" aria-hidden="true">{library.icon}</span>
                  <span><strong>{library.title}</strong><small>{library.description}</small><em>{library.items} items</em></span>
                  <b aria-hidden="true">›</b>
                </a>
              ))}
            </div>
          </section>

          <section className="sharepoint-recent" aria-label="Recent documents">
            <div className="sharepoint-list-heading"><div className="department-section-heading"><span /> <h2>Recent documents</h2></div><button type="button">View all</button></div>
            <div className="sharepoint-table" role="table" aria-label={`${data.name} recent documents`}>
              <div className="sharepoint-row sharepoint-row-head" role="row"><span>Name</span><span>Modified</span><span>Owner</span></div>
              {data.documents.map((document) => (
                <a className="sharepoint-row" href={document.href ?? "#"} role="row" key={document.title}>
                  <span className="sharepoint-file"><i className={`file-${document.type.toLowerCase()}`}>{document.type.charAt(0)}</i><span><strong>{document.title}</strong><small>{document.type} document</small></span></span>
                  <span>{document.modified}</span><span>{document.owner}</span>
                </a>
              ))}
            </div>
            <p className="sharepoint-notice">{data.mock ? "◆ Demonstration content only. This mock site is ready to be connected to the department’s real SharePoint URL later." : "🔐 Opens in Microsoft SharePoint. Employees will be asked to sign in when needed, and existing permissions determine access."}</p>
          </section>
        </section>
      </div>
      <OrgChartPopup />
      <MicasWikiLauncher />
    </main>
  );
}
