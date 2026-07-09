import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildSiteMetadata, getSiteName } from "@/lib/seo";

export const metadata: Metadata = buildSiteMetadata(
  "Contact Us",
  "Get in touch with APK Corner. Send us feedback, corrections, or app review requests.",
  "/contact-us"
);

const contactEmail = "apkcorner.site@gmail.com";

export default function ContactUsPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-12">
        <Breadcrumbs
          items={[
            { label: getSiteName(), href: "/" },
            { label: "Contact Us" },
          ]}
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Contact Us
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-body">
              We read every message. Whether you have a correction, a new app
              suggestion, or a partnership inquiry — we&apos;d love to hear from you.
            </p>

            <div className="mt-10 space-y-6">
              <div className="panel rounded-2xl p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-muted">
                  Email
                </p>
                <a
                  href={`mailto:${contactEmail}`}
                  className="mt-2 block text-lg font-medium text-accent-bright hover:text-white"
                >
                  {contactEmail}
                </a>
              </div>

              <div className="panel rounded-2xl p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-muted">
                  Response Time
                </p>
                <p className="mt-2 text-body">
                  We typically respond within 2–3 business days.
                </p>
              </div>

              <div className="panel rounded-2xl p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-muted">
                  What to Include
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-body">
                  <li>App name and issue you encountered</li>
                  <li>Link to the guide (if applicable)</li>
                  <li>Screenshots if reporting outdated info</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="panel rounded-2xl p-8">
            <h2 className="text-lg font-semibold text-white">Send a Message</h2>
            <p className="mt-2 text-sm text-body">
              Click below to open your email client with a pre-filled subject line.
            </p>
            <a
              href={`mailto:${contactEmail}?subject=APK%20Corner%20-%20Website%20Inquiry`}
              className="btn-primary mt-6 flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-sm"
            >
              Email Us
            </a>
            <p className="mt-6 text-xs leading-relaxed text-muted">
              We do not provide app support, account recovery, or withdrawal
              assistance for third-party games. For app-specific issues, contact
              the developer directly.
            </p>
            <div className="mt-8 border-t border-border-strong pt-6">
              <p className="text-sm text-muted">Before contacting us, you may find answers in:</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/disclaimer" className="text-accent-bright hover:underline">
                    Disclaimer
                  </Link>
                </li>
                <li>
                  <Link href="/responsible-gaming" className="text-accent-bright hover:underline">
                    Responsible Gaming
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-accent-bright hover:underline">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
