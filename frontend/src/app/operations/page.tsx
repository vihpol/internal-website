import DepartmentPortal from "../components/DepartmentPortal";

export default function OperationsPage() {
  return <DepartmentPortal data={{
    name: "Operations", eyebrow: "Business Operations", icon: "⚙️", accent: "#7355c6", soft: "#ede9fe",
    welcome: "Systems, inventory, facilities, shipping, and service resources that keep MICAS running smoothly.",
    highlights: [
      { label: "Open requests", value: "17", note: "6 assigned today" },
      { label: "Systems online", value: "11/12", note: "One maintenance window" },
      { label: "Today's shipments", value: "24", note: "All currently on schedule" },
    ],
    tools: [
      { icon: "🎫", title: "Service requests", description: "IT, facilities, and operations support" },
      { icon: "📦", title: "Inventory", description: "Equipment, assets, and stock status" },
      { icon: "🚚", title: "Shipping & logistics", description: "Shipments, returns, and receiving" },
      { icon: "🟢", title: "Systems status", description: "Service health and maintenance notices" },
    ],
    updates: [
      { title: "Warehouse receiving hours updated", meta: "Facilities · Today" },
      { title: "ERP maintenance scheduled Saturday", meta: "IT Operations · Yesterday" },
      { title: "Equipment return process updated", meta: "Business Operations · July 15" },
    ],
    libraries: [
      { icon: "📁", title: "IT Related", description: "Engineering IT planning documents", items: 1, href: "https://netorgft13495013.sharepoint.com/sites/micas-engineering/Shared%20Documents/IT%20related" },
      { icon: "📁", title: "San Jose HQ Lab", description: "Lab operations and resources", items: 5, href: "https://netorgft13495013.sharepoint.com/sites/micas-engineering/Shared%20Documents/San%20Jose%20HQ%20Lab" },
      { icon: "📁", title: "Technical Support", description: "Technical support workspace", items: 0, href: "https://netorgft13495013.sharepoint.com/sites/micas-engineering/Shared%20Documents/Technical%20Support" },
    ],
    documents: [
      { type: "Word", title: "IT Plan", modified: "Dec 11", owner: "Micas Engineering", href: "https://netorgft13495013.sharepoint.com/sites/micas-engineering/_layouts/15/Doc.aspx?sourcedoc=%7BE88471A3-B4F2-4BD0-A3B5-7C6FB8E97C27%7D&file=IT%20plan.docx&action=default&mobileredirect=true" },
      { type: "Excel", title: "Network Equipment Inventory", modified: "Today", owner: "Operations" },
      { type: "PDF", title: "Equipment Return Process", modified: "Jul 15", owner: "Business Operations" },
      { type: "PowerPoint", title: "Operations Safety Training", modified: "Jul 9", owner: "Facilities" },
    ],
  }} />;
}
