import Link from "next/link";
import Image from "next/image";
import SiteLayout from "@/components/SiteLayout";
import PostCard from "@/components/PostCard";
import { getPosts } from "@/lib/wordpress";

export const revalidate = 3600;

const features = [
  {
    title: "Verified APK Guides",
    description:
      "Every guide is tested and updated with the latest app versions, download links, and install steps for Android devices in Pakistan.",
    icon: "🛡️",
  },
  {
    title: "Step-by-Step Tutorials",
    description:
      "Clear H1-to-conclusion articles with screenshots, FAQs, and structured steps so you never get stuck during setup.",
    icon: "📋",
  },
  {
    title: "Pakistan Payment Methods",
    description:
      "We cover JazzCash, Easypaisa, and local withdrawal options so you know exactly how payouts work before you play.",
    icon: "💳",
  },
  {
    title: "SEO-Optimised & Honest",
    description:
      "No fake promises. We explain risks, earning limits, and app policies so you can make informed decisions.",
    icon: "✓",
  },
];

const stats = [
  { value: "100%", label: "Free guides" },
  { value: "PK", label: "Pakistan focused" },
  { value: "24/7", label: "Updated content" },
];

export default async function HomePage() {
  let posts: Awaited<ReturnType<typeof getPosts>> = [];
  let wpConnected = true;

  try {
    posts = await getPosts({ per_page: 6 });
  } catch {
    wpConnected = false;
  }

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/40 via-zinc-900 to-zinc-900" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-emerald-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Pakistan&apos;s Teen Patti APK Hub
              </div>
              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
                Download, Play &amp; Earn —{" "}
                <span className="text-emerald-400">The Right Way</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-zinc-400">
                Trusted APK downloads, in-depth earning guides, and honest reviews
                for Teen Patti apps — built for players in Pakistan.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/blog"
                  className="inline-flex items-center rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400"
                >
                  Browse All Guides
                </Link>
                <Link
                  href="/about-us"
                  className="inline-flex items-center rounded-xl border border-zinc-600 px-6 py-3 text-sm font-semibold text-zinc-300 transition hover:border-zinc-500 hover:text-white"
                >
                  About Us
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-zinc-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative rounded-2xl border border-zinc-700/50 bg-zinc-800/50 p-8 backdrop-blur">
                <Image
                  src="/favicon/web-app-manifest-512x512.png"
                  alt="Teen Patti APKs"
                  width={120}
                  height={120}
                  className="mx-auto rounded-2xl shadow-2xl"
                />
                <p className="mt-6 text-center text-sm leading-relaxed text-zinc-400">
                  Independent reviews and guides — we are not affiliated with any
                  game developer or publisher.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {["JazzCash", "Easypaisa", "Android APK", "Urdu/English"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-zinc-700/50 px-3 py-2 text-center text-xs font-medium text-zinc-300"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
              Why Players Trust Us
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-zinc-500">
              We publish detailed, searchable guides — not spam. Every article is
              structured for clarity from download to withdrawal.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 transition hover:border-emerald-200 hover:shadow-md"
              >
                <span className="text-2xl" role="img" aria-hidden="true">
                  {feature.icon}
                </span>
                <h3 className="mt-4 font-semibold text-zinc-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="border-y border-zinc-200 bg-emerald-50/50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                Who We Are
              </p>
              <h2 className="mt-2 text-2xl font-bold text-zinc-900 sm:text-3xl">
                An Independent Guide for Pakistani Players
              </h2>
              <p className="mt-4 leading-relaxed text-zinc-600">
                {`Teen Patti APKs`} is an editorial website dedicated to helping
                players in Pakistan find safe APK downloads, understand earning
                mechanics, and avoid scams. We research apps, test withdrawal
                methods, and publish transparent guides — free of charge.
              </p>
              <p className="mt-4 leading-relaxed text-zinc-600">
                We are not a gambling operator. We do not host games or process
                payments. Our role is to inform and educate so you can play
                responsibly on your own terms.
              </p>
              <Link
                href="/who-we-are"
                className="mt-6 inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Learn more about us →
              </Link>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-white p-8 shadow-sm">
              <h3 className="font-semibold text-zinc-900">Our Commitment</h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                <li className="flex gap-3">
                  <span className="text-emerald-500">✓</span>
                  Honest reviews — pros and cons included
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500">✓</span>
                  Regular updates when apps change policies
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500">✓</span>
                  Responsible gaming resources for all readers
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-500">✓</span>
                  Clear disclaimers on every guide
                </li>
              </ul>
              <Link
                href="/responsible-gaming"
                className="mt-6 block rounded-lg bg-emerald-50 px-4 py-3 text-center text-sm font-medium text-emerald-700 hover:bg-emerald-100"
              >
                Read our Responsible Gaming policy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Guides */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {!wpConnected ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
              <p className="font-semibold">Guides loading soon</p>
              <p className="mt-2 text-sm">New articles are published regularly. Check back shortly.</p>
            </div>
          ) : posts.length === 0 ? (
            <p className="text-center text-zinc-500">New guides coming soon.</p>
          ) : (
            <>
              <div className="mb-10 flex items-end justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
                    Latest Guides
                  </h2>
                  <p className="mt-2 text-zinc-500">
                    Fresh APK downloads, earning tips, and game reviews
                  </p>
                </div>
                <Link
                  href="/blog"
                  className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  View all →
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-900 py-16">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Have a Question or Suggestion?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-zinc-400">
            We welcome feedback, correction requests, and app review suggestions
            from our readers in Pakistan.
          </p>
          <Link
            href="/contact-us"
            className="mt-8 inline-flex rounded-xl bg-emerald-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
