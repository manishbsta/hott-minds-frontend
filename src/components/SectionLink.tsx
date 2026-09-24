"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

type SectionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/**
 * Link to a page section (e.g. "/services#cakes"). Next's <Link> does nothing when the target
 * URL is the current URL, so in that case scroll to the section ourselves.
 */
export default function SectionLink({ href, onClick, ...props }: SectionLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    const target = new URL(href, window.location.href);
    const isCurrentUrl =
      target.pathname === window.location.pathname &&
      target.search === window.location.search &&
      target.hash === window.location.hash;
    const section = target.hash ? document.getElementById(target.hash.slice(1)) : null;
    if (isCurrentUrl && section) {
      event.preventDefault();
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
