import React from "react";
import { useEffect, useState } from "react";

export function Loader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCount((value) => {
        const next = value + Math.ceil((100 - value) / 7);
        if (next >= 100) {
          window.clearInterval(timer);
          window.setTimeout(() => setDone(true), 280);
          return 100;
        }
        return next;
      });
    }, 34);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className={`loader ${done ? "is-hidden" : ""}`} aria-hidden="true">
      <span>{String(count).padStart(3, "0")}</span>
    </div>
  );
}
