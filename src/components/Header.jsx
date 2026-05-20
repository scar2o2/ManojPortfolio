import React from "react";
import { navItems, profile } from "../data/portfolio";

export function Header() {
  return (
    <header className="site-header">
      <a href="#top" className="grid size-10 shrink-0 place-items-center rounded-full border border-ink font-black sm:size-11" data-cursor="TOP">
        {profile.initials}
      </a>
      <nav className="flex min-w-0 flex-wrap justify-end gap-x-4 gap-y-2 text-[0.68rem] font-black uppercase min-[390px]:gap-x-5 sm:text-xs md:gap-x-6 md:text-sm">
        {navItems.map(([label, id]) => (
          <a className="nav-link" href={`#${id}`} key={id} data-cursor="GO">
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
