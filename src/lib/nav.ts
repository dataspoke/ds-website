import { NAV_ITEMS as ALL_NAV_ITEMS, WORK_PUBLISHED } from "@/lib/constants";
import { getInsightPosts } from "@/lib/insights";
import type { NavItem } from "@/types";

const NAV_ITEMS = WORK_PUBLISHED ? ALL_NAV_ITEMS : ALL_NAV_ITEMS.filter((item) => item.href !== "/work");

/** Site nav. Insights stays off the list until content/insights has a published post. */
export function getNavItems(): NavItem[] {
  if (getInsightPosts().length === 0) return NAV_ITEMS;
  const contact = NAV_ITEMS.findIndex((item) => item.href === "/contact");
  const insights: NavItem = { label: "Insights", href: "/insights" };
  if (contact === -1) return [...NAV_ITEMS, insights];
  return [...NAV_ITEMS.slice(0, contact), insights, ...NAV_ITEMS.slice(contact)];
}
