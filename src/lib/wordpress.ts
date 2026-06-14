import type { WpPage } from "@/types/home";

const WP_API = process.env.WORDPRESS_API_URL;

if (!WP_API) {
  console.warn("WORDPRESS_API_URL is not set in .env.local");
}

type FetchOptions = {
  revalidate?: number | false;
};

async function wpFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  if (!WP_API) {
    throw new Error("WORDPRESS_API_URL is not set in .env.local");
  }

  const url = `${WP_API.replace(/\/$/, "")}${path}`;
  const revalidate = options.revalidate ?? 60;

  let res: Response;
  try {
    res = await fetch(url, {
      next: revalidate === false ? undefined : { revalidate },
    });
  } catch {
    throw new Error(
      `Cannot reach WordPress at ${WP_API}. Is XAMPP running? Is the URL correct?`
    );
  }

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `WordPress API ${res.status} for ${path}${body ? `: ${body.slice(0, 200)}` : ""}`
    );
  }

  return res.json() as Promise<T>;
}

/** Fetch any page by slug — e.g. getPageBySlug('contact-us') */
export async function getPageBySlug(slug: string): Promise<WpPage | null> {
  const pages = await wpFetch<WpPage[]>(
    `/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&acf_format=standard`
  );
  return pages[0] ?? null;
}

/** Fetch page by WordPress post ID */
export async function getPageById(id: number): Promise<WpPage> {
  return wpFetch<WpPage>(`/wp-json/wp/v2/pages/${id}?acf_format=standard`);
}

/**
 * Fetches the homepage (same content as index.php "New home" template).
 * Tries custom endpoint first, then falls back to slug or page ID.
 */
export async function getHomePage(): Promise<WpPage> {
  const homeSlug = process.env.HOME_PAGE_SLUG || "home-page-2";
  const homeId = process.env.HOME_PAGE_ID
    ? Number(process.env.HOME_PAGE_ID)
    : null;

  try {
    return await wpFetch<WpPage>(
      "/wp-json/terralogic/v1/homepage?acf_format=standard"
    );
  } catch {
    // Custom endpoint not deployed yet — use standard WP REST API
  }

  if (homeId) {
    return getPageById(homeId);
  }

  const page = await getPageBySlug(homeSlug);
  if (!page) {
    throw new Error(
      `Homepage not found. Set HOME_PAGE_SLUG or HOME_PAGE_ID in .env.local (current slug: ${homeSlug})`
    );
  }

  return page;
}
