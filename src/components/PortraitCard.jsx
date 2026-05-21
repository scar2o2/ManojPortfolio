import React, { useRef } from "react";
import profilePhoto from "../assets/profile.jpg";

export function PortraitCard() {
  const card = useRef(null);

  const handleMove = (event) => {
    const bounds = card.current?.getBoundingClientRect();
    if (!bounds) return;

    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    const tiltX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -8;
    const tiltY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10;

    card.current.style.setProperty("--portrait-x", `${x}%`);
    card.current.style.setProperty("--portrait-y", `${y}%`);
    card.current.style.setProperty("--portrait-tilt-x", `${tiltX}deg`);
    card.current.style.setProperty("--portrait-tilt-y", `${tiltY}deg`);
    card.current.classList.add("is-active");
  };

  const handleLeave = () => {
    if (!card.current) return;

    card.current.classList.remove("is-active");
    card.current.style.removeProperty("--portrait-tilt-x");
    card.current.style.removeProperty("--portrait-tilt-y");
  };

  return (
    <figure
      ref={card}
      className="portrait-card"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor="PHOTO"
    >
      <img src={profilePhoto} alt="Portrait of Manoj Cherukuri" />
      <span className="portrait-lens" aria-hidden="true"></span>
      <span className="portrait-rgb portrait-rgb-red" aria-hidden="true"></span>
      <span className="portrait-rgb portrait-rgb-blue" aria-hidden="true"></span>
      <i aria-hidden="true"></i>
      <i aria-hidden="true"></i>
      <i aria-hidden="true"></i>
    </figure>
  );
}
