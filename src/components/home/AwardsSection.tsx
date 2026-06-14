import type { RecognitionItem } from "@/types/home";
import { acfImageUrl } from "@/lib/acf-helpers";

type Props = {
  heading?: string;
  recognition?: RecognitionItem[];
};

/** Replaces index.php awards_heading + recognition repeater */
export default function AwardsSection({ heading, recognition }: Props) {
  if (!heading && !recognition?.length) return null;

  return (
    <section className="home-section home-section--awards">
      <h2 className="home-section__title">{heading}</h2>
      <div className="home-grid home-grid--4">
        {recognition?.map((item, idx) => (
          <article key={idx} className="home-award">
            {item.image && (
              <img src={acfImageUrl(item.image)} alt="" className="home-award__logo" />
            )}
            <p>{item.content}</p>
            {item.button_link && (
              <a href={item.button_link}>
                <h3>{item.button_text}</h3>
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
