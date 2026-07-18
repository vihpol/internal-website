import Link from "next/link";

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
};

const navigation = [
  { name: "HR", href: "/hr", icon: "👥", tone: "hr", description: "People and workplace" },
  { name: "PreSales", href: "/presales", icon: "💡", tone: "presales", description: "Solutions and technical sales" },
  { name: "Sales", href: "/sales", icon: "📈", tone: "sales", description: "Customers and revenue" },
  { name: "Operations", href: "/operations", icon: "⚙️", tone: "ops", description: "Systems and operations" },
  { name: "Scanner", href: "http://192.168.1.185:5173/", icon: "📦", tone: "scanner", description: "Inventory and barcode scanning", external: true },
  { name: "Scan Station", href: "http://192.168.1.185:3000/", icon: "📷", tone: "scanstation", description: "Capture switch labels", external: true },
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

          <section className="department-highlights" aria-label={`${data.name} highlights`}>
            {data.highlights.map((item) => (
              <article key={item.label}>
                <p>{item.label}</p><strong>{item.value}</strong><small>{item.note}</small>
              </article>
            ))}
          </section>

          <div className="department-grid">
            <section>
              <div className="department-section-heading"><span /> <h2>{data.name} tools</h2></div>
              <div className="department-tools">
                {data.tools.map((tool) => (
                  <button key={tool.title} type="button">
                    <span aria-hidden="true">{tool.icon}</span>
                    <span><strong>{tool.title}</strong><small>{tool.description}</small></span>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <div className="department-section-heading"><span /> <h2>Latest updates</h2></div>
              <div className="department-updates">
                {data.updates.map((update) => (
                  <article key={update.title}><strong>{update.title}</strong><small>{update.meta}</small></article>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
