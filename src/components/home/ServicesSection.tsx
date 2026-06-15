import type { ServiceCardItem, ServicesBlock } from "@/types/home";

type Props = {
  section?: ServicesBlock;
};

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\r\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getCards(section?: ServicesBlock): ServiceCardItem[] {
  return (
    section?.service_cards ??
    section?.cards_section ??
    section?.cards ??
    []
  );
}

function getLabel(section?: ServicesBlock): string | undefined {
  if (section?.title) return section.title;
  if (section?.service_subheading) return section.heading;
  if (section?.sub_heading) return section.sub_heading;
  return undefined;
}

function getTitle(section?: ServicesBlock): string | undefined {
  if (section?.title) return section.heading;
  if (section?.service_subheading) return section.service_subheading;
  if (section?.sub_heading && section?.heading) return section.heading;
  return section?.heading;
}

function cardImage(card: ServiceCardItem): string | undefined {
  const src = card.icon ?? card.image;
  return src || undefined;
}

function cardDescription(card: ServiceCardItem): string | undefined {
  const raw = card.description ?? card.content;
  if (!raw) return undefined;
  return raw.includes("<") ? stripHtml(raw) : raw.replace(/\r\n/g, " ").trim();
}

function cardLink(card: ServiceCardItem): string | undefined {
  return card.cta_url ?? card.button_link;
}

function cardLinkText(card: ServiceCardItem): string {
  return card.cta_text ?? card.button_name ?? "Know More";
}

export default function ServicesSection({ section }: Props) {
  const cards = getCards(section);
  const label = getLabel(section);
  const title = getTitle(section);

  if (!label && !title && !cards.length) return null;

  return (
    <section className="home-services">
      <div className="home-services__inner">
        {(label || title) && (
          <header className="home-services__header">
            {label && <p className="home-services__label">{label}</p>}
            {title && <h2 className="home-services__title">{title}</h2>}
          </header>
        )}

        {cards.length > 0 && (
          <div className="home-services__grid">
            {cards.map((card, idx) => {
              const link = cardLink(card);
              const linkText = cardLinkText(card);
              const description = cardDescription(card);
              const image = cardImage(card);

              return (
                <article key={idx} className="home-services__card">
                  {image && (
                    <img
                      src={image}
                      alt=""
                      className="home-services__icon"
                    />
                  )}
                  {card.title && (
                    <h3 className="home-services__card-title">{card.title}</h3>
                  )}
                  {description && (
                    <p className="home-services__card-desc">{description}</p>
                  )}
                  {link && (
                    <a href={link} className="home-services__link">
                      {linkText}
                      <span aria-hidden>→</span>
                    </a>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
