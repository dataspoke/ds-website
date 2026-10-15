import { NAV_ITEMS } from "@/lib/constants";
import { getInsightPosts } from "@/lib/insights";
import type { NavItem } from "@/types";

/** Site nav. Insights stays off the list until content/insights has a published post. */
export function getNavItems(): NavItem[] {
  if (getInsightPosts().length === 0) return NAV_ITEMS;
  const contact = NAV_ITEMS.findIndex((item) => item.href === "/contact");
  const insights: NavItem = { label: "Insights", href: "/insights" };
  if (contact === -1) return [...NAV_ITEMS, insights];
  return [...NAV_ITEMS.slice(0, contact), insights, ...NAV_ITEMS.slice(contact)];
}
