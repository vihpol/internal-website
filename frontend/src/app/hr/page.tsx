import DepartmentPortal from "../components/DepartmentPortal";

export default function HRPage() {
  return <DepartmentPortal data={{
    name: "HR", eyebrow: "People & Culture", icon: "👥", accent: "#d85b67", soft: "#fee2e2",
    welcome: "Your home for employee resources, benefits, time off, policies, learning, and company culture.",
    highlights: [
      { label: "Time-off balance", value: "14 days", note: "Available this year" },
      { label: "Company holidays", value: "4", note: "Remaining in 2026" },
      { label: "Required learning", value: "2", note: "Courses due this month" },
    ],
    tools: [
      { icon: "🏥", title: "Benefits", description: "Health plans, coverage, and enrollment" },
      { icon: "🌴", title: "Time off", description: "Request PTO and see company holidays" },
      { icon: "📘", title: "Employee handbook", description: "Policies, guidance, and workplace standards" },
      { icon: "🎓", title: "Learning center", description: "Training, certifications, and development" },
    ],
    updates: [
      { title: "Benefits enrollment begins next week", meta: "People Operations · Today" },
      { title: "July company all-hands agenda", meta: "Internal Communications · Yesterday" },
      { title: "New manager learning series", meta: "Learning & Development · July 15" },
    ],
    libraries: [
      { icon: "📁", title: "Factory Policy", description: "Engineering factory policies", items: 3, href: "https://netorgft13495013.sharepoint.com/sites/micas-engineering/Shared%20Documents/Factory%20policy" },
      { icon: "📁", title: "General", description: "General engineering documents", items: 2, href: "https://netorgft13495013.sharepoint.com/sites/micas-engineering/Shared%20Documents/General" },
      { icon: "📁", title: "Engineering Documents", description: "Open the complete document library", items: 28, href: "https://netorgft13495013.sharepoint.com/sites/micas-engineering/Shared%20Documents" },
    ],
    documents: [
      { type: "PowerPoint", title: "Pre-Installed Software for Shipment", modified: "Apr 7", owner: "Micas Engineering", href: "https://netorgft13495013.sharepoint.com/sites/micas-engineering/_layouts/15/Doc.aspx?sourcedoc=%7B9549D8A5-5307-4333-B413-D0CCBAEEC418%7D&file=Pre-Installed%20Software%20for%20Shipment%20of%20Micas%20Networks%20Full%20Series%20Whitebox%20Products.pptx&action=default&mobileredirect=true" },
      { type: "Word", title: "Paid Time Off Policy", modified: "Jul 18", owner: "HR Team" },
      { type: "Excel", title: "2026 Holiday Calendar", modified: "Jul 12", owner: "People Operations" },
      { type: "PowerPoint", title: "New Hire Orientation", modified: "Jul 8", owner: "HR Team" },
    ],
  }} />;
}
