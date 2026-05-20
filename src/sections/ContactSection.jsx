import React from "react";
import { ContactForm } from "../components/ContactForm";
import { profile } from "../data/portfolio";

export function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-copy">
        <p data-reveal className="eyebrow text-paper/60">
          Contact
        </p>
        <h2 data-reveal>Open to backend and full-stack software engineering opportunities.</h2>
        <p data-reveal className="fluid-copy mt-8 max-w-3xl text-paper/70">
          {profile.location} | {profile.phone}
        </p>
        <div data-reveal className="mt-10 flex flex-wrap gap-x-7 gap-y-4 text-sm font-black uppercase">
          <a className="nav-link" href={`mailto:${profile.email}`} data-cursor="MAIL">
            Email
          </a>
          <a className="nav-link" href={profile.github} target="_blank" rel="noreferrer" data-cursor="OPEN">
            GitHub
          </a>
          <a className="nav-link" href={profile.linkedin} target="_blank" rel="noreferrer" data-cursor="OPEN">
            LinkedIn
          </a>
          <a className="nav-link" href={profile.leetcode} target="_blank" rel="noreferrer" data-cursor="OPEN">
            LeetCode
          </a>
          <a className="nav-link" href="#top" data-cursor="TOP">
            Back to top
          </a>
        </div>
      </div>
      <ContactForm />
    </section>
  );
}
