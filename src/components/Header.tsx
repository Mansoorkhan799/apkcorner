import Link from "next/link";
import { getSiteName } from "@/lib/seo";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-xl font-bold tracking-tight text-zinc-900">
          {getSiteName()}
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-zinc-600">
          <Link href="/" className="transition-colors hover:text-zinc-900">
            Home
          </Link>
          <Link href="/blog" className="transition-colors hover:text-zinc-900">
            Guides
          </Link>
        </nav>
      </div>
    </header>
  );
}
