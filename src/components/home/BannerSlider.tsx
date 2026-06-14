"use client";

import { useState } from "react";
import type { BannerSlide } from "@/types/home";
import { acfImageAlt, acfImageUrl } from "@/lib/acf-helpers";

type Props = { slides: BannerSlide[] };

/** Replaces index.php banner_slider section (have_rows('banner_slider')) */
export default function BannerSlider({ slides }: Props) {
  const [active, setActive] = useState(0);
  if (!slides.length) return null;

  const slide = slides[active];
  const total = String(slides.length).padStart(2, "0");
  const current = String(active + 1).padStart(2, "0");

  return (
    <section className="home-banner">
      <div className="home-banner__inner">
        <div className="home-banner__content">
          {active === 0 ? (
            <h1 className="home-banner__heading">{slide.heading}</h1>
          ) : (
            <h2 className="home-banner__heading">{slide.heading}</h2>
          )}
          <p className="home-banner__desc">{slide.description}</p>
          {slide.button_link && (
            <a className="home-btn home-btn--primary" href={slide.button_link}>
              {slide.button_name}
            </a>
          )}
          <div className="home-banner__counter">
            <span>{current}.</span>
            <span>{total}</span>
          </div>
        </div>
        <div className="home-banner__media">
          <img
            src={acfImageUrl(slide.image)}
            alt={acfImageAlt(slide.image, slide.heading ?? "Banner")}
            className="home-banner__image"
          />
          <div className="home-banner__nav">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => setActive((i) => (i === 0 ? slides.length - 1 : i - 1))}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => setActive((i) => (i + 1) % slides.length)}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
