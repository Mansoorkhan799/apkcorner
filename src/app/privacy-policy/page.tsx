import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { buildSiteMetadata } from "@/lib/seo";

export const metadata: Metadata = buildSiteMetadata(
  "Privacy Policy",
  "Privacy Policy for APK Corner (apkcorner.com.pk). Learn how we collect, use, and protect your information.",
  "/privacy-policy"
);

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How we handle your data when you visit apkcorner.com.pk."
    >
      <p>
        This Privacy Policy explains how <strong>APK Corner</strong>{" "}
        (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collects and uses information when you
        visit apkcorner.com.pk (the &quot;Site&quot;).
      </p>
      <h2 className="text-xl font-semibold text-foreground">Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Usage data:</strong> pages visited, browser type, device type,
          referring URL, and general location (country/city level) via analytics
          tools such as Google Analytics.
        </li>
        <li>
          <strong>Cookies:</strong> small files stored on your device to improve
          site performance and measure traffic. You can disable cookies in your
          browser settings.
        </li>
        <li>
          <strong>Contact information:</strong> if you email us, we receive your
          email address and message content.
        </li>
      </ul>
      <h2 className="text-xl font-semibold text-foreground">How We Use Information</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>To operate and improve the Site</li>
        <li>To understand which content is most useful to readers</li>
        <li>To respond to contact requests</li>
        <li>To comply with legal obligations</li>
      </ul>
      <h2 className="text-xl font-semibold text-foreground">Third-Party Services</h2>
      <p>
        We may use third-party services including hosting (Vercel), analytics
        (Google), and advertising networks in the future. These services have
        their own privacy policies governing how they process data.
      </p>
      <h2 className="text-xl font-semibold text-foreground">Data Security</h2>
      <p>
        We implement reasonable technical measures to protect information.
        However, no method of transmission over the internet is 100% secure.
      </p>
      <h2 className="text-xl font-semibold text-foreground">Your Rights</h2>
      <p>
        You may request access to or deletion of personal data we hold about you
        by contacting us. We will respond within a reasonable timeframe.
      </p>
      <h2 className="text-xl font-semibold text-foreground">Children</h2>
      <p>
        The Site is not directed at anyone under 18. We do not knowingly collect
        data from minors.
      </p>
      <h2 className="text-xl font-semibold text-foreground">Changes</h2>
      <p>
        We may update this policy from time to time. Changes will be posted on
        this page with an updated date.
      </p>
    </LegalPage>
  );
}
