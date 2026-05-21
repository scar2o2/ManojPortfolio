import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { focusAreas } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function FocusSection() {
  const stage = useRef(null);
  const track = useRef(null);
  const scrollTrigger = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const goToSlide = (index) => {
    const nextIndex = Math.max(0, Math.min(focusAreas.length - 1, index));
    setActiveSlide(nextIndex);
    const trigger = scrollTrigger.current;

    if (trigger) {
      const progress = nextIndex / Math.max(1, focusAreas.length - 1);
      const y = trigger.start + (trigger.end - trigger.start) * progress;
      window.scrollTo({ top: y, behavior: "smooth" });
      return;
    }

    const target = track.current?.children[nextIndex];
    target?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  useEffect(() => {
    if (!stage.current || !track.current) return undefined;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(stage.current.querySelectorAll(".service-card"));
      const images = gsap.utils.toArray(stage.current.querySelectorAll(".strength-image"));
      const contents = gsap.utils.toArray(stage.current.querySelectorAll(".service-content"));
      const clamp = gsap.utils.clamp(0, 1);
      const travelDistance = () => Math.max(1, track.current.scrollWidth - stage.current.clientWidth);
      const maxX = () => -travelDistance();
      const scrollDistance = () => Math.max(stage.current.clientWidth * 3.8, travelDistance() * 1.2);
      const updateDepth = () => {
        const x = Number(gsap.getProperty(track.current, "x")) || 0;
        const viewportCenter = stage.current.clientWidth / 2;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        cards.forEach((card, index) => {
          const cardCenter = card.offsetLeft + card.offsetWidth / 2 + x;
          const signedDistance = cardCenter - viewportCenter;
          const distance = Math.abs(signedDistance);
          const ratio = clamp(distance / (stage.current.clientWidth * 0.64));
          const focus = 1 - ratio;

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }

          gsap.set(card, {
            scale: 0.92 + focus * 0.08,
            opacity: 0.48 + focus * 0.52,
            filter: `blur(${ratio * 1.8}px) brightness(${0.74 + focus * 0.26}) saturate(${0.82 + focus * 0.18})`,
            zIndex: Math.round(focus * 10)
          });

          gsap.set(images[index], {
            x: signedDistance * -0.08,
            scale: 1.12 + ratio * 0.04
          });

          gsap.set(contents[index], {
            opacity: clamp((focus - 0.2) / 0.8),
            y: ratio * 18
          });
        });

        setActiveSlide((current) => (current === closestIndex ? current : closestIndex));
      };

      gsap.set(track.current, { x: 0, force3D: true });
      gsap.set(cards, { transformOrigin: "center center", force3D: true });
      gsap.set(images, { transformOrigin: "center center", force3D: true });
      gsap.set(contents, { force3D: true });
      updateDepth();

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage.current,
          start: "top top",
          end: () => `+=${scrollDistance()}`,
          pin: true,
          scrub: 1.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => document.body.classList.add("is-focus-pinned"),
          onEnterBack: () => document.body.classList.add("is-focus-pinned"),
          onLeave: () => document.body.classList.remove("is-focus-pinned"),
          onLeaveBack: () => document.body.classList.remove("is-focus-pinned"),
          onRefresh: updateDepth,
          onUpdate: updateDepth
        }
      });

      timeline.to(track.current, { x: maxX }, 0);

      scrollTrigger.current = timeline.scrollTrigger;
    }, stage);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 80);

    return () => {
      window.clearTimeout(refresh);
      scrollTrigger.current = null;
      document.body.classList.remove("is-focus-pinned");
      ctx.revert();
    };
  }, []);

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
      <div ref={stage} className="focus-stage">
        <div
          ref={track}
          className="service-track"
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
