import React from "react";
import { SectionTitle } from "../components/SectionTitle";
import { experience } from "../data/portfolio";

export function ExperienceSection() {
  return (
    <section id="experience" className="px-4 py-20 min-[390px]:px-5 md:px-14 md:py-36">
      <SectionTitle
        eyebrow=""
        first=""
        second="Experience"
        copy="My journey through the world of software engineering, marked by hands-on experience and continuous learning."
      />
      <div data-reveal className="experience-grid single">
        {experience.map((item, index) => (
          <article key={item.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.title}</strong>
            <em>{item.meta}</em>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
