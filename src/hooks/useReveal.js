import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const sections = document.querySelectorAll("main > section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    elements.forEach((element, index) => {
      element.style.setProperty("--delay", `${Math.min(index % 7, 6) * 70}ms`);
      observer.observe(element);
    });

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-section-visible");
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -12% 0px" }
    );

    sections.forEach((section) => {
      if (section.classList.contains("focus-slideshow")) {
        section.classList.add("is-section-visible");
        return;
      }

      section.classList.add("section-transition");
      sectionObserver.observe(section);
    });

    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
    };
  }, []);
}
