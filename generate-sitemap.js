import { SitemapStream, streamToPromise } from 'sitemap';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

async function generateSitemap() {
  // Replace with your actual portfolio URL
  const sitemap = new SitemapStream({ hostname: 'https://subratachowdhuryportfolio.vercel.app' });

  // Define the main pages of your portfolio with priority and update frequency
  sitemap.write({ url: '/', changefreq: 'weekly', priority: 1.0 });        // Home page
//   sitemap.write({ url: '/about', changefreq: 'monthly', priority: 0.8 });   // About page
  sitemap.write({ url: '/Projects', changefreq: 'weekly', priority: 0.9 }); // Projects page
  sitemap.write({ url: '/Internships', changefreq: 'monthly', priority: 0.7 }); // Contact page

  // End sitemap generation
  sitemap.end();

  // Convert sitemap stream to XML and save it in the public directory
  const sitemapXML = await streamToPromise(sitemap).then((data) => data.toString());
  const __dirname = dirname(fileURLToPath(import.meta.url));

  writeFileSync(join(__dirname, 'public', 'sitemap.xml'), sitemapXML);

  console.log('Sitemap generated successfully.');
}

// Execute the sitemap generation
generateSitemap().catch(console.error);
