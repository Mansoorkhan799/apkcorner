import type { WPCategory, WPPost } from "@/types/wordpress";

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function getFeaturedImage(post: WPPost): {
  url: string;
  alt: string;
  width?: number;
  height?: number;
} | null {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!media?.source_url) return null;

  return {
    url: media.source_url,
    alt: media.alt_text || stripHtml(post.title.rendered),
    width: media.media_details?.width,
    height: media.media_details?.height,
  };
}

export function getPostCategories(post: WPPost): WPCategory[] {
  return post._embedded?.["wp:term"]?.[0] ?? [];
}

/** Rewrite relative WordPress URLs in content to absolute URLs */
export function fixContentUrls(html: string, origin: string): string {
  if (!origin) return html;

  return html
    .replace(/(src|href|srcset)="\/wp-content/g, `$1="${origin}/wp-content`)
    .replace(/(src|href|srcset)='\/wp-content/g, `$1='${origin}/wp-content`)
    .replace(/url\(\/wp-content/g, `url(${origin}/wp-content`)
    .replace(/,\/wp-content/g, `,${origin}/wp-content`);
}
