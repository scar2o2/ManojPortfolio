import React, { useEffect, useMemo, useRef } from "react";
import { skillCategories } from "../data/portfolio";

export function SkillsSection() {
  const section = useRef(null);
  const skills = useMemo(
    () =>
      skillCategories
        .flatMap((category) =>
          category.skills.map((skill) => ({
            ...skill,
            category: category.title
          }))
        )
        .sort((first, second) => {
          const firstKey = `${first.category}-${first.name}`;
          const secondKey = `${second.category}-${second.name}`;
          return Math.sin(firstKey.length * 17 + firstKey.charCodeAt(0)) - Math.sin(secondKey.length * 17 + secondKey.charCodeAt(0));
        }),
    []
  );
  const badgeRows = Array.from({ length: 5 }, (_, rowIndex) =>
    skills.filter((_, index) => index % 5 === rowIndex)
  );

  useEffect(() => {
    const root = section.current;
    if (!root) return;

    root.querySelectorAll("[data-reveal]").forEach((element) => {
      element.classList.add("is-visible");
    });

    let frame = null;
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let speedReset = null;

    const syncParallax = () => {
      frame = null;
      const now = performance.now();
      const deltaY = window.scrollY - lastY;
      const deltaTime = Math.max(16, now - lastTime);
      const scrollSpeed = Math.max(-1, Math.min(1, deltaY / deltaTime / 1.2));
      const rect = root.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, (window.innerHeight * 0.5 - rect.top) / Math.max(rect.height, 1)));
      const velocity = Math.max(-1, Math.min(1, progress * 1.1 + scrollSpeed * 0.65));

      root.style.setProperty("--skills-progress", progress.toFixed(3));
      root.style.setProperty("--skills-depth", `${velocity * 92}px`);
      root.style.setProperty("--skills-drift", `${velocity * -68}px`);
      root.style.setProperty("--skills-speed", `${scrollSpeed * 120}px`);
      root.style.setProperty("--marquee-boost", `${Math.abs(scrollSpeed) * 18}px`);
      root.classList.toggle("is-scroll-boosted", Math.abs(scrollSpeed) > 0.18);
      lastY = window.scrollY;
      lastTime = now;

      if (speedReset) window.clearTimeout(speedReset);
      speedReset = window.setTimeout(() => {
        root.style.setProperty("--marquee-boost", "0px");
        root.classList.remove("is-scroll-boosted");
      }, 180);
    };

    const requestSync = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(syncParallax);
    };

    syncParallax();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      if (speedReset) window.clearTimeout(speedReset);
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, []);

  return (
    <section ref={section} id="skills" className="skills-showcase">
      <div className="skills-ambient" aria-hidden="true"></div>
      <div className="skills-left" data-reveal>
        <h2>Skills</h2>
        <div className="skills-copy-grid">
          {skillCategories.slice(0, 4).map((category) => (
            <article key={category.title}>
              <h3>{category.title}</h3>
              <ul>
                {category.skills.map((skill) => (
                  <li key={skill.name}>{skill.name}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <div className="skills-pill-field" data-reveal>
        {badgeRows.map((row, rowIndex) => (
          <div
            className="skill-pill-row"
            key={`row-${rowIndex}`}
            style={{
              "--row-delay": `${rowIndex * 90}ms`,
              "--row-direction": rowIndex % 2 === 0 ? "normal" : "reverse",
              "--row-shift": `${rowIndex % 2 === 0 ? -1 : 1}`,
              "--row-depth": `${(rowIndex - 2) * 16}px`
            }}
          >
            {[...row, ...row].map((skill, skillIndex) => (
              <span
                className="skill-pill-orbit"
                key={`${skill.category}-${skill.name}-${skillIndex}`}
                style={{ "--delay": `${rowIndex * 110 + skillIndex * 55}ms` }}
              >
                <strong>{skill.name}</strong>
                <i aria-hidden="true">
                  {skill.logo ? <img src={skill.logo} alt="" loading="lazy" /> : skill.icon}
                </i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
