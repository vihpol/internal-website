import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MICAS Networks | Web Search",
  description: "Search the internet from one MICAS-branded portal, powered by SearXNG.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
