# APK Corner (apkcorner.com.pk)

Next.js frontend for [apkcorner.com.pk](https://apkcorner.com.pk) — a headless WordPress site publishing APK guides, app reviews, and earning tips for Pakistan.

## Getting Started

Copy the environment template and set your values:

```bash
cp .env.example .env.local
```

Required variables:

- `NEXT_PUBLIC_SITE_URL` — `https://apkcorner.com.pk`
- `NEXT_PUBLIC_SITE_NAME` — `APK Corner`
- `WORDPRESS_API_URL` — `https://ams.apkcorner.com.pk/wp-json`
- `REVALIDATE_SECRET` — shared secret for on-demand cache revalidation

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to preview the site.

## WordPress Integration

WordPress theme files live in `wordpress/kadence-child-teenpatti/`. The standalone setup snippet is in `wordpress/apkcorner-headless.php`.

### Permanent AMS SEO lock (required on live CMS)

Child-theme code alone is easy to lose (theme switch / cache). Use the **must-use plugin** instead:

1. On AMS hosting, create `wp-content/mu-plugins/` if missing
2. Upload `wordpress/mu-plugins/apkcorner-ams-seo.php` into that folder
3. Purge LiteSpeed (and Cloudflare) cache
4. Confirm:
   - `curl -sI https://ams.apkcorner.com.pk/any-post/` → **301** to `https://apkcorner.com.pk/...`
   - `curl -s https://ams.apkcorner.com.pk/robots.txt` → `Disallow: /`

Optional ironclad layer: Cloudflare redirect rules — see `wordpress/mu-plugins/CLOUDFLARE-REDIRECT.txt`.

## Deploy

Build for production:

```bash
npm run build
npm start
```

Set all environment variables on your hosting platform (e.g. Vercel) before deploying.
