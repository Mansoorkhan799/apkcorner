import Link from "next/link";
import PostCard from "@/components/PostCard";
import type { WPPost } from "@/types/wordpress";

interface PostColumnProps {
  title: string;
  description: string;
  categorySlug: string;
  posts: WPPost[];
}

export default function PostColumn({
  title,
  description,
  categorySlug,
  posts,
}: PostColumnProps) {
  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
          <p className="mt-1.5 text-sm text-zinc-400">{description}</p>
        </div>
        <Link
          href={`/category/${categorySlug}`}
          className="shrink-0 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
        >
          View all →
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="rounded-xl border border-zinc-800 bg-zinc-800/20 px-4 py-8 text-center text-sm text-zinc-500">
          New guides coming soon.
        </p>
      ) : (
        <div className="grid gap-5">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
