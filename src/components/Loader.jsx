import React from "react";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";

export function Loader() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState("counting");
  const [tiles, setTiles] = useState([]);
  const tileRefs = useRef([]);
  const loaderRef = useRef(null);

  const prefersReducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    const buildTiles = () => {
      if (prefersReducedMotion || phase !== "counting") return;

      const targetSize = window.innerWidth < 640 ? 118 : 188;
      const columns = Math.ceil(window.innerWidth / targetSize);
      const rows = Math.ceil(window.innerHeight / targetSize);
      const directions = ["top-bottom", "bottom-top", "left-right", "right-left"];
      const positions = [];

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          positions.push({ row, column });
        }
      }

      const shuffled = [...positions].sort(() => Math.random() - 0.5);
      const orderMap = new Map(shuffled.map((position, index) => [`${position.row}-${position.column}`, index]));
      const batchSize = 3;
      const batchGap = 0.3;
      const nextTiles = positions.map(({ row, column }) => {
        const order = orderMap.get(`${row}-${column}`) || 0;
        const group = Math.floor(order / batchSize);

        return {
          id: `${row}-${column}`,
          column,
          row,
          direction: directions[Math.floor(Math.random() * directions.length)],
          delay: Number((group * batchGap + Math.random() * 0.045).toFixed(3)),
          duration: Number((0.46 + Math.random() * 0.1).toFixed(3))
        };
      });

      tileRefs.current = [];
      setTiles(nextTiles);
    };

    buildTiles();
    window.addEventListener("resize", buildTiles);

    return () => window.removeEventListener("resize", buildTiles);
  }, [phase, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase("complete");
      return undefined;
    }

    const timer = window.setInterval(() => {
      setCount((value) => {
        const next = value + Math.ceil((100 - value) / 7);
        if (next >= 100) {
          window.clearInterval(timer);
          window.setTimeout(() => setPhase("reveal"), 340);
          return 100;
        }
        return next;
      });
    }, 34);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (phase !== "reveal") return undefined;

    if (!tiles.length) {
      const fallback = window.setTimeout(() => setPhase("complete"), 360);
      return () => window.clearTimeout(fallback);
    }

    const directionMap = {
      "top-bottom": { axis: "rotateX", angle: -112, origin: "50% 100%" },
      "bottom-top": { axis: "rotateX", angle: 112, origin: "50% 0%" },
      "left-right": { axis: "rotateY", angle: 112, origin: "100% 50%" },
      "right-left": { axis: "rotateY", angle: -112, origin: "0% 50%" }
    };

    const ctx = gsap.context(() => {
      const revealStart = 0.22;
      const settleBuffer = 0.28;
      const maxTileEnd = Math.max(...tiles.map((tile) => tile.delay + tile.duration));
      const timeline = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => setPhase("complete")
      });

      timeline.to(".loader-count", {
        opacity: 0,
        y: -18,
        scale: 0.96,
        duration: 0.32,
        ease: "power2.out"
      });

      tileRefs.current.forEach((tile, index) => {
        if (!tile) return;

        const data = tiles[index];
        const direction = directionMap[data.direction];

        gsap.set(tile, {
          transformOrigin: direction.origin,
          transformPerspective: 900,
          rotateX: 0,
          rotateY: 0,
          z: 0,
          opacity: 1,
          force3D: true
        });

        timeline.to(
          tile,
          {
            [direction.axis]: direction.angle,
            z: 32 + Math.random() * 30,
            filter: "brightness(1.08)",
            boxShadow: "0 14px 22px rgba(0, 0, 0, 0.24)",
            duration: data.duration,
            ease: "power3.in"
          },
          revealStart + data.delay
        );
      });

      timeline.to(
        loaderRef.current,
        {
          autoAlpha: 0,
          duration: 0.22,
          ease: "power2.out"
        },
        revealStart + maxTileEnd + settleBuffer
      );
    }, loaderRef);

    return () => ctx.revert();
  }, [phase, tiles]);

  if (phase === "complete") return null;

  const columns = tiles.reduce((max, tile) => Math.max(max, tile.column + 1), 1);
  const rows = tiles.reduce((max, tile) => Math.max(max, tile.row + 1), 1);

  return (
    <div
      ref={loaderRef}
      className={`loader is-${phase}`}
      style={{ "--loader-columns": columns, "--loader-rows": rows }}
      aria-hidden="true"
    >
      <div className="loader-grid">
        {tiles.map((tile, index) => (
          <span
            ref={(element) => {
              tileRefs.current[index] = element;
            }}
            className={`loader-tile is-${tile.direction}`}
            key={tile.id}
          />
        ))}
      </div>
      <span className="loader-count">{String(count).padStart(3, "0")}</span>
    </div>
  );
}
