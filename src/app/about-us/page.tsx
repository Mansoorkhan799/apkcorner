import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { buildSiteMetadata } from "@/lib/seo";

export const metadata: Metadata = buildSiteMetadata(
  "About Us",
  "Learn about Teen Patti APKs — Pakistan's independent guide for Teen Patti APK downloads, earning tips, and honest game reviews.",
  "/about-us"
);

export default function AboutUsPage() {
  return (
    <LegalPage
      title="About Us"
      description="Who we are and what we stand for."
    >
      <p>
        <strong>Teen Patti APKs</strong> (teenpattiapks.com.pk) is an independent
        editorial website created to serve players in Pakistan who want reliable
        information about Teen Patti and earning game applications.
      </p>
      <h2 className="text-xl font-semibold text-zinc-900">Our Mission</h2>
      <p>
        We publish clear, well-researched guides that help users safely download
        APK files, understand in-app earning mechanics, and navigate withdrawal
        options such as JazzCash and Easypaisa. Our goal is transparency — not
        hype.
      </p>
      <h2 className="text-xl font-semibold text-zinc-900">What We Do</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Publish APK download and installation guides</li>
        <li>Review earning apps with honest pros and cons</li>
        <li>Explain payment methods available in Pakistan</li>
        <li>Update content when apps change terms or features</li>
        <li>Promote responsible gaming practices</li>
      </ul>
      <h2 className="text-xl font-semibold text-zinc-900">What We Don&apos;t Do</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>We do not operate or host any gambling games</li>
        <li>We do not process deposits or withdrawals</li>
        <li>We are not affiliated with any app developer unless clearly stated</li>
        <li>We do not guarantee earnings from any application</li>
      </ul>
      <p>
        For more about our team and editorial standards, visit our{" "}
        <a href="/who-we-are" className="text-emerald-600 hover:underline">
          Who We Are
        </a>{" "}
        page or{" "}
        <a href="/contact-us" className="text-emerald-600 hover:underline">
          get in touch
        </a>
        .
      </p>
    </LegalPage>
  );
}
