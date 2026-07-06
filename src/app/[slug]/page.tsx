import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import SiteLayout from "@/components/SiteLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
import WordPressContent from "@/components/WordPressContent";
import JsonLd from "@/components/JsonLd";
import { buildPostMetadata, getSiteName } from "@/lib/seo";
import { buildPostSchemaGraph } from "@/lib/schema/builders";
import {
  getAllPostSlugs,
  getFeaturedImage,
  getPostBySlug,
  getPostCategories,
  stripHtml,
} from "@/lib/wordpress";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getPostBySlug(slug);
    if (!post) return {};
    return buildPostMetadata(post, `/${slug}`);
  } catch {
    return {};
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;

  let post: Awaited<ReturnType<typeof getPostBySlug>> = null;

  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  if (!post) notFound();

  const featured = getFeaturedImage(post);
  const categories = getPostCategories(post);
  const postTitle = stripHtml(post.title.rendered);

  const breadcrumbs = [
    { label: getSiteName(), href: "/" },
    { label: "Guides", href: "/blog" },
    { label: postTitle },
  ];

  const schemaGraph = buildPostSchemaGraph(post, slug, categories, breadcrumbs);

  return (
    <SiteLayout>
      <JsonLd data={schemaGraph} />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.modified !== post.date && (
            <>
              <span aria-hidden="true">·</span>
              <span>
                Updated{" "}
                {new Date(post.modified).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </>
          )}
          {categories.map((cat) => (
            <span key={cat.id} className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
              {cat.name}
            </span>
          ))}
        </div>

        {featured && (
          <figure className="mb-10 overflow-hidden rounded-xl">
            <Image
              src={featured.url}
              alt={featured.alt}
              width={featured.width ?? 1200}
              height={featured.height ?? 630}
              className="h-auto w-full"
              priority
            />
          </figure>
        )}

        {/* WordPress content includes H1, H2, H3, images — rendered as-is */}
        <WordPressContent html={post.content.rendered} />
      </article>
    </SiteLayout>
  );
}
