import React, { useEffect, useRef } from "react";
import { focusAreas } from "../data/portfolio";

export function FocusSection() {
  const section = useRef(null);
  const intro = useRef(null);
  const stage = useRef(null);
  const track = useRef(null);
  const headerHeight = 76;
  const slideCount = focusAreas.length;
  const focusHeight = `calc(${(slideCount + 1) * 100}vh - ${(slideCount + 1) * headerHeight}px)`;

  useEffect(() => {
    const root = section.current;
    const stageElement = stage.current;
    const element = track.current;
    const introElement = intro.current;
    if (!root || !stageElement || !element || !introElement) return;

    let frame = null;

    const setSlideProgress = (slideProgress) => {
      const clampedProgress = Math.max(0, Math.min(slideCount - 1, slideProgress));
      element.style.setProperty("--focus-shift", `${clampedProgress * -100}%`);
      root.style.setProperty("--active-slide", Math.round(clampedProgress));
      element.querySelectorAll(".service-card").forEach((card, index) => {
        const localProgress = clampedProgress - index;
        const clamped = Math.max(-1, Math.min(1, localProgress));

        card.style.setProperty("--image-parallax", `${clamped * 7}%`);
        card.style.setProperty("--content-parallax", `${clamped * -44}px`);
        card.style.setProperty("--content-depth", `${1 - Math.min(0.08, Math.abs(clamped) * 0.08)}`);
      });
    };

    const syncSlideToScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        const viewportHeight = window.innerHeight - headerHeight;
        const sectionTop = root.getBoundingClientRect().top + window.scrollY;
        const introHeight = introElement.offsetHeight;
        const start = sectionTop + introHeight - headerHeight;
        const scrollDistance = Math.max(1, (slideCount - 1) * viewportHeight);
        const progress = Math.max(0, Math.min(1, (window.scrollY - start) / scrollDistance));
        const slideProgress = progress * (slideCount - 1);
        const stageRect = stageElement.getBoundingClientRect();
        const isPinned = stageRect.top <= headerHeight + 1 && stageRect.bottom >= window.innerHeight - 1;

        root.classList.toggle("is-slideshow-locked", isPinned);
        setSlideProgress(slideProgress);
      });
    };

    setSlideProgress(0);
    syncSlideToScroll();
    window.addEventListener("scroll", syncSlideToScroll, { passive: true });
    window.addEventListener("resize", syncSlideToScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", syncSlideToScroll);
      window.removeEventListener("resize", syncSlideToScroll);
    };
  }, [headerHeight, slideCount]);

  return (
    <section
      ref={section}
      id="focus"
      className="focus-slideshow"
      style={{ height: focusHeight }}
    >
      <div ref={intro} className="focus-intro" data-reveal>
        <p className="eyebrow">Offerings</p>
        <h2>
          Focus <span>Areas</span>
        </h2>
        <p>
          A practical set of strengths across full-stack development, realtime systems,
          backend design, databases, responsive UI, and problem solving.
        </p>
      </div>
      <div ref={stage} className="focus-stage">
        <div ref={track} className="service-track">
          {focusAreas.map((area, index) => (
            <article key={area.title} className="service-card" style={{ "--slide-index": index }} data-cursor="FOCUS">
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
      </div>
    </section>
  );
}
