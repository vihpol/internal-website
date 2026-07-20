import DepartmentPortal from "../components/DepartmentPortal";

export default function SalesPage() {
  return <DepartmentPortal data={{
    name: "Sales", eyebrow: "Revenue Team", icon: "📈", accent: "#229b63", soft: "#dcfce7",
    welcome: "Customer, pipeline, pricing, and enablement resources for the MICAS sales organization.",
    highlights: [
      { label: "Open opportunities", value: "34", note: "Across all regions" },
      { label: "Closing this month", value: "9", note: "4 currently committed" },
      { label: "New leads", value: "18", note: "Received this week" },
    ],
    tools: [
      { icon: "🤝", title: "CRM", description: "Accounts, opportunities, and activities" },
      { icon: "💵", title: "Pricing & quotes", description: "Price lists, deal desk, and quoting" },
      { icon: "🎯", title: "Sales enablement", description: "Pitch decks, battlecards, and training" },
      { icon: "🏆", title: "Customer stories", description: "Approved references and success stories" },
    ],
    updates: [
      { title: "Q3 pricing guide published", meta: "Revenue Operations · Today" },
      { title: "Enterprise pitch deck refreshed", meta: "Sales Enablement · Yesterday" },
      { title: "Partner registration process updated", meta: "Channel Sales · July 15" },
    ],
    libraries: [
      { icon: "📁", title: "Customer Visit", description: "Customer visit materials", items: 1, href: "https://netorgft13495013.sharepoint.com/sites/micas-engineering/Shared%20Documents/Customer%20Visit" },
      { icon: "📁", title: "From Customer", description: "Customer-provided engineering files", items: 1, href: "https://netorgft13495013.sharepoint.com/sites/micas-engineering/Shared%20Documents/From%20Customer" },
      { icon: "📁", title: "PLM & PreSales", description: "Customer-specific workspaces", items: 36, href: "https://netorgft13495013.sharepoint.com/sites/micas-engineering/Shared%20Documents/PLM%20%26%20Presales" },
    ],
    documents: [
      { type: "PowerPoint", title: "Introduction to Nokia", modified: "Aug 15", owner: "Micas Engineering", href: "https://netorgft13495013.sharepoint.com/sites/micas-engineering/_layouts/15/Doc.aspx?sourcedoc=%7B8C1CD6F9-A06B-4D2A-890F-7313CF03DCF3%7D&file=Introduction%20to%20Nokia.pptx&action=default&mobileredirect=true" },
      { type: "PowerPoint", title: "MICAS Enterprise Pitch Deck", modified: "Yesterday", owner: "Sales Enablement" },
      { type: "Word", title: "Customer Quote Template", modified: "Jul 16", owner: "Deal Desk" },
      { type: "PDF", title: "Customer Success Stories", modified: "Jul 10", owner: "Marketing" },
    ],
  }} />;
}
