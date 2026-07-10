import {
  buildPagesSitemapEntries,
  renderUrlset,
  xmlResponse,
} from "@/lib/sitemap";

export const revalidate = 3600;

/** Pages / posts / categories sitemap → /sitemap.xml */
export async function GET() {
  const entries = await buildPagesSitemapEntries();
  return xmlResponse(renderUrlset(entries));
}
