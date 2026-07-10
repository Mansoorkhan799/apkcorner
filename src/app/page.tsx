import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import PostColumn from "@/components/PostColumn";
import SiteInfoTable from "@/components/SiteInfoTable";
import FadeIn from "@/components/motion/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { getCategoryBySlug, getPostsByCategory } from "@/lib/wordpress";

export const revalidate = 3600;

const features = [
  {
    title: "Verified APK Files",
    description:
      "Every guide is tested with the latest app versions, direct download links, and safe install steps for Android users in Pakistan.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: "Clear Install Guides",
    description:
      "Structured articles with screenshots, FAQs, and step-by-step instructions — from download to first launch.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    title: "Local Payment Coverage",
    description:
      "We explain JazzCash, Easypaisa, and withdrawal rules so you know how payouts work before you install any app.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
      </svg>
    ),
  },
  {
    title: "Honest Reviews",
    description:
      "No hype or fake promises. We cover risks, earning limits, and app policies so you can decide with confidence.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
      </svg>
    ),
  },
];

const stats = [
  { value: "500K+", label: "Monthly readers" },
  { value: "100%", label: "Free guides" },
  { value: "PK", label: "Pakistan focused" },
];

export default async function HomePage() {
  let teenPattiPosts: Awaited<ReturnType<typeof getPostsByCategory>> = [];
  let earningGamesPosts: Awaited<ReturnType<typeof getPostsByCategory>> = [];
  let wpConnected = true;

  try {
    const [teenPattiCategory, earningGamesCategory] = await Promise.all([
      getCategoryBySlug("teen-patti-games"),
      getCategoryBySlug("new-earning-games"),
    ]);

    const [teenPatti, earningGames] = await Promise.all([
      teenPattiCategory
        ? getPostsByCategory(teenPattiCategory.id)
        : Promise.resolve([]),
      earningGamesCategory
        ? getPostsByCategory(earningGamesCategory.id)
        : Promise.resolve([]),
    ]);

    teenPattiPosts = teenPatti.slice(0, 6);
    earningGamesPosts = earningGames.slice(0, 6);
  } catch {
    wpConnected = false;
  }

  return (
    <SiteLayout>
      {/* Hero */}
      <FadeIn as="section" className="relative overflow-hidden border-b border-border py-14 sm:py-16 md:py-24">
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-raised px-3.5 py-1.5 text-xs font-medium text-body">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                APK Corner · apkcorner.com.pk
              </div>

              <h1 className="mt-6 text-[1.75rem] font-bold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
                Pakistan&apos;s Trusted{" "}
                <span className="text-accent">APK Download Hub</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-body sm:text-lg">
                Verified APK files, honest app reviews, and step-by-step guides —
                curated for Android users across Pakistan.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/blog"
                  className="btn-primary inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm"
                >
                  Browse All Guides
                </Link>
                <Link
                  href="/about-us"
                  className="btn-secondary inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm"
                >
                  About APK Corner
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8 sm:max-w-lg">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-xl font-bold text-white sm:text-2xl">{stat.value}</p>
                    <p className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <FadeIn delay={0.12} className="lg:pl-2">
              <SiteInfoTable />
            </FadeIn>
          </div>
        </div>
      </FadeIn>

      {/* Latest guides */}
      <FadeIn as="section" className="border-b border-border py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-label">Latest Content</p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Popular Guides & Downloads
              </h2>
              <p className="mt-2 max-w-xl text-body">
                Fresh APK downloads, earning tips, and in-depth reviews — updated regularly on apkcorner.com.pk.
              </p>
            </div>
            <Link
              href="/blog"
              className="shrink-0 text-sm font-semibold text-accent transition hover:text-accent-bright"
            >
              View all guides →
            </Link>
          </div>

          {!wpConnected ? (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-8 text-center">
              <p className="font-semibold text-amber-100">Guides loading soon</p>
              <p className="mt-2 text-sm text-amber-200/80">
                New articles are published regularly. Check back shortly.
              </p>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
              <PostColumn
                title="Teen Patti Games"
                description="Fresh downloads, earning tips, and game reviews"
                categorySlug="teen-patti-games"
                posts={teenPattiPosts}
              />
              <PostColumn
                title="New Earning Games"
                description="Latest Pakistani earning apps and play-to-earn guides"
                categorySlug="new-earning-games"
                posts={earningGamesPosts}
              />
            </div>
          )}
        </div>
      </FadeIn>

      {/* Features */}
      <FadeIn as="section" className="border-b border-border bg-surface-alt py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-label">Why APK Corner</p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Built for Safe, Informed Downloads
            </h2>
            <p className="mt-3 text-body">
              We publish detailed guides — not spam. Every article is structured
              for clarity from download to withdrawal.
            </p>
          </div>

          <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <StaggerItem
                key={feature.title}
                className="panel group rounded-2xl p-6 transition hover:border-accent/60"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border-strong bg-surface-raised text-accent">
                  {feature.icon}
                </div>
                <h3 className="mt-5 font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  {feature.description}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </FadeIn>

      {/* About */}
      <FadeIn as="section" className="border-b border-border py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="section-label">About Us</p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Independent. Transparent. Pakistan-First.
              </h2>
              <p className="mt-5 leading-relaxed text-body">
                APK Corner is an editorial platform helping users in Pakistan find
                safe APK downloads, understand earning mechanics, and avoid scams.
                We research apps, test withdrawal methods, and publish transparent
                guides — completely free.
              </p>
              <p className="mt-4 leading-relaxed text-body">
                We are not a gambling operator. We do not host games or process
                payments. Our role is to inform and educate so you can make
                responsible choices on your own terms.
              </p>
              <Link
                href="/who-we-are"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition hover:text-accent-bright"
              >
                Meet the team
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="panel rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-white">Our Commitment</h3>
              <ul className="mt-5 space-y-3.5 text-sm text-body">
                {[
                  "Honest reviews with pros and cons included",
                  "Regular updates when apps change policies",
                  "Responsible gaming resources for all readers",
                  "Clear disclaimers on every guide",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface-raised text-xs text-accent">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/responsible-gaming"
                className="btn-secondary mt-7 block rounded-xl px-4 py-3.5 text-center text-sm"
              >
                Responsible Gaming Policy
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* CTA */}
      <FadeIn as="section" className="py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="panel rounded-3xl px-6 py-12 text-center sm:px-12 sm:py-14">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Questions or App Suggestions?
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-body">
                We welcome feedback, correction requests, and review suggestions
                from readers across Pakistan.
              </p>
              <Link
                href="/contact-us"
                className="btn-primary mt-8 inline-flex rounded-xl px-8 py-3.5 text-sm"
              >
                Contact APK Corner
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </SiteLayout>
  );
}
