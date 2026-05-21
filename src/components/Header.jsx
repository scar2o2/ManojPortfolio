import React from "react";
import { navItems, profile } from "../data/portfolio";

export function Header() {
  return (
    <header className="site-header">
      <a href="#top" className="site-mark" data-cursor="TOP" aria-label="Back to top">
        {profile.initials}
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map(([label, id]) => (
          <a className="nav-link" href={`#${id}`} key={id} data-cursor="GO">
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
