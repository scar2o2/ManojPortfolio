import React, { useCallback, useRef, useState } from "react";
import { Cursor } from "./components/Cursor";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Loader } from "./components/Loader";
import { useReveal } from "./hooks/useReveal";
import { AchievementsSection } from "./sections/AchievementsSection";
import { ContactSection } from "./sections/ContactSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { FocusSection } from "./sections/FocusSection";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillRail } from "./sections/SkillRail";
import { SkillsSection } from "./sections/SkillsSection";

export function App() {
  const [showSkills, setShowSkills] = useState(false);
  const [transition, setTransition] = useState(null);
  const transitionLock = useRef(false);
  useReveal();

  const getSectionLabel = (id) => {
    const labels = {
      top: "Manoj",
      projects: "Projects",
      skills: "Skills",
      focus: "Focus",
      experience: "Experience",
      achievements: "Wins",
      contact: "Contact"
    };

    return labels[id] || id;
  };

  const playSectionTransition = useCallback((id, beforeScroll) => {
    if (transitionLock.current) return;

    const target = document.getElementById(id);
    const targetTop = target ? target.getBoundingClientRect().top + window.scrollY : window.scrollY;
    const direction = targetTop >= window.scrollY ? "down" : "up";

    transitionLock.current = true;
    setTransition({ id, label: getSectionLabel(id), direction, phase: "enter" });

    window.setTimeout(() => {
      beforeScroll?.();
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        setTransition((current) => (current ? { ...current, phase: "travel" } : current));
      }, 40);
    }, 360);

    window.setTimeout(() => {
      setTransition((current) => (current ? { ...current, phase: "settle" } : current));
    }, 920);

    window.setTimeout(() => {
      setTransition(null);
      transitionLock.current = false;
    }, 1320);
  }, []);

  const handleInternalLink = useCallback(
    (event) => {
      const link = event.target.closest?.('a[href^="#"]');
      if (!link) return;

      const id = link.getAttribute("href").slice(1) || "top";
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      playSectionTransition(id);
    },
    [playSectionTransition]
  );

  const handleShowSkills = () => {
    playSectionTransition("skills", () => setShowSkills(true));
  };

  return (
    <>
      <Loader />
      <Cursor />
      <div
        className={`route-transition ${transition ? "is-active" : ""} ${
          transition ? `is-${transition.phase} is-${transition.direction}` : ""
        }`}
        aria-hidden="true"
      >
        <span className="route-layer route-layer-one"></span>
        <span className="route-layer route-layer-two"></span>
        <span className="route-kicker">Navigating</span>
        <strong>{transition?.label || ""}</strong>
      </div>
      <div className={`app-shell ${transition ? `is-transitioning is-${transition.direction}` : ""}`} onClickCapture={handleInternalLink}>
        <Header />
        <main id="top">
          <HeroSection />
          <FocusSection />
          <SkillRail onViewAll={handleShowSkills} />
          {showSkills && <SkillsSection />}
          <ProjectsSection />
          <ExperienceSection />
          <AchievementsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
