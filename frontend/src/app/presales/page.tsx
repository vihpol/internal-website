import DepartmentPortal from "../components/DepartmentPortal";

export default function PreSalesPage() {
  return <DepartmentPortal data={{
    name: "PreSales", eyebrow: "Solutions Engineering", icon: "💡", accent: "#d79418", soft: "#fef3c7",
    welcome: "Technical resources for designing, validating, demonstrating, and presenting MICAS networking solutions.",
    highlights: [
      { label: "Active evaluations", value: "12", note: "Across 8 accounts" },
      { label: "Demo environments", value: "4", note: "3 currently available" },
      { label: "Design reviews", value: "5", note: "Scheduled this week" },
    ],
    tools: [
      { icon: "🧩", title: "Solution library", description: "Architectures and validated designs" },
      { icon: "🖥️", title: "Demo center", description: "Environments, scripts, and demo requests" },
      { icon: "📚", title: "Technical documentation", description: "Datasheets, guides, and matrices" },
      { icon: "📝", title: "RFP workspace", description: "Templates and approved technical responses" },
    ],
    updates: [
      { title: "New 800G reference architecture", meta: "Solutions Engineering · Today" },
      { title: "SONiC compatibility matrix updated", meta: "Product Engineering · Yesterday" },
      { title: "Customer demonstration checklist v2", meta: "Demo Center · July 14" },
    ],
  }} />;
}
