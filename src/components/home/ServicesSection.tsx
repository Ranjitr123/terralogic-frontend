import type { SliderService, TechnologiesSection } from "@/types/home";
import { acfImageUrl } from "@/lib/acf-helpers";

type Props = {
  sliderService?: SliderService[];
  technologiesSection?: TechnologiesSection[];
};

/** Replaces index.php slider_service + technologies_section */
export default function ServicesSection({ sliderService, technologiesSection }: Props) {
  return (
    <section className="home-section">
      {sliderService?.map((block, idx) => (
        <div key={idx}>
          <div className="home-section__header">
            <h2 className="home-section__label">{block.heading}</h2>
            <h3 className="home-section__title">{block.service_subheading}</h3>
          </div>
          <div className="home-grid home-grid--3">
            {block.cards_section?.map((card, cardIdx) => (
              <article key={cardIdx} className="home-card">
                {card.image && (
                  <img src={acfImageUrl(card.image)} alt="" className="home-card__icon" />
                )}
                <h4 className="home-card__title">{card.title}</h4>
                <p className="home-card__desc">{card.content}</p>
                {card.button_link && (
                  <a href={card.button_link} className="home-link">
                    {card.button_name} →
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      ))}

      {technologiesSection?.map((tech, idx) => (
        <div key={`tech-${idx}`} className="home-tech">
          <h3 className="home-section__title">{tech.heading}</h3>
          <ul className="home-tech__list">
            {tech.section_cards?.map((item, itemIdx) => (
              <li key={itemIdx} className="home-tech__item">
                {item.image && (
                  <img src={acfImageUrl(item.image)} alt="" className="home-card__icon" />
                )}
                <h4>{item.section_heading}</h4>
                <p>{item.section_content}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
