import type { SliderTestimonial, TestimonialHeader } from "@/types/home";
import { acfImageUrl } from "@/lib/acf-helpers";

type Props = {
  testimonial?: TestimonialHeader[];
  sliderTestimonial?: SliderTestimonial[];
};

/** Replaces index.php testimonial + slider_testimonial */
export default function TestimonialsSection({ testimonial, sliderTestimonial }: Props) {
  const header = testimonial?.[0];

  return (
    <section className="home-section home-section--testimonials">
      {header && (
        <div className="home-section__header home-section__header--center">
          <h2 className="home-section__label">{header.heading}</h2>
          <h3 className="home-section__title">{header.sub_heading}</h3>
          <p>{header.content}</p>
        </div>
      )}
      <div className="home-testimonials">
        {sliderTestimonial?.map((item, idx) => (
          <article key={idx} className="home-testimonial">
            <div className="home-testimonial__author">
              {item.avatar && (
                <img src={acfImageUrl(item.avatar)} alt="" className="home-testimonial__avatar" />
              )}
              {item.company_logo && (
                <img src={acfImageUrl(item.company_logo)} alt="" />
              )}
              <h3>{item.name}</h3>
              <p>{item.designation}</p>
              <p>{item.company}</p>
            </div>
            <div className="home-testimonial__quote">
              {item.service_heading && <span>{item.service_heading}</span>}
              <p>{item.content}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
