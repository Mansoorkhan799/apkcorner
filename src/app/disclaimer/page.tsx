import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { buildSiteMetadata } from "@/lib/seo";

export const metadata: Metadata = buildSiteMetadata(
  "Disclaimer",
  "Legal disclaimer for APK Corner. Important information about our content, earnings claims, and third-party apps.",
  "/disclaimer"
);

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      description="Please read before using our guides."
    >
      <p>
        The information on <strong>apkcorner.com.pk</strong> is provided for
        general informational purposes only. By using this Site, you agree to the
        following terms.
      </p>
      <h2 className="text-xl font-semibold text-foreground">No Professional Advice</h2>
      <p>
        Content on this Site does not constitute financial, legal, or professional
        advice. Earning amounts, payout methods, and app features described in
        our guides may change without notice. Always verify details directly with
        the app developer before making decisions.
      </p>
      <h2 className="text-xl font-semibold text-foreground">No Earnings Guarantee</h2>
      <p>
        We do not guarantee that you will earn money from any application featured
        on this Site. Past performance or user reports do not guarantee future
        results. Your earnings depend on app policies, your activity, and factors
        outside our control.
      </p>
      <h2 className="text-xl font-semibold text-foreground">Third-Party Apps</h2>
      <p>
        We are not affiliated with, endorsed by, or sponsored by any game
        developer unless explicitly stated. APK files and apps are owned by their
        respective developers. Downloading APKs from third-party sources carries
        inherent risks including malware, account bans, and data loss. Proceed at
        your own risk.
      </p>
      <h2 className="text-xl font-semibold text-foreground">Accuracy of Information</h2>
      <p>
        We strive to keep guides accurate and up to date. However, we make no
        warranties about completeness, reliability, or suitability of the
        information. We are not liable for errors, omissions, or outcomes resulting
        from use of our content.
      </p>
      <h2 className="text-xl font-semibold text-foreground">External Links</h2>
      <p>
        Our guides may link to external websites. We are not responsible for the
        content, privacy practices, or security of third-party sites.
      </p>
      <h2 className="text-xl font-semibold text-foreground">Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, APK Corner and its authors
        shall not be liable for any direct, indirect, incidental, or consequential
        damages arising from your use of this Site or any featured application.
      </p>
      <p>
        See also our{" "}
        <a href="/responsible-gaming" className="text-accent-bright hover:underline">
          Responsible Gaming
        </a>{" "}
        policy.
      </p>
    </LegalPage>
  );
}
