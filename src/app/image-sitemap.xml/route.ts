import {
  buildImageSitemapEntries,
  renderImageUrlset,
  xmlResponse,
} from "@/lib/sitemap";

export const revalidate = 3600;

/** Google image sitemap → /image-sitemap.xml */
export async function GET() {
  const entries = await buildImageSitemapEntries();
  return xmlResponse(renderImageUrlset(entries));
}
