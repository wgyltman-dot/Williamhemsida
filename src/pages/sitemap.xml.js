export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://williamreviews.com</loc>
    <lastmod>2025-06-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://williamreviews.com/about</loc>
    <lastmod>2025-06-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://williamreviews.com/projects</loc>
    <lastmod>2025-06-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://williamreviews.com/articles</loc>
    <lastmod>2025-06-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://williamreviews.com/media</loc>
    <lastmod>2026-03-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://williamreviews.com/blog</loc>
    <lastmod>2026-03-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
