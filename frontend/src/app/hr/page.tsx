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
      { icon: "📁", title: "Policies & Handbooks", description: "Workplace policies and employee guidance", items: 18 },
      { icon: "📁", title: "Benefits", description: "Plans, enrollment, and wellness resources", items: 12 },
      { icon: "📁", title: "Forms & Templates", description: "HR requests and standard forms", items: 9 },
    ],
    documents: [
      { type: "PDF", title: "MICAS Employee Handbook 2026", modified: "Today", owner: "People Operations" },
      { type: "Word", title: "Paid Time Off Policy", modified: "Jul 18", owner: "HR Team" },
      { type: "Excel", title: "2026 Holiday Calendar", modified: "Jul 12", owner: "People Operations" },
      { type: "PowerPoint", title: "New Hire Orientation", modified: "Jul 8", owner: "HR Team" },
    ],
  }} />;
}
