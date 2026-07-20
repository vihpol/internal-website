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
    libraries: [
      { icon: "📁", title: "PLM & PreSales", description: "Customer and presales workspaces", items: 36, href: "https://netorgft13495013.sharepoint.com/sites/micas-engineering/Shared%20Documents/PLM%20%26%20Presales" },
      { icon: "📁", title: "Product Documents", description: "Engineering product documents", items: 10, href: "https://netorgft13495013.sharepoint.com/sites/micas-engineering/Shared%20Documents/Product%20Documents-ES" },
      { icon: "📁", title: "PoC", description: "Proof-of-concept resources", items: 1, href: "https://netorgft13495013.sharepoint.com/sites/micas-engineering/Shared%20Documents/PoC" },
    ],
    documents: [
      { type: "Excel", title: "Cloudflare Network Hardware Specification", modified: "Dec 17", owner: "PLM & PreSales", href: "https://netorgft13495013.sharepoint.com/sites/micas-engineering/_layouts/15/Doc.aspx?sourcedoc=%7B83AC6D7A-312B-4DB4-95E2-E34A1AF4969F%7D&file=CF_Network_Hardware_Spec_11_19_2025%20-%20Micasfeedback_1210update.xlsx&action=default&mobileredirect=true" },
      { type: "Excel", title: "SONiC Compatibility Matrix", modified: "Yesterday", owner: "Product Engineering" },
      { type: "PowerPoint", title: "Data Center Fabric Demo", modified: "Jul 17", owner: "Demo Center" },
      { type: "Word", title: "RFP Technical Response Template", modified: "Jul 11", owner: "PreSales" },
    ],
  }} />;
}
