import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getSiteName } from "@/lib/seo";

interface LegalPageProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function LegalPage({ title, description, children }: LegalPageProps) {
  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Breadcrumbs
          items={[
            { label: getSiteName(), href: "/" },
            { label: title },
          ]}
        />
        <header className="mb-10 border-b border-zinc-200 pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-3 text-lg leading-relaxed text-zinc-500">{description}</p>
          )}
        </header>
        <div className="legal-content space-y-6 text-zinc-600 leading-relaxed">
          {children}
        </div>
        <p className="mt-12 text-sm text-zinc-400">
          Last updated: July 2026 ·{" "}
          <Link href="/contact-us" className="text-emerald-600 hover:text-emerald-700">
            Contact us
          </Link>{" "}
          with questions.
        </p>
      </article>
    </SiteLayout>
  );
}
