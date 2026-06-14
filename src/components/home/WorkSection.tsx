import type { IconSection, WorksSection } from "@/types/home";
import { acfImageUrl } from "@/lib/acf-helpers";
import type { AcfImage } from "@/lib/acf-helpers";

type Props = {
  works?: WorksSection[];
  iconSections?: IconSection[];
  workImage?: AcfImage;
};

/** Replaces index.php works + icon_sections + workimage */
export default function WorkSection({ works, iconSections, workImage }: Props) {
  const workHeader = works?.[0];

  return (
    <section className="home-section">
      <div className="home-section__header">
        <h2 className="home-section__label">{workHeader?.heading}</h2>
        <h3 className="home-section__title">{workHeader?.sub_heading}</h3>
      </div>
      <div className="home-work">
        <ul className="home-work__list">
          {iconSections?.map((item, idx) => (
            <li key={idx} className="home-work__item">
              {item.image && (
                <img src={acfImageUrl(item.image)} alt="" className="home-card__icon" />
              )}
              <div>
                <h4>{item.title}</h4>
                <p>{item.content}</p>
              </div>
            </li>
          ))}
        </ul>
        {workImage && (
          <img
            src={acfImageUrl(workImage)}
            alt="Why work with us"
            className="home-work__image"
          />
        )}
      </div>
    </section>
  );
}
