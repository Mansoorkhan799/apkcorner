import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import PostCard from "@/components/PostCard";
import { getPosts } from "@/lib/wordpress";

export const revalidate = 3600;

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
      <section className="border-b border-zinc-200 bg-gradient-to-b from-emerald-50/80 to-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
            Teen Patti APK Pakistan
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            APK Downloads, Guides &amp; Earning Tips
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-600">
            Latest Teen Patti APKs, step-by-step guides, and earning strategies —
            published from WordPress, live on teenpattiapks.com.pk.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Browse All Guides
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        {!wpConnected ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
            <p className="font-semibold">WordPress not connected yet</p>
            <p className="mt-2 text-sm leading-relaxed">
              Add your <code className="rounded bg-amber-100 px-1">WORDPRESS_API_URL</code> to{" "}
              <code className="rounded bg-amber-100 px-1">.env.local</code> and install the
              headless snippet on WordPress. Posts will appear here automatically.
            </p>
          </div>
        ) : posts.length === 0 ? (
          <p className="text-zinc-500">No posts published yet. Create your first post in WordPress.</p>
        ) : (
          <>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900">Latest Guides</h2>
                <p className="mt-1 text-zinc-500">Fresh content from WordPress</p>
              </div>
              <Link
                href="/blog"
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
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
      </section>
    </SiteLayout>
  );
}
