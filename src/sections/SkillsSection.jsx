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
              "--row-direction": rowIndex % 2 === 0 ? "normal" : "reverse"
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
