import React from "react";
import { navItems, profile } from "../data/portfolio";

export function Footer() {
  return (
    <footer className="px-4 py-14 min-[390px]:px-5 md:px-14 md:py-16">
      <p className="font-mono text-sm font-bold">Manoj|Cherukuri</p>
      <h2 className="mt-7 text-[clamp(4rem,14vw,12rem)] font-black leading-[0.82]">
        {profile.firstName} <span className="block">{profile.lastName}</span>
      </h2>
      <nav className="mt-10 flex flex-wrap gap-7 text-sm font-black uppercase">
        {navItems.map(([label, id]) => (
          <a className="nav-link" href={`#${id}`} key={id} data-cursor="GO">
            {label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
