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
      { icon: "📁", title: "Standard Procedures", description: "Approved operating procedures", items: 28 },
      { icon: "📁", title: "Inventory & Assets", description: "Inventory records and asset documents", items: 19 },
      { icon: "📁", title: "Shipping & Logistics", description: "Shipping, receiving, and returns", items: 14 },
    ],
    documents: [
      { type: "Word", title: "Warehouse Receiving Procedure", modified: "Today", owner: "Facilities" },
      { type: "Excel", title: "Network Equipment Inventory", modified: "Today", owner: "Operations" },
      { type: "PDF", title: "Equipment Return Process", modified: "Jul 15", owner: "Business Operations" },
      { type: "PowerPoint", title: "Operations Safety Training", modified: "Jul 9", owner: "Facilities" },
    ],
  }} />;
}
