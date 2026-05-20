import React from "react";
import { useMemo } from "react";
import { skillRail } from "../data/portfolio";

export function SkillRail({ onViewAll }) {
  const railItems = useMemo(() => [...skillRail, ...skillRail], []);

  return (
    <section className="skill-rail" aria-label="Skills">
      <div>
        {railItems.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
      <button className="skill-view-all" type="button" onClick={onViewAll} data-cursor="SKILLS">
        View all
      </button>
    </section>
  );
}
