import React, { useEffect, useMemo, useState } from "react";

const slidesByType = {
  planner: [
    { label: "Home", detail: "Search lost and found items across campus.", layout: "hero" },
    { label: "Listings", detail: "Browse item cards with status and metadata.", layout: "grid" },
    { label: "Report", detail: "Submit a lost or found item in a guided flow.", layout: "form" },
    { label: "Mobile", detail: "Responsive claim experience for quick updates.", layout: "mobile" }
  ],
  notes: [
    { label: "Events", detail: "Live schedule overview with shared sessions.", layout: "hero" },
    { label: "Presence", detail: "Realtime participant state and room activity.", layout: "grid" },
    { label: "Sync", detail: "Socket-driven updates and event synchronization.", layout: "metrics" },
    { label: "Admin", detail: "Controls for sessions, users, and event flow.", layout: "form" }
  ],
  compiler: [
    { label: "Docker", detail: "Containerized app structure and build flow.", layout: "hero" },
    { label: "Cluster", detail: "Kubernetes deployment topology.", layout: "grid" },
    { label: "Pipeline", detail: "CI/CD stages from build to release.", layout: "timeline" },
    { label: "Metrics", detail: "Runtime health and deployment signals.", layout: "metrics" }
  ]
};

export function ProjectSlideshow({ type = "planner", number = "01", title = "Project", stack = "Full stack" }) {
  const slides = useMemo(() => slidesByType[type] || slidesByType.planner, [type]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <div className={`project-slideshow ${type}`}>
      <span className="project-slide-number">{number}</span>
      <div className="project-slide-window">
        {slides.map((slide, index) => (
          <article className={`project-slide is-${slide.layout} ${index === active ? "is-active" : ""}`} key={slide.label}>
            <div className="project-slide-copy">
              <span>{index === 0 ? title : slide.label}</span>
              <strong>{index === 0 ? stack : slide.detail}</strong>
            </div>
            <div className="project-slide-ui">
              <b></b>
              <span></span>
              <span></span>
              <span></span>
              <i></i>
              <em></em>
            </div>
          </article>
        ))}
      </div>
      <div className="project-slide-controls" aria-label={`${title} preview slides`}>
        {slides.map((slide, index) => (
          <button
            type="button"
            className={index === active ? "is-active" : ""}
            key={slide.label}
            onClick={() => setActive(index)}
            aria-label={`Show ${slide.label} preview`}
          >
            <span>{slide.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
