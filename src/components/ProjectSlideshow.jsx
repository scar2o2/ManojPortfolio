import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import eventsAdmin from "../assets/events_admin.png";
import eventsBooking from "../assets/events_booking.png";
import eventsHistory from "../assets/events_history.png";
import eventsLogin from "../assets/events_login.png";
import eventsUser from "../assets/events_user.png";

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
  tickets: [
    { label: "Auth Module", detail: "Sign up, log in, and enter the system with admin or user access.", layout: "image", image: eventsLogin },
    { label: "User Dashboard Module", detail: "Search tickets, book events, and open booking history after login.", layout: "image", image: eventsUser },
    { label: "Ticket Booking Module", detail: "Choose available tickets, enter details, and confirm the booking.", layout: "image", image: eventsBooking },
    { label: "My Bookings Module", detail: "Review current and past bookings with details and status updates.", layout: "image", image: eventsHistory },
    { label: "Admin Dashboard Module", detail: "Manage the system, monitor ticket activity, and view key details.", layout: "image", image: eventsAdmin }
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
  const [exiting, setExiting] = useState(null);
  const [direction, setDirection] = useState("next");
  const exitTimer = useRef(null);

  const goToSlide = useCallback((index, nextDirection = "next") => {
    const next = (index + slides.length) % slides.length;
    if (next === active) return;

    window.clearTimeout(exitTimer.current);
    setDirection(nextDirection);
    setExiting(active);
    setActive(next);
    exitTimer.current = window.setTimeout(() => setExiting(null), 780);
  }, [active, slides.length]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      goToSlide(active + 1, "next");
    }, 3600);

    return () => window.clearInterval(timer);
  }, [active, goToSlide]);

  useEffect(() => () => window.clearTimeout(exitTimer.current), []);

  return (
    <div className={`project-slideshow ${type} is-${direction}`}>
      <span className="project-slide-number">{number}</span>
      <div className="project-slide-window">
        {slides.map((slide, index) => (
          <article
            className={`project-slide is-${slide.layout} ${index === active ? "is-active" : ""} ${index === exiting ? "is-exiting" : ""}`}
            key={slide.label}
          >
            <div className="project-slide-copy">
              <span>{index === 0 ? title : slide.label}</span>
              <strong>{index === 0 ? stack : slide.detail}</strong>
            </div>
            {slide.image ? (
              <figure className="project-slide-media">
                <img src={slide.image} alt={`${title} ${slide.label} screen`} loading={index === 0 ? "eager" : "lazy"} />
                <figcaption>
                  <span>{slide.label}</span>
                  <strong>{slide.detail}</strong>
                </figcaption>
              </figure>
            ) : (
              <div className="project-slide-ui">
                <b></b>
                <span></span>
                <span></span>
                <span></span>
                <i></i>
                <em></em>
              </div>
            )}
          </article>
        ))}
      </div>
      <div className="project-slide-controls" aria-label={`${title} preview slides`}>
        <button type="button" onClick={() => goToSlide(active - 1, "prev")} aria-label={`Previous ${title} preview`}>
          Prev
        </button>
        <span>
          {active + 1} / {slides.length}
        </span>
        <button type="button" onClick={() => goToSlide(active + 1, "next")} aria-label={`Next ${title} preview`}>
          Next
        </button>
      </div>
    </div>
  );
}
