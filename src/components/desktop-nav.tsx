"use client";

import { Nav } from "@/components/nav";
import { usePathname } from "@/i18n/navigation";
import type { NavItem } from "@/types/nav";

export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return <Nav className="max-sm:hidden" items={items} activeId={pathname} />;
}
