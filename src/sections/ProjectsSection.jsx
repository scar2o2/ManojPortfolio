import React from "react";
import { MiniVisual } from "../components/MiniVisual";
import { SectionTitle } from "../components/SectionTitle";
import { projects } from "../data/portfolio";

export function ProjectsSection() {
  return (
    <section id="projects" className="px-4 py-20 min-[390px]:px-5 md:px-14 md:py-36">
      <SectionTitle
        eyebrow="Featured Work"
        first="Project"
        second="Index"
        copy="Selected builds presented as a visual project index with stack, live links, and repositories."
      />
      <div className="project-showcase">
        {projects.map(({ title, stack, type, number, liveUrl, repoUrl }, index) => (
          <article
            key={title}
            data-reveal
            className={`project-card ${index % 2 === 1 ? "is-reversed" : ""}`}
            data-cursor="VIEW"
          >
            <div className={`project-image ${type}`}>
              <span>{number}</span>
              <MiniVisual type="project" />
            </div>
            <div className="project-copy">
              <div className="min-w-0">
                <a href={liveUrl} target="_blank" rel="noreferrer" data-cursor="OPEN">
                  <h3>{title}</h3>
                </a>
                <p>{stack}</p>
                <a className="repo-line mt-2 block" href={repoUrl} target="_blank" rel="noreferrer" data-cursor="GITHUB">
                  {repoUrl.replace("https://", "")}
                </a>
              </div>
              <a className="project-arrow" href={liveUrl} target="_blank" rel="noreferrer" data-cursor="OPEN">
                OPEN
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
