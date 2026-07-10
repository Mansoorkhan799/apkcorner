import {
  getSitemapBaseUrl,
  renderSitemapIndex,
  xmlResponse,
} from "@/lib/sitemap";

export const revalidate = 3600;

/** Main sitemap index → /sitemap-index.xml */
export async function GET() {
  const siteUrl = getSitemapBaseUrl();
  const lastmod = new Date().toISOString();

  const xml = renderSitemapIndex([
    { loc: `${siteUrl}/sitemap.xml`, lastmod },
    { loc: `${siteUrl}/image-sitemap.xml`, lastmod },
  ]);

  return xmlResponse(xml);
}
