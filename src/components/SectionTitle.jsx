import React from "react";

export function SectionTitle({ eyebrow, first, second, copy }) {
  return (
    <div className="mb-12 max-w-5xl md:mb-20">
      <p data-reveal className="eyebrow">
        {eyebrow}
      </p>
      <h2 data-reveal className="split-heading">
        {first}
        <span>{second}</span>
      </h2>
      {copy && (
        <p data-reveal className="mt-7 max-w-3xl text-lg leading-8 text-ink/75 md:text-xl">
          {copy}
        </p>
      )}
    </div>
  );
}
