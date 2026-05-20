import React, { useRef } from "react";
import { profile } from "../data/portfolio";

function MagneticName({ firstName, lastName }) {
  const title = useRef(null);
  const text = `${firstName}\n${lastName}`;
  const columns = 9;
  const rows = 5;
  const cells = Array.from({ length: columns * rows }, (_, index) => ({
    column: index % columns,
    row: Math.floor(index / columns)
  }));

  const handleMove = (event) => {
    const bounds = title.current?.getBoundingClientRect();
    if (!bounds) return;

    title.current.querySelectorAll(".name-cell").forEach((cell) => {
      const column = Number(cell.dataset.column);
      const row = Number(cell.dataset.row);
      const cellX = bounds.left + ((column + 0.5) / columns) * bounds.width;
      const cellY = bounds.top + ((row + 0.5) / rows) * bounds.height;
      const distanceX = event.clientX - cellX;
      const distanceY = event.clientY - cellY;
      const distance = Math.hypot(distanceX, distanceY);
      const pull = Math.max(0, 1 - distance / 240);
      const direction = pull > 0 ? 1 : 0;

      cell.style.setProperty("--tx", `${distanceX * pull * 0.34 * direction}px`);
      cell.style.setProperty("--ty", `${distanceY * pull * 0.34 * direction}px`);
      cell.style.setProperty("--scale", `${1 + pull * 0.1}`);
      cell.style.setProperty("--alpha", "1");
    });
  };

  const handleLeave = () => {
    title.current?.querySelectorAll(".name-cell").forEach((cell) => {
      cell.style.removeProperty("--tx");
      cell.style.removeProperty("--ty");
      cell.style.removeProperty("--scale");
      cell.style.removeProperty("--alpha");
    });
  };

  return (
    <div
      ref={title}
      data-reveal
      className="hero-title magnetic-name"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-label={`${firstName} ${lastName}`}
    >
      <span className="name-plain">{text}</span>
      {cells.map(({ column, row }) => (
        <span
          aria-hidden="true"
          className="name-cell"
          data-column={column}
          data-row={row}
          key={`${column}-${row}`}
          style={{
            "--column": column,
            "--row": row,
            "--left": `${(column / columns) * 100}%`,
            "--top": `${(row / rows) * 100}%`,
            "--right": `${100 - ((column + 1) / columns) * 100}%`,
            "--bottom": `${100 - ((row + 1) / rows) * 100}%`
          }}
        >
          <span className="name-cell-text">{text}</span>
        </span>
      ))}
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="grid min-h-screen items-center gap-8 px-4 pb-16 pt-36 min-[390px]:px-5 sm:gap-10 md:grid-cols-[0.82fr_1fr] md:px-14 md:pb-20 md:pt-28">
      <div data-reveal className="hero-media" data-cursor="CODE">
        <div className="terminal-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <pre>{`const student = {
  name: "${profile.fullName}",
  major: "Computer Science",
  stack: ["React.js", "Node.js", "MySQL"],
  focus: "Backend and full-stack apps"
};`}</pre>
        <div className="bar-field" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, index) => (
            <i key={index}></i>
          ))}
        </div>
      </div>

      <div className="hero-copy">
        <p data-reveal className="eyebrow">
          Computer Science Portfolio
        </p>
        <MagneticName firstName={profile.firstName} lastName={profile.lastName} />
        <p data-reveal className="fluid-copy mt-8 max-w-3xl text-ink/80">
          Computer Science undergraduate focused on scalable web applications, backend
          engineering, and responsive product experiences. I build with React, Node.js,
          Express, MySQL, Firebase, Supabase, REST APIs, and real-time Socket.IO systems.
        </p>
        <div data-reveal className="mt-8 flex flex-wrap gap-x-7 gap-y-4 text-sm font-black uppercase md:mt-10">
          <a className="nav-link" href="#projects" data-cursor="VIEW">
            Explore projects
          </a>
          <a className="nav-link break-all text-muted" href={`mailto:${profile.email}`} data-cursor="MAIL">
            {profile.email}
          </a>
        </div>
      </div>
    </section>
  );
}
