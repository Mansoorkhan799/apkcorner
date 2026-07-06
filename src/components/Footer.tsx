import { getSiteName } from "@/lib/seo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-zinc-900">{getSiteName()}</p>
            <p className="mt-1 text-sm text-zinc-500">
              Teen Patti APK downloads, guides, and earning tips for Pakistan.
            </p>
          </div>
          <p className="text-sm text-zinc-400">
            © {year} {getSiteName()}. All rights reserved.
          </p>
        </div>
        <p className="mt-6 text-xs leading-relaxed text-zinc-400">
          Disclaimer: Content is for informational purposes only. Earning game terms,
          payouts, and macro availability may change. Always verify before use.
        </p>
      </div>
    </footer>
  );
}
