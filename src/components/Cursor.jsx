import React from "react";
import { useEffect, useRef } from "react";

export function Cursor() {
  const cursor = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return undefined;

    const move = (event) => {
      cursor.current?.style.setProperty("--x", `${event.clientX}px`);
      cursor.current?.style.setProperty("--y", `${event.clientY}px`);
    };
    const enter = (event) => {
      const href = event.currentTarget.getAttribute("href");
      const inContact = event.currentTarget.closest("#contact");
      const text = inContact && href ? href : event.currentTarget.dataset.cursor || "OPEN";
      label.current.textContent = text;
      cursor.current.classList.toggle("is-link", Boolean(inContact && href));
      cursor.current.classList.add("is-active");
    };
    const leave = () => {
      cursor.current.classList.remove("is-active");
      cursor.current.classList.remove("is-link");
    };

    window.addEventListener("pointermove", move);
    document.querySelectorAll("[data-cursor]").forEach((item) => {
      item.addEventListener("pointerenter", enter);
      item.addEventListener("pointerleave", leave);
    });

    return () => {
      window.removeEventListener("pointermove", move);
      document.querySelectorAll("[data-cursor]").forEach((item) => {
        item.removeEventListener("pointerenter", enter);
        item.removeEventListener("pointerleave", leave);
      });
    };
  }, []);

  return (
    <div ref={cursor} className="cursor">
      <span ref={label}>OPEN</span>
    </div>
  );
}
