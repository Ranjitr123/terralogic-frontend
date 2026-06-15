import type { HeadlessApiResponse, HomePageData } from "@/types/home";

const WP_API = process.env.WORDPRESS_API_URL;

if (!WP_API) {
  console.warn("WORDPRESS_API_URL is not set in .env.local");
}

type FetchOptions = {
  revalidate?: number | false;
};

async function wpFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  if (!WP_API) {
    throw new Error("WORDPRESS_API_URL is not set in .env.local");
  }

  const url = `${WP_API.replace(/\/$/, "")}${path}`;
  const revalidate = options.revalidate ?? 60;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      next: revalidate === false ? undefined : { revalidate },
    });
  } catch {
    throw new Error(
      `Cannot reach WordPress at ${WP_API}. Is the backend running? Is the URL correct?`
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

/** Fetch homepage sections from POST /wp-json/api/pages/home */
export async function getHomePage(): Promise<HomePageData> {
  const response = await wpFetch<HeadlessApiResponse<HomePageData>>(
    "/wp-json/api/pages/home"
  );

  if (!response.status) {
    throw new Error(response.message || "Homepage API returned status: false");
  }

  return response.data ?? {};
}
