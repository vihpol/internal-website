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
  }} />;
}
