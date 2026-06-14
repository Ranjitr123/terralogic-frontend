import type { AboutContent } from "@/types/home";

type Props = { content?: AboutContent[] };

/** Replaces index.php content repeater (about section at bottom) */
export default function AboutSection({ content }: Props) {
  const about = content?.[0];
  if (!about) return null;

  return (
    <section className="home-section home-section--about">
      <div className="home-about">
        <div>
          <h2 className="home-section__label">{about.heading}</h2>
          <h3 className="home-section__title">{about.sub_heading}</h3>
        </div>
        <div>
          <p>{about.descriptions}</p>
          {about.button_link && (
            <a href={about.button_link} className="home-link">
              {about.button_text} →
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
