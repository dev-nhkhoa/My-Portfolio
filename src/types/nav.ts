export type NavItem = {
  /** Key under the `nav` message namespace. */
  titleKey: string;
  href: string;
};

export type ResolvedNavItem = {
  title: string;
  href: string;
};
