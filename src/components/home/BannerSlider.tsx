"use client";

import { useState } from "react";
import type { HeroBannerSlide } from "@/types/home";

type Props = { slides: HeroBannerSlide[] };

function ChevronLeft() {
  return (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden>
      <path
        d="M8 2L2 8L8 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" aria-hidden>
      <path
        d="M2 2L8 8L2 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BannerSlider({ slides }: Props) {
  const [active, setActive] = useState(0);
  if (!slides.length) return null;

  const slide = slides[active];
  const total = String(slides.length).padStart(2, "0");
  const current = String(active + 1).padStart(2, "0");
  const progress = ((active + 1) / slides.length) * 100;

  const goPrev = () => setActive((i) => (i === 0 ? slides.length - 1 : i - 1));
  const goNext = () => setActive((i) => (i + 1) % slides.length);

  const description = slide.description?.replace(/\r\n/g, " ").trim();

  return (
    <section className="home-banner">
      <div className="home-banner__inner">
        <div className="home-banner__content">
          {active === 0 ? (
            <h1 className="home-banner__heading">{slide.heading}</h1>
          ) : (
            <h2 className="home-banner__heading">{slide.heading}</h2>
          )}
          {description && <p className="home-banner__desc">{description}</p>}
          {slide.cta_url && (
            <a className="home-btn home-btn--primary" href={slide.cta_url}>
              {slide.cta_text}
              <span className="home-btn__arrow" aria-hidden>
                →
              </span>
            </a>
          )}
        </div>

        <div className="home-banner__media">
          {slide.image && (
            <img
              src={slide.image}
              alt={slide.heading ?? "Banner"}
              className="home-banner__image"
            />
          )}
        </div>
      </div>

      <div className="home-banner__footer">
        <div className="home-banner__progress">
          <span className="home-banner__progress-num">{current}.</span>
          <div className="home-banner__progress-track">
            <div
              className="home-banner__progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="home-banner__progress-num">{total}.</span>
        </div>

        <div className="home-banner__nav">
          <button type="button" aria-label="Previous slide" onClick={goPrev}>
            <ChevronLeft />
          </button>
          <button type="button" aria-label="Next slide" onClick={goNext}>
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
