import React, { useRef, useState } from "react";
import { focusAreas } from "../data/portfolio";

export function FocusSection() {
  const track = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const goToSlide = (index) => {
    const nextIndex = Math.max(0, Math.min(focusAreas.length - 1, index));
    setActiveSlide(nextIndex);
    const target = track.current?.children[nextIndex];
    target?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  return (
    <section id="focus" className="focus-slideshow">
      <div className="focus-intro" data-reveal>
        <p className="eyebrow">Offerings</p>
        <h2>
          Focus <span>Areas</span>
        </h2>
        <p>
          A practical set of strengths across full-stack development, realtime systems,
          backend design, databases, responsive UI, and problem solving.
        </p>
      </div>
      <div className="focus-stage">
        <div
          ref={track}
          className="service-track"
          onScroll={(event) => {
            const width = event.currentTarget.clientWidth;
            if (width > 0) {
              setActiveSlide(Math.round(event.currentTarget.scrollLeft / width));
            }
          }}
        >
          {focusAreas.map((area, index) => (
            <article key={area.title} className="service-card" data-cursor="FOCUS">
              <div className={`strength-image ${area.image}`} role="img" aria-label={`${area.title} visual`}>
                <span></span>
                <span></span>
                <span></span>
                <i></i>
              </div>
              <div className="service-content">
                <h3>{area.title}</h3>
                <p>{area.copy}</p>
                <ul>
                  {area.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <a href="#contact" className="card-link" data-cursor="ASK">
                  Reach out
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="focus-controls" aria-label="Focus slideshow controls">
          <button type="button" onClick={() => goToSlide(activeSlide - 1)} disabled={activeSlide === 0} aria-label="Previous focus area">
            Prev
          </button>
          <span>
            {activeSlide + 1} / {focusAreas.length}
          </span>
          <button type="button" onClick={() => goToSlide(activeSlide + 1)} disabled={activeSlide === focusAreas.length - 1} aria-label="Next focus area">
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
