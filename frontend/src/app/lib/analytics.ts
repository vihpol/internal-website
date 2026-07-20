export type AnalyticsEvent =
  | "department_open"
  | "web_search_failure"
  | "microsoft_search_failure"
  | "page_available"
  | "page_unavailable"
  | "broken_link_report";

export function recordAnalytics(event: AnalyticsEvent, target = "portal") {
  const body = JSON.stringify({ event, target });
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics/event", new Blob([body], { type: "application/json" }));
    return;
  }
  void fetch("/api/analytics/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => undefined);
}
