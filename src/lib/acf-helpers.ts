/** ACF image field can be a URL string or a media object from REST API. */
export type AcfImage =
  | string
  | {
      url?: string;
      alt?: string;
      title?: string;
      width?: number;
      height?: number;
    }
  | null
  | undefined;

export function acfImageUrl(image: AcfImage): string {
  if (!image) return "";
  if (typeof image === "string") return image;
  return image.url ?? "";
}

export function acfImageAlt(image: AcfImage, fallback = ""): string {
  if (!image) return fallback;
  if (typeof image === "string") return fallback;
  return image.alt || fallback;
}
