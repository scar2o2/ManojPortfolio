import React from "react";
import { SectionTitle } from "../components/SectionTitle";
import { achievements } from "../data/portfolio";

export function AchievementsSection() {
  return (
    <section id="achievements" className="px-4 py-20 min-[390px]:px-5 md:px-14 md:py-36">
      <SectionTitle
        eyebrow=""
        first="Achievements"
        second=""
        copy="A few markers of continued learning outside the classroom."
      />
      <div data-reveal className="achievement-grid">
        {achievements.map((item, index) => (
          <article key={item.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.title}</strong>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
