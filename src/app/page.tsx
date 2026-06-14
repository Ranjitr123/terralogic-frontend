import { getHomePage } from "@/lib/wordpress";
import type { HomeAcf } from "@/types/home";
import BannerSlider from "@/components/home/BannerSlider";
import ServicesSection from "@/components/home/ServicesSection";
import AwardsSection from "@/components/home/AwardsSection";
import ClientsSection from "@/components/home/ClientsSection";
import WorkSection from "@/components/home/WorkSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ApproachSection from "@/components/home/ApproachSection";
import AboutSection from "@/components/home/AboutSection";

export const dynamic = "force-dynamic";

/**
 * Homepage — same content as wp-content/themes/terralogic/index.php
 * Data source: GET /wp-json/terralogic/v1/homepage
 */
export default async function HomePage() {
  let acf: HomeAcf = {};

  let acfWarning: string | null = null;

  try {
    const page = await getHomePage();
    acf = page.acf ?? {};

    if (!acf.banner_slider?.length && Object.keys(acf).length === 0) {
      acfWarning =
        "WordPress is connected but ACF fields are empty in the API. Deploy the backend changes (inc/headless-api.php) to production, then verify: https://terralogic.com/wp-json/wp/v2/pages/3482 — the acf object should contain banner_slider.";
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return (
      <main style={{ padding: "2rem", maxWidth: 720 }}>
        <h1>WordPress API unavailable</h1>
        <p style={{ color: "crimson" }}>{message}</p>
        <h2>Common fixes</h2>
        <ol>
          <li>
            <strong>Local XAMPP:</strong> This repo has no <code>wp-config.php</code>{" "}
            yet — WordPress is not installed locally. Import the DB and add{" "}
            <code>wp-config.php</code>, or use production URL in{" "}
            <code>.env.local</code>.
          </li>
          <li>
            <strong>Check API:</strong> open{" "}
            <a href="/api-debug">/api-debug</a> to see the raw JSON response.
          </li>
          <li>
            <strong>Env:</strong> set <code>WORDPRESS_API_URL</code> in{" "}
            <code>.env.local</code> (currently points to production).
          </li>
        </ol>
      </main>
    );
  }

  return (
    <main>
      {acfWarning && (
        <div
          style={{
            background: "#fff3cd",
            border: "1px solid #ffc107",
            padding: "1rem 2rem",
            margin: "1rem",
            borderRadius: 8,
          }}
        >
          <strong>ACF not in API yet:</strong> {acfWarning}
        </div>
      )}
      <BannerSlider slides={acf.banner_slider ?? []} />

      <ServicesSection
        sliderService={acf.slider_service}
        technologiesSection={acf.technologies_section}
      />

      <AwardsSection heading={acf.awards_heading} recognition={acf.recognition} />

      <ClientsSection
        clientContent={acf.client_content}
        clientSectionImages={acf.client_section_images}
      />

      <WorkSection
        works={acf.works}
        iconSections={acf.icon_sections}
        workImage={acf.workimage}
      />

      <TestimonialsSection
        testimonial={acf.testimonial}
        sliderTestimonial={acf.slider_testimonial}
      />

      <ApproachSection
        approachContent={acf.approach_content}
        ourApproach={acf.our_approach}
        xenwingoContent={acf.xenwingo_content}
      />

      <AboutSection content={acf.content} />
    </main>
  );
}

export async function generateMetadata() {
  try {
    const page = await getHomePage();
    return {
      title: page.yoast_head_json?.title ?? page.title.rendered,
      description: page.yoast_head_json?.description,
    };
  } catch {
    return { title: "Terralogic" };
  }
}
