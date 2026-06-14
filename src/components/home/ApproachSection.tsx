import type { ApproachContent, OurApproachItem, XenwingoContent } from "@/types/home";
import { acfImageUrl } from "@/lib/acf-helpers";

type Props = {
  approachContent?: ApproachContent[];
  ourApproach?: OurApproachItem[];
  xenwingoContent?: XenwingoContent[];
};

/** Replaces index.php approach_content + our_approach + xenwingo_content */
export default function ApproachSection({
  approachContent,
  ourApproach,
  xenwingoContent,
}: Props) {
  const header = approachContent?.[0];
  const cta = xenwingoContent?.[0];

  return (
    <section className="home-section">
      <div className="home-section__header">
        <h2 className="home-section__label">{header?.main_heading}</h2>
        <h3 className="home-section__title">{header?.sub_heading}</h3>
      </div>
      <ul className="home-grid home-grid--4">
        {ourApproach?.map((item, idx) => (
          <li key={idx} className="home-card">
            {item.image && (
              <img src={acfImageUrl(item.image)} alt="" className="home-card__icon" />
            )}
            <h4>{item.content_heading}</h4>
            <p>{item.descriptions}</p>
          </li>
        ))}
      </ul>
      {cta && (
        <div className="home-cta">
          {cta.small_image && (
            <img src={acfImageUrl(cta.small_image)} alt="" className="home-cta__bg" />
          )}
          {cta.image && (
            <img src={acfImageUrl(cta.image)} alt="" className="home-cta__person" />
          )}
          <h4>{cta.descriptions}</h4>
          {cta.button_link && (
            <a href={cta.button_link} className="home-btn home-btn--white">
              {cta.button_text}
            </a>
          )}
        </div>
      )}
    </section>
  );
}
