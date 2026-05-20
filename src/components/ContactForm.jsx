import React from "react";
import { profile } from "../data/portfolio";

export function ContactForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name")?.toString().trim() || "Portfolio visitor";
    const email = data.get("email")?.toString().trim();
    const message = data.get("message")?.toString().trim();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      [`Name: ${name}`, email ? `Email: ${email}` : "", "", message || "Hi Manoj,"]
        .filter(Boolean)
        .join("\n")
    );

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form data-reveal className="contact-form" onSubmit={handleSubmit}>
      <label>
        <span>Name</span>
        <input name="name" type="text" placeholder="Your name" required />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" placeholder="you@example.com" required />
      </label>
      <label>
        <span>Message</span>
        <textarea name="message" rows="5" placeholder="Write a short message..." required></textarea>
      </label>
      <button type="submit" data-cursor="SEND">
        Send Email
      </button>
    </form>
  );
}
