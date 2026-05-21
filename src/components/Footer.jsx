import React from "react";
import { navItems, profile } from "../data/portfolio";

export function Footer() {
  return (
    <footer className="site-footer">
      <p className="footer-kicker">Manoj|Cherukuri</p>
      <h2 className="footer-name">
        {profile.firstName} <span className="block">{profile.lastName}</span>
      </h2>
      <nav className="footer-nav" aria-label="Footer navigation">
        {navItems.map(([label, id]) => (
          <a className="nav-link" href={`#${id}`} key={id} data-cursor="GO">
            {label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
