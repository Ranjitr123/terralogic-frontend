import { getHomePage } from "@/lib/wordpress";
import BannerSlider from "@/components/home/BannerSlider";
import ServicesSection from "@/components/home/ServicesSection";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let data;
  let error: string | null = null;

  try {
    data = await getHomePage();
  } catch (err) {
    error = err instanceof Error ? err.message : "Unknown error";
  }

  if (error) {
    return (
      <main style={{ padding: "2rem", maxWidth: 720 }}>
        <h1>WordPress API unavailable</h1>
        <p style={{ color: "crimson" }}>{error}</p>
        <h2>Common fixes</h2>
        <ol>
          <li>
            Start XAMPP and confirm{" "}
            <code>
              POST {process.env.WORDPRESS_API_URL}/wp-json/api/pages/home
            </code>{" "}
            returns JSON in your API client.
          </li>
          <li>
            Set <code>WORDPRESS_API_URL</code> in <code>.env.local</code> (e.g.{" "}
            <code>http://localhost:8080/terralogic-backend</code>).
          </li>
          <li>
            Open <a href="/api-debug">/api-debug</a> to inspect the raw response.
          </li>
        </ol>
      </main>
    );
  }

  const slides = data?.hero_banner?.sliders ?? [];
  const services = data?.slider_service ?? data?.our_services;

  return (
    <main>
      <BannerSlider slides={slides} />
      <ServicesSection section={services} />
    </main>
  );
}

export async function generateMetadata() {
  try {
    const data = await getHomePage();
    const firstSlide = data.hero_banner?.sliders?.[0];
    return {
      title: firstSlide?.heading ?? "Terralogic",
      description: firstSlide?.description,
    };
  } catch {
    return { title: "Terralogic" };
  }
}
